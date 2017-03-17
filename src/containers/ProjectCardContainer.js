import { connect } from 'react-redux';
import { fetchProjectTimesEstimatesTasks } from '../actions';
import ProjectCard from '../components/ProjectCard';

const mapStateToProps = (state, ownProps) => {
    return {
        project: ownProps.project,
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
      fetchProjectTimesEstimatesTasks: (projectId) => dispatch(fetchProjectTimesEstimatesTasks(projectId)),
  }
}

const ProjectCardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectCard)

export default ProjectCardContainer;