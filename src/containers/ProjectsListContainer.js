import { connect } from 'react-redux';
import ProjectsList from '../components/ProjectsList';

const mapStateToProps = (state, ownProps) => {
    return {
        projects: Object.values(state.projects).sort((project1, project2) => {
                    return (project1.favorited === project2.favorited) ? 0 : project1.favorited ? -1 : 1;
                })
    }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const ProjectsListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectsList)

export default ProjectsListContainer;