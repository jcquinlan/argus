import React from 'react';
import { Link } from 'react-router';

const CustomAppBar = (props) => {
    const { user, isLoggedIn, logoutHandler } = props;

    const renderLoggedInNav = () => {
        if(isLoggedIn){
            return (
                <div className="nav-right nav-menu">
                    <Link to="/" className="nav-item">
                        Projects
                    </Link>
                    <Link to="/people" className="nav-item">
                        People
                    </Link>
                    <a onClick={ logoutHandler } className="nav-item">
                        Logout
                    </a>
                </div>
            )
        } else {
            return (
                <div className="nav-right nav-menu">
                    <Link to="/login" className="nav-item">
                        Login
                    </Link>
                </div>
            )
        }
    }

    return (
          <nav className="nav app-nav">
            <div className="container">
                <div className="nav-left">
                    <Link to="/" className="nav-item">
                        <h1 className="app-name">Kiln.</h1>
                    </Link>
                </div>

                <div className="nav-center">
                    <p className="nav-item company-name">{ (user ? user['company-name'] : '') }</p>
                </div>

                <span className="nav-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </span>

                { renderLoggedInNav() }

            </div>
        </nav>
    )
}

export default CustomAppBar;
