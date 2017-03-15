import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import LogoutButton from '../components/LogoutButton';
import { setUser, logout } from '../actions';

const mapStateToProps = (state, ownProps) => {
  return {
      text: ownProps.text,
      toggleSlideout: ownProps.toggleSlideout,
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logoutHandler() {
            localStorage.removeItem('api_key');
            localStorage.removeItem('company');
            localStorage.removeItem('user');
            browserHistory.push('/login');
            dispatch(setUser(null));
            dispatch(logout());
        },
    }
}

const LogoutButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LogoutButton)

export default LogoutButtonContainer;