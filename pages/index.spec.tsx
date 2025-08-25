import { render, screen } from '@testing-library/react';
import React from 'react';

import Index from './index';

describe('Index', () => {
  it('renders the index page', () => {
    render(<Index />);

    const expectedWelcomeIntroText = 'Hello';
    const headingElement = screen.getByText(expectedWelcomeIntroText);

    expect(headingElement).toBeVisible();
    expect(headingElement).toHaveTextContent(`${expectedWelcomeIntroText}`);
  });
});
