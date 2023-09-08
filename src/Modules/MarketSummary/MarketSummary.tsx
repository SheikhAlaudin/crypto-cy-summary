import React from 'react';
import { Header } from '../../Common/Header/Header';
import { SummaryTable } from '../SummaryTable/SummnaryTable';
import { Footer } from '../../Common/Footer/Footer';

export const MarketSummary: React.FC = () => {
  return (
    <>
      <Header />
      <SummaryTable />
      <Footer />
    </>
  );
};
