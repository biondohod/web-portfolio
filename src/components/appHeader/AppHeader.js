import { NavLink, Link } from 'react-router-dom';
import {useEffect, useReducer} from 'react';

import './appHeader.scss';
import logo from '../../resources/img/logo.svg';
import {useState} from "react";

const AppHeader = ({isAuthorized, setIsAuthorized}) => {
    const onLogOut = () => {
        localStorage.setItem('id', '');
        localStorage.setItem('token', '');
        setIsAuthorized(false);
        console.log(isAuthorized)
    }

    const checkIsAuthorized = () => {
        if (localStorage.getItem('id') && localStorage.getItem('token')) {
            setIsAuthorized(true);
        } else {
            setIsAuthorized(false);
        }
    }


    useEffect(() => {
        checkIsAuthorized();
    }, [isAuthorized]);

    const renderAppHeader = () => {
        if (isAuthorized) {
            return (
                <ul className="header-nav__list">
                    <li className='header-nav__item'>
                        <NavLink
                            end to={`/user/${localStorage.getItem('id')}`}
                            style={({ isActive }) => ({ color: isActive ? '#FF6464' : '' })}>My profile
                        </NavLink>
                    </li>
                    <li className='header-nav__item'>
                        <NavLink
                            end to={`/user/${localStorage.getItem('id')}/works`}
                            style={({ isActive }) => ({ color: isActive ? '#FF6464' : '' })}>My works
                        </NavLink>
                    </li>
                    <li className='header-nav__item'>
                        <NavLink
                            end to='/following'
                            style={({ isActive }) => ({ color: isActive ? '#FF6464' : '' })}>Following
                        </NavLink>
                    </li>
                    <li className='header-nav__item'>
                        <NavLink
                            end to='/signUp'
                            style={({ isActive }) => ({ fill: isActive ? '#FF6464' : 'black' })}
                            onClick={onLogOut}>
                            Log out
                        </NavLink>
                    </li>
                </ul>
            )
        } else if (!isAuthorized) {
            return (
                <ul className="header-nav__list">
                    <li className='header-nav__item'>
                        <NavLink
                            end to='/signUp'
                            style={({ isActive }) => ({ fill: isActive ? '#FF6464' : 'black' })}>
                            Sign Up or Log In
                        </NavLink>
                    </li>
                </ul>
            )
        }
    }

    return (
        <header className='app__header'>
            <h1 className="visually-hidden">web portfolio.</h1>
            <Link to="/">
                <img src={logo} alt="main logo." />
            </Link>
            <nav className="header__nav">
                {renderAppHeader()}
            </nav>
        </header>
    );
}

export default AppHeader;