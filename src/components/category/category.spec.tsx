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
  id: '1ss1',
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
    render(<Category category={mockProps} removeCategory={jest.fn()} />);

    expect(screen.getByText(mockProps.name)).toBeVisible();
  });

  it('edits and saves a change', async () => {
    const mockProducts: Product[] = [
      { name: 'Foo', icon: 'cash_isa.svg', description: 'Lorem' },
      { name: 'Bar', icon: 'junior_isa.svg', description: 'Ipsum' },
    ];
    render(
      <Category
        category={{ ...mockProps, products: mockProducts }}
        removeCategory={jest.fn()}
      />
    );

    const editButton = screen.getByRole('button', { name: 'Edit' });

    act(() => {
      editButton.click();
    });

    const categoryNameField = screen.getByLabelText('Category Name:');

    fireEvent.change(categoryNameField, {
      target: { value: 'Mock Category1' },
    });

    fireEvent.change(
      screen.getAllByRole('textbox', { name: 'Product Name:' })[0],
      {
        target: { value: 'product edit' },
      }
    );
    fireEvent.change(
      screen.getAllByRole('textbox', { name: 'Product Description:' })[0],
      {
        target: { value: 'product description edit' },
      }
    );
    fireEvent.change(screen.getAllByRole('combobox', { name: 'Icon:' })[0], {
      target: { value: 'junior_isa.svg' },
    });

    const saveButton = screen.getByRole('button', { name: 'save' });

    act(() => {
      saveButton.click();
    });

    await waitFor(() => {
      expect(screen.getByText('Mock Category1')).toBeVisible();
    });
  });

  it('removes a product', async () => {
    const mockProducts: Product[] = [
      { name: 'Foo', icon: 'cash_isa.svg', description: 'Lorem' },
      { name: 'Bar', icon: 'junior_isa.svg', description: 'Ipsum' },
    ];
    render(
      <Category
        category={{ ...mockProps, products: mockProducts }}
        removeCategory={jest.fn()}
      />
    );

    const editButton = screen.getByRole('button', { name: 'Edit' });

    act(() => {
      editButton.click();
    });

    const removeButton = screen.getAllByRole('button', { name: 'Remove' })[0];

    act(() => {
      removeButton.click();
    });

    expect(
      screen.getAllByRole('textbox', { name: 'Product Name:' })
    ).toHaveLength(1);
  });

  it('shows an error if you are unable to save a change', async () => {
    server.use(
      http.put(endpoint, () => {
        return new HttpResponse(null, { status: 500 });
      })
    );
    render(<Category category={mockProps} removeCategory={jest.fn()} />);

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
    render(<Category category={mockProps} removeCategory={jest.fn()} />);

    const editButton = screen.getByRole('button', { name: 'Edit' });

    act(() => {
      editButton.click();
    });

    const categoryNameField = screen.getByLabelText('Category Name:');

    fireEvent.change(categoryNameField, {
      target: { value: 'Mock Category1' },
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
        icon: 'cash_isa.svg',
        description: 'Lorem ipsum',
      },
      {
        name: 'Bar',
        icon: 'cash_isa.svg',
        description: 'Lorem ipsum',
      },
    ];

    render(
      <Category
        category={{ ...mockProps, products: mockProducts }}
        removeCategory={jest.fn()}
      />
    );

    expect(screen.getByText(mockProducts[0].name)).toBeVisible();
  });

  it('adds a product', async () => {
    render(<Category category={mockProps} removeCategory={jest.fn()} />);

    const editButton = screen.getByRole('button', { name: 'Edit' });

    act(() => {
      editButton.click();
    });

    const addButton = screen.getByRole('button', { name: 'Add product' });

    act(() => {
      addButton.click();
    });

    expect(screen.getByText('Product Name:')).toBeVisible();

    fireEvent.change(screen.getByRole('textbox', { name: 'Product Name:' }), {
      target: { value: 'new product' },
    });
    fireEvent.change(
      screen.getByRole('textbox', { name: 'Product Description:' }),
      {
        target: { value: 'new product description' },
      }
    );
    fireEvent.change(screen.getByRole('combobox', { name: 'Icon:' }), {
      target: { value: 'junior_isa.svg' },
    });

    const button = screen.getByRole('button', { name: 'Add new product' });

    act(() => {
      button.click();
    });

    const saveButton = screen.getByRole('button', { name: 'save' });

    act(() => {
      saveButton.click();
    });

    await waitFor(() => {
      expect(screen.getByText('new product')).toBeVisible();
    });
  });

  it('cancels adding a product', async () => {
    render(<Category category={mockProps} removeCategory={jest.fn()} />);

    const editButton = screen.getByRole('button', { name: 'Edit' });

    act(() => {
      editButton.click();
    });

    const addButton = screen.getByRole('button', { name: 'Add product' });

    act(() => {
      addButton.click();
    });

    const label = screen.getByText('Product Name:');

    expect(label).toBeVisible();

    const cancelButton = screen.getByRole('button', {
      name: 'Cancel new product',
    });

    act(() => {
      cancelButton.click();
    });

    expect(label).not.toBeVisible();
  });
});
