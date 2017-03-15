import { connect } from 'react-redux';
import FavoriteProjectIcon from '../components/FavoriteProjectIcon';
import { toggleFavoriteProject } from '../actions';
import { updateLocalStorageFavoritedProjects } from '../utility';
import { toastr } from 'react-redux-toastr';


const mapStateToProps = (state, ownProps) => {
  return {
      project: ownProps.project,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      toggleFavoriteProject(projectId){
          dispatch(toggleFavoriteProject(projectId));
          updateLocalStorageFavoritedProjects(toggleFavoriteProject(projectId));
          toastr.success('Project Updated!', 'test');   
      }
  }
}

const FavoriteProjectIconContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoriteProjectIcon)

export default FavoriteProjectIconContainer;