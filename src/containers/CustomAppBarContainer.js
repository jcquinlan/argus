import { connect } from 'react-redux';
import CustomAppBar from '../components/CustomAppBar';

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: state.authentication.isLoggedIn,
    user: state.authentication.user,
    toggleSlideout: ownProps.toggleSlideout,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const CustomAppBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomAppBar)

export default CustomAppBarContainer;