import { render, screen } from '@testing-library/react';
import React from 'react';

import Index, { getServerSideProps } from './index';
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
    render(<Index data={[mockCategory]} />);

    expect(screen.getByRole('heading', { name: 'Admin' })).toBeVisible();
  });

  it('loads the data get server side props', async () => {
    const result = await getServerSideProps();

    expect(result.props.data[0]).toEqual({
      id: '123',
      name: 'category',
      products: [],
    });
  });
});
