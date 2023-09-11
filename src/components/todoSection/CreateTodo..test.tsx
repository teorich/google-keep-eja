/* eslint-disable import/no-extraneous-dependencies */
import { describe, expect, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

import CreateTodo from './CreateTodo';

describe('App', () => {
  it('should render create Todo/Notes element correctly', () => {
    // ARRANGE
    render(<CreateTodo />);
    const inputLine = screen.getByRole('textbox', {
      name: /note title/i,
    });

    // ACT

    // EXPECT
    expect(inputLine).toBeInTheDocument();
    expect(screen.getAllByRole('textbox').length).toBe(1);
  });

  it('should render the second textbox(text area) when focussed', () => {
    // ARRANGE
    render(<CreateTodo />);
    const inputLine = screen.getByRole('textbox');

    // ACT
    fireEvent.focus(inputLine);

    // EXPECT
    expect(
      screen.getByRole('textbox', {
        name: /take a note/i,
      })
    ).toBeInTheDocument();
    expect(screen.getAllByRole('textbox').length).toBe(2);
  });
});
