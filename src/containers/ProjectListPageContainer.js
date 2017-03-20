import { connect } from 'react-redux';
import ProjectListPage from '../pages/ProjectListPage';

const mapStateToProps = (state, ownProps) => {
    return {
        projects: Object.values(state.projects),
    }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const ProjectListPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectListPage)

export default ProjectListPageContainer;