
import { render, screen, waitFor } from '@testing-library/react';
import { MainModule } from './MainModule';

describe('MarketSummary Test Component', () => {
    test('MarketSummary Test Render', () => {
        const obj = {
            symbol : 'Test',
            change: 0
        }
        render(<MainModule clickedData={obj} />);
        const heading = screen.getByText(/Crypto Currency/);
        expect(heading).toBeInTheDocument();
    });
});

