/* eslint-disable import/no-extraneous-dependencies */
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('renders headline', () => {
    // ARRANGE
    const te = render(<App />);
    console.log(te);
    // const headline = screen.getByRole('heading', {
    //   level: 1,
    // });

    // ACT

    // EXPECT
    // expect(headline).toHaveTextContent('Hello');
  });
});
