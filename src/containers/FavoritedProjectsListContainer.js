import { connect } from 'react-redux';
import FavoritedProjectsList from '../components/FavoritedProjectsList';


const mapStateToProps = (state, ownProps) => {
    return {
        favoritedProjects: Object.values(state.projects).filter(project => project.favorited),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

const FavoritedProjectsListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FavoritedProjectsList)

export default FavoritedProjectsListContainer;