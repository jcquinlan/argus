import React from 'react';
import AppBar from 'material-ui/AppBar';

const CustomAppBar = (props) => {
    const { user, isLoggedIn, toggleSlideout } = props;
    return (
        <AppBar
            title={ "SeamWork" + (user ? ' - ' + user['company-name'] : '') }
            style={{ position: 'fixed', top: '0', backgroundColor: '#13C15B' }}
            zDepth={ 2 }
            titleStyle={{ fontWeight: '100', textAlign: 'center' }}
            showMenuIconButton={ isLoggedIn }
            onLeftIconButtonTouchTap={ toggleSlideout }
          />
    )
}

export default CustomAppBar;
