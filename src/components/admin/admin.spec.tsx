import { act, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import { Admin } from './admin';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

const mockCategory = {
  id: '4a44',
  name: 'Retirement',
  products: [
    {
      description: 'Lorem ipsum',
      icon: 'simple_saver.svg',
      name: 'Personal Pension',
    },
  ],
};

const server = setupServer(
  http.get('http://localhost:4000/categories', () => {
    return HttpResponse.json([{ id: '123', name: 'category', products: [] }]);
  }),
  http.post('http://localhost:4000/categories', () => {
    return HttpResponse.json([
      { id: '456', name: 'new category', products: [] },
    ]);
  }),
  http.delete('http://localhost:4000/categories/4a44', () => {
    return HttpResponse.json({ ok: true, status: 200 });
  })
);

describe('Admin', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('renders the index page', () => {
    render(<Admin data={[mockCategory]} />);

    expect(screen.getByRole('heading', { name: 'Admin' })).toBeVisible();
  });

  it('adds a category', async () => {
    render(<Admin data={[mockCategory]} />);

    const addButton = screen.getByRole('button', { name: 'Add category' });

    act(() => {
      addButton.click();
    });

    waitFor(() => {
      expect(screen.getByText('new category')).toBeVisible();
    });
  });

  it('deletes a category', async () => {
    render(<Admin data={[mockCategory]} />);

    const removeButton = screen.getByRole('button', { name: 'Remove' });

    const category = screen.getByText('Retirement');

    expect(category).toBeVisible();

    act(() => {
      removeButton.click();
    });

    waitFor(() => {
      expect(category).not.toBeVisible();
    });
  });

  it('shows an error if you are unable to add a category', async () => {
    server.use(
      http.post('http://localhost:4000/categories', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );
    render(<Admin data={[mockCategory]} />);

    const addButton = screen.getByRole('button', { name: 'Add category' });

    act(() => {
      addButton.click();
    });

    waitFor(() => {
      expect(screen.getByText('Failed to add category')).toBeVisible();
    });
  });

  it('shows an error if you are unable to remove a category', async () => {
    server.use(
      http.delete('http://localhost:4000/categories/4a44', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );
    render(<Admin data={[mockCategory]} />);

    const removeButton = screen.getByRole('button', { name: 'Remove' });

    act(() => {
      removeButton.click();
    });

    waitFor(async () => {
      expect(screen.getByText('Failed to remove category')).toBeVisible();
    });
  });
});
