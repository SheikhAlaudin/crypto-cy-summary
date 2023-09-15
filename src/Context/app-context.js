import React, { useState } from 'react';

const AppContext = React.createContext({
    fetchedData: [],
    showModal: false,
    clickedData: {
                    symbol: '',
                    change: 0
                 },
    onHeaderClickHandler: (event, inputVal) => { },
    setUpdatedFetchedData: (arr) => { },
    setUpdatedModal: (flag) => { },
    setUpdatedClickedData: obj => {}
});

export const AppContextProvider = (props) => {

    const [fetchedData, setFetchedData] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const [clickedData, setClickedData] = useState({
        symbol: '',
        change: ''
    })

    const setUpdatedFetchedData = (arr) => {
        setFetchedData(arr);
    }

    const onHeaderClickHandler = (event, inputVal) => {
        if (inputVal) {
            fetch(`/v3/markets/${inputVal}/summary`)
                .then(respone => {
                    if (respone.ok) {
                        return respone.json();
                    } else {
                        setShowModal(true);
                        return [];
                    }
                })
                .then(json => setUpdatedFetchedData([json]));
        } else if (inputVal === '') {
            fetch(`/v3/markets/summaries`)
                .then(respone => respone.json())
                .then(json => setUpdatedFetchedData(json));
        }
        event.stopPropagation();
        event.preventDefault();
    }

    const setUpdatedModal = flag => setShowModal(flag);

    const setUpdatedClickedData = obj => setClickedData(obj);

    return (
        <AppContext.Provider value={{
            clickedData: clickedData,
            fetchedData: fetchedData,
            showModal: showModal,
            onHeaderClickHandler: onHeaderClickHandler,
            setUpdatedFetchedData: setUpdatedFetchedData,
            setUpdatedModal: setUpdatedModal,
            setUpdatedClickedData: setUpdatedClickedData
        }}>
            {props.children}
        </AppContext.Provider>)
}


export default AppContext;

