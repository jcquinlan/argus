import { connect } from 'react-redux';
import { fetchProjectTimesAndEstimates } from '../actions';
import ProjectCard from '../components/ProjectCard';

const mapStateToProps = (state, ownProps) => {
    return {
        project: ownProps.project,
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
      fetchProjectTimesAndEstimates: (projectId) => dispatch(fetchProjectTimesAndEstimates(projectId)),
  }
}

const ProjectCardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectCard)

export default ProjectCardContainer;