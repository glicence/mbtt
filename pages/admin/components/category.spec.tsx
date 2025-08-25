import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import React from 'react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import { Category } from './category';
import { Product } from '../../../types';

const mockProps = {
  name: 'Mock Category',
  id: 1,
  products: [],
};

const endpoint = `http://localhost:4000/categories/${mockProps.id}`;

const server = setupServer(
  http.put(endpoint, () => {
    return HttpResponse.json({ ok: true, status: 200 });
  })
);

describe('Category', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('renders the component', () => {
    render(<Category category={mockProps} />);

    expect(screen.getByText(mockProps.name)).toBeVisible();
  });

  it('edits and saves a change', async () => {
    render(<Category category={mockProps} />);

    const editButton = screen.getByRole('button', { name: 'Edit' });

    act(() => {
      editButton.click();
    });

    const categoryNameField = screen.getByLabelText('Category Name:');

    act(() => {
      fireEvent.change(categoryNameField, {
        target: { value: 'Mock Category1' },
      });
    });

    const saveButton = screen.getByRole('button', { name: 'save' });

    act(() => {
      saveButton.click();
    });

    await waitFor(() => {
      expect(screen.getByText('Mock Category1')).toBeVisible();
    });
  });

  it('shows an error if you are unable to save a change', async () => {
    server.use(
      http.put(endpoint, () => {
        return new HttpResponse(null, { status: 500 });
      })
    );
    render(<Category category={mockProps} />);

    const editButton = screen.getByRole('button', { name: 'Edit' });

    act(() => {
      editButton.click();
    });

    const categoryNameField = screen.getByLabelText('Category Name:');

    act(() => {
      fireEvent.change(categoryNameField, {
        target: { value: 'Mock Category1' },
      });
    });

    const saveButton = screen.getByRole('button', { name: 'save' });

    act(() => {
      saveButton.click();
    });

    await waitFor(() => {
      expect(screen.getByText('Unable to save')).toBeVisible();
    });
  });

  it('cancels editing', async () => {
    render(<Category category={mockProps} />);

    const editButton = screen.getByRole('button', { name: 'Edit' });

    act(() => {
      editButton.click();
    });

    const categoryNameField = screen.getByLabelText('Category Name:');

    act(() => {
      fireEvent.change(categoryNameField, {
        target: { value: 'Mock Category1' },
      });
    });

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });

    act(() => {
      cancelButton.click();
    });

    await waitFor(() => {
      expect(screen.getByText('Mock Category')).toBeVisible();
    });
  });

  it('displays products', () => {
    const mockProducts: Product[] = [
      {
        name: 'Foo',
        icon: 'icon.svg',
        description: 'Lorem ipsum',
      },
    ];

    render(<Category category={{ ...mockProps, products: mockProducts }} />);

    expect(screen.getByText(mockProducts[0].name)).toBeVisible();
  });
});
