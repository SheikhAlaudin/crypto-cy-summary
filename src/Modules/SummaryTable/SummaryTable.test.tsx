
import { render, waitFor } from '@testing-library/react';
import { SummaryTable } from './SummnaryTable';
import { act } from 'react-dom/test-utils';

describe('SummaryTable Test Component', () => {

    const fetchApi = jest.spyOn(global, 'fetch');

    test('renders SummaryTable', async () => {
        fetchApi.mockResolvedValue({
            //@ts-ignore
            "symbol": "ALTA-USDT",
            "high": "0.000005130000",
            "low": "0.000005130000",
            "volume": "492.10653523",
            "quoteVolume": "0.00252450",
            "percentChange": "0",
            "updatedAt": "2023-09-11T16:55:01.787Z"
        });
        
        await act( async () => {
            render(<SummaryTable  singleDataFetch={[]} handleClickedData={jest.fn()}/>)
        });
    });

});

