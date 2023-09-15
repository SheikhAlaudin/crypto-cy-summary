import React from 'react';
import { MarketSummary } from './Modules/MarketSummary/MarketSummary';
import { AppContextProvider } from './Context/app-context';

export const App: React.FC = () => {
  return (
    <AppContextProvider>
      <MarketSummary />
    </AppContextProvider>
  );
};
