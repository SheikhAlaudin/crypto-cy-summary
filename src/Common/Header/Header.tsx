import React, { ChangeEvent, FormEvent, useState } from 'react';
import './Header.css'
import { Modal } from '../Modal/Modal';

export const Header: React.FC<{ handleSubmit: any }> = ({ handleSubmit }) => {
    const [inputVal, setInputVal] = useState('');
    const [showModal, setShowModal] = useState(false);
    const onInputChange = (event: ChangeEvent) => {
        setInputVal((event.target as HTMLInputElement).value);
    }
    const onClickHandler = (event: FormEvent) => {
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
                .then(json => handleSubmit([json]));
        } else if (inputVal === '') {
            fetch(`/v3/markets/summaries`)
                .then(respone => respone.json())
                .then(json => handleSubmit(json));
        }
        event.stopPropagation();
        event.preventDefault();
    }

    const hideShowModel = () => {
        setShowModal(false);
    }
    return (
        <>
            <header className='header card-header'>
                <nav className="navbar navbar-dark bg-primary">
                    <a className="navbar-brand" href='#'>Crypto Cy</a>
                    <form className="form-inline">
                        <input className="form-control mr-sm-2" data-testid="header_input" type="search" placeholder="Type any Currency" aria-label="Search" value={inputVal} onChange={onInputChange} />
                        <button className="btn btn-outline-success" type="submit" onClick={onClickHandler}>Search</button>
                    </form>
                </nav>
            </header>
            {showModal && <Modal handleButtonClicked={hideShowModel} content='Please Enter a Valid Currency Name'/>}
        </>

    );
};
