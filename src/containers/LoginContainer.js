import { connect } from 'react-redux';
import Login from '../components/Login'
import { loginHandler } from '../actions';

const mapStateToProps = (state, ownProps) => {
  return {
    setError: ownProps.setError,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login(key, company){
        dispatch(loginHandler(key, company))
    } 
  }
}

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default LoginContainer;