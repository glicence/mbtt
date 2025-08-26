import { act, render, screen } from '@testing-library/react';
import React from 'react';

import { CategoryDetails } from './category-details';

const mockProps = {
  name: 'Mock Category',
  id: '1ss1',
  products: [
    {
      name: 'Foo',
      icon: 'icon.svg',
      description: 'Lorem ipsum',
    },
    {
      name: 'Bar',
      icon: 'icon.svg',
      description: 'dolor sit',
    },
  ],
};

describe('CategoryDetails', () => {
  it('renders the component', () => {
    render(<CategoryDetails category={mockProps} />);

    expect(screen.getByText(mockProps.name)).toBeVisible();
  });

  it('opens and closes the products', () => {
    render(<CategoryDetails category={mockProps} />);

    const button = screen.getByRole('button', { name: 'Foo' });

    act(() => {
      button.click();
    });

    expect(screen.getByText('Lorem ipsum')).toBeVisible();
  });
});
