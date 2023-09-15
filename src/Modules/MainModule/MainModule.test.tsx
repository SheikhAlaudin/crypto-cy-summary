
import { render, screen, waitFor } from '@testing-library/react';
import { MainModule } from './MainModule';

describe('MarketSummary Test Component', () => {
    test('MarketSummary Test Render', () => {
        render(<MainModule />);
        const heading = screen.getByText(/Crypto Currency/);
        expect(heading).toBeInTheDocument();
    });
});

