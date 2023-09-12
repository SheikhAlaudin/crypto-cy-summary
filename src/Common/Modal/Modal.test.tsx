import React from 'react';
import { render, screen } from '@testing-library/react';
import { Modal } from './Modal';

describe('Modal Test Component', () => {

  test('renders Moda;', () => {
    render(<Modal handleButtonClicked={jest.fn()} content='Please Provide Proper Currency Name'/>);
    const linkElement = screen.getByText(/Please Provide Proper Currency Name/);
    expect(linkElement).toBeInTheDocument();
  });

});

