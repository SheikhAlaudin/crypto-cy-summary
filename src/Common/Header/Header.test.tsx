import { fireEvent, render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header Test Component', () => {



    test('renders Header', () => {
        //@ts-ignore
        render(<Header />);
        const linkElement = screen.getByText(/Crypto Cy/);
        expect(linkElement).toBeInTheDocument();
    });

    test('Header onChange', () => {
        //@ts-ignore
        render(<Header />);
        const inputElement = screen.getByTestId('header_input');
        fireEvent.change(inputElement, { target: { value: 'a' } });
        //@ts-ignore
        expect(inputElement.value).toBe('a');
    });

    test('Header onCLick', () => {
        //@ts-ignore
        render(<Header />);
        const inputElement = screen.getByTestId('header_input');
        fireEvent.click(inputElement);
    });

});

