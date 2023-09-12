import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer Test Component', () => {

  test('renders Footer', () => {
    render(<Footer />);
    const linkElement = screen.getByText(/cryptocy.com/);
    expect(linkElement).toBeInTheDocument();
  });

});

