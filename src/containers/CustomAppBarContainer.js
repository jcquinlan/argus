import { connect } from 'react-redux';
import { setUser, logout } from '../actions';
import { browserHistory } from 'react-router';
import CustomAppBar from '../components/CustomAppBar';

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: state.authentication.isLoggedIn,
    user: state.authentication.user,
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

const CustomAppBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomAppBar)

export default CustomAppBarContainer;