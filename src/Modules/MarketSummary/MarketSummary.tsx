import React, { useState } from 'react';
import { Header } from '../../Common/Header/Header';
import { SummaryTable } from '../SummaryTable/SummnaryTable';
import { Footer } from '../../Common/Footer/Footer';
import { MainModule } from '../MainModule/MainModule';

export const MarketSummary: React.FC = () => {
  const [clickedData, setClickedData] = useState<Object>({});
  const handleClickedData: Function = (clickedData: Object) =>{
    setClickedData(clickedData);
  } 
  return (
    <>
      <Header />
      <MainModule />
      <SummaryTable />
      <Footer />
    </>
  );
};
