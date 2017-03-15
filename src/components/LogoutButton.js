import React from 'react';
import MenuItem from 'material-ui/MenuItem';

const LogoutButton = (props) => {
    const { toggleSlideout, logoutHandler, children } = props;
    const customLogoutHandler = () => {
        // Combine the Redux Container prop, and a prop from App component to close the slideout nav when logging out.
        toggleSlideout();
        logoutHandler();
    }
    return <MenuItem onTouchTap={ customLogoutHandler }>{ children }</MenuItem>
}

LogoutButton.propTypes = {
    toggleSlideout: React.PropTypes.func.isRequired,
}

export default LogoutButton;