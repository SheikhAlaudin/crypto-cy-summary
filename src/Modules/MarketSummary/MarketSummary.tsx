import React, { useState } from 'react';
import { Header } from '../../Common/Header/Header';
import { SummaryTable } from '../SummaryTable/SummnaryTable';
import { Footer } from '../../Common/Footer/Footer';
import { MainModule } from '../MainModule/MainModule';

export const MarketSummary: React.FC = () => {
  const [singleDataFetch, setSingleDataFetch] = useState<Object[]>([]);
  const [clickedData, setClickedData] = useState<Object>({});
  const handleSubmit: Function = (singleDataFetch: Object[]) =>{
    setSingleDataFetch(singleDataFetch);
  }
  const handleClickedData: Function = (clickedData: Object) =>{
    setClickedData(clickedData);
  } 
  return (
    <>
      <Header handleSubmit={handleSubmit}/>
      <MainModule clickedData={clickedData}/>
      <SummaryTable singleDataFetch={singleDataFetch} handleClickedData={handleClickedData}/>
      <Footer />
    </>
  );
};
