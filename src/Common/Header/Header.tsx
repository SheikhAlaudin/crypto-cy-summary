import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';
import './Header.css'
import { Modal } from '../Modal/Modal';
import AppContext from '../../Context/app-context';

export const Header: React.FC = () => {
    const [inputVal, setInputVal] = useState('');
    const { showModal, onHeaderClickHandler, setUpdatedModal } = useContext(AppContext);
    const onInputChange = (event: ChangeEvent) => {
        setInputVal((event.target as HTMLInputElement).value);
    }
    const onClickHandler = (event: FormEvent) => {
        onHeaderClickHandler(event, inputVal);
    }

    const hideShowModel = () => {
        setUpdatedModal(false);
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
