import React, { useEffect, useState } from 'react';
import './SummaryTable.css';
import sha512 from 'crypto-js/sha512';
import HmacSHA512 from 'crypto-js/hmac-sha512';
import { enc } from 'crypto-js'
import ReactPaginate from 'react-paginate';

export const SummaryTable: React.FC <{ singleDataFetch: Object[] }> = ({ singleDataFetch }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState<Object[]>([]);
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
            .then(respone => respone.json())
            .then(json => setData(json));
    },[]);

    const lastDataPerPage: number = currentPage * dataPerPage;
    const firstDataPerPage: number = lastDataPerPage - dataPerPage;
    const currentData: Object[] = data.slice(firstDataPerPage, lastDataPerPage);
    const pageCount: number = Math.ceil(data.length / dataPerPage);

    const handlePageClick = (selectedPage:any) => {
        setCurrentPage(selectedPage.selected);
    }

    return (
        <div className='summaryTable'> 
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
                    {currentData.map((dt: any) => {
                        return (
                            <tr>
                                <td scope='row'>{dt.symbol}</td>
                                <td>{dt.high}</td>
                                <td>{dt.low}</td>
                                <td>{dt.volume}</td>
                                <td>{dt.percentChange}</td>
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
