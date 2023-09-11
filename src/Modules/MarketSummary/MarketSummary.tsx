import React, { useState } from 'react';
import { Header } from '../../Common/Header/Header';
import { SummaryTable } from '../SummaryTable/SummnaryTable';
import { Footer } from '../../Common/Footer/Footer';

export const MarketSummary: React.FC = () => {
  const [singleDataFetch, setSingleDataFetch] = useState([]);
  const handleSubmit = (singleDataFetch: any) =>{
    setSingleDataFetch(singleDataFetch);
  }
  return (
    <>
      <Header handleSubmit={handleSubmit}/>
      <SummaryTable singleDataFetch={singleDataFetch}/>
      <Footer />
    </>
  );
};
