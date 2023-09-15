import React, { useContext, useEffect, useState } from 'react';
import './SummaryTable.css';
import ReactPaginate from 'react-paginate';
import { Modal } from '../../Common/Modal/Modal';
import AppContext from '../../Context/app-context';

export const SummaryTable: React.FC = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const dataPerPage = 10;

    const { fetchedData, showModal,  setUpdatedFetchedData, setUpdatedModal, setUpdatedClickedData } = useContext(AppContext);

    useEffect(() => {
        setCurrentPage(1);
    }, [fetchedData]);

    useEffect(() => {
        fetch('/v3/markets/summaries')
            .then(respone => {
                if (respone.ok) {
                    return respone.json();
                } else {
                    setUpdatedModal(true);
                    return [];
                }

            })
            .then(json => setUpdatedFetchedData(json));

    }, []);

    const lastDataPerPage: number = currentPage * dataPerPage;
    const firstDataPerPage: number = lastDataPerPage - dataPerPage;
    const currentData: Object[] = fetchedData.length > 0 ? fetchedData.slice(firstDataPerPage, lastDataPerPage) : [];
    const pageCount: number = fetchedData.length > 0 ? Math.ceil(fetchedData.length / dataPerPage) : 0;

    const handlePageClick = (selectedPage: any) => {
        setCurrentPage(selectedPage.selected);
    }
    const hideShowModel = () => {
        setUpdatedModal(false);
    }

    const onClickHandler = (event: any) => {
        let symbol = event.target.parentElement.cells[0].innerText;
        let change = event.target.parentElement.cells[4].innerText;
        setUpdatedClickedData({
            symbol: symbol,
            change: change
        })
    }

    return (

        <div className='summaryTable'>
            {showModal && <Modal handleButtonClicked={hideShowModel} content='Something Went Wrong, Please try again later' />}
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
