import React from 'react';
import './Header.css'

export const Header: React.FC = () => {
    return (
        <header className='header card-header'>
            <nav className="navbar navbar-dark bg-primary">
                <a className="navbar-brand" href='#'>Crypto Cy</a>
                <form className="form-inline">
                    <input className="form-control mr-sm-2" type="search" placeholder="Type any Currency" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
            </nav>
        </header>

    );
};
