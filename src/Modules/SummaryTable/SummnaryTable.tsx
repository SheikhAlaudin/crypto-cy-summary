import React, { useEffect, useState } from 'react';
import './SummaryTable.css';
import sha512 from 'crypto-js/sha512';
import HmacSHA512 from 'crypto-js/hmac-sha512';
import { enc } from 'crypto-js'
import ReactPaginate from 'react-paginate';
import { Modal } from '../../Common/Modal/Modal';

export const SummaryTable: React.FC<{ singleDataFetch: any, handleClickedData: any }> = ({ singleDataFetch, handleClickedData }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState<Object[]>([]);
    const [showModel, setShowModel] = useState(false);
    const dataPerPage = 10;

    // let apiKey = '90b6bdc6fa26406881fded9460c86fab';
    // var timestamp: any = new Date().getTime();
    // var contentHash = sha512(JSON.stringify('')).toString(enc.Hex);
    // var apiSecret = '104ed396e0a54e24b8b85cb9465107f4';

    // var uri = 'https://api.bittrex.com/v3/markets/summaries';
    // var preSign = [timestamp, uri, , contentHash].join('');
    // var signature = HmacSHA512(preSign, apiSecret).toString(enc.Hex);

    useEffect(() => {
        setData(singleDataFetch);
        setCurrentPage(1);
        if (singleDataFetch.length === 0) {
            handleClickedData({});
        } else if(singleDataFetch.length > 0 && singleDataFetch.length > 0){
            handleClickedData({
                symbol: singleDataFetch[0].symbol,
                change: singleDataFetch[0].percentChange
            });
        }
    }, [singleDataFetch]);

    useEffect(() => {
        fetch('/v3/markets/summaries', {
            headers: {
                // 'Api-Key': apiKey,
                // 'Api-Timestamp': timestamp,
                // 'Api-Content-Hash': contentHash,
                // 'Api-Signature': signature,
                // 'Content-Type': 'application/json',
                // 'Accept': 'application/json'
            }
        })
            .then(respone => {
                if (respone.ok) {
                    return respone.json();
                } else {
                    setShowModel(true);
                    return [];
                }

            })
            .then(json => setData(json));

    }, []);

    const lastDataPerPage: number = currentPage * dataPerPage;
    const firstDataPerPage: number = lastDataPerPage - dataPerPage;
    const currentData: Object[] = data.length > 0 ? data.slice(firstDataPerPage, lastDataPerPage) : [];
    const pageCount: number = data.length > 0 ? Math.ceil(data.length / dataPerPage) : 0;

    const handlePageClick = (selectedPage: any) => {
        setCurrentPage(selectedPage.selected);
    }
    const hideShowModel = () => {
        setShowModel(false);
    }

    const onClickHandler = (event: any) => {
        let symbol = event.target.parentElement.cells[0].innerText;
        let change = event.target.parentElement.cells[4].innerText;
        handleClickedData({
            symbol: symbol,
            change: change
        })
    }

    return (

        <div className='summaryTable'>
            {showModel && <Modal handleButtonClicked={hideShowModel} content='Something Went Wrong, Please try again later' />}
            <div className="card-header fs-4">
                Currency Table
            </div>
            <hr />
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">Symbol</th>
                        <th scope="col">High</th>
                        <th scope="col">Low</th>
                        <th scope="col">Volume</th>
                        <th scope="col">% Change</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {currentData && currentData.map((dt: any) => {
                        let colorPattern = 'black';
                        if (dt && dt.percentChange) {
                            if (dt.percentChange > 0) {
                                colorPattern = 'green';
                            } else if (dt.percentChange < 0) {
                                colorPattern = 'red';
                            }
                        }
                        return (
                            <tr onClick={onClickHandler}>
                                <td scope='row' >{dt.symbol}</td>
                                <td>{Math.round(dt.high * 100) / 100}</td>
                                <td>{Math.round(dt.low * 100) / 100}</td>
                                <td>{Math.round(dt.volume * 100) / 100}</td>
                                <td className={colorPattern}>{dt.percentChange}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination justify-content-center"}
                previousLinkClassName={"page-link"}
                nextLinkClassName={"page-link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
            />
        </div>
    );
};
