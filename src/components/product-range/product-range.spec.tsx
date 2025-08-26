import { render, screen } from '@testing-library/react';
import React from 'react';

import { ProductRange } from './product-range';

const mockProps = [
  {
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
  },
];

describe('ProductRange', () => {
  it('renders the component', () => {
    render(<ProductRange data={mockProps} />);

    expect(screen.getByText(mockProps[0].name)).toBeVisible();
    expect(screen.getByText('Foo')).toBeVisible();
  });
});
