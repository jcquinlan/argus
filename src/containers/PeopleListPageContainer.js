import { connect } from 'react-redux';
import PeopleListPage from '../pages/PeopleListPage';

const mapStateToProps = (state, ownProps) => {
    return {
        people: Object.values(state.people),
    }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const ProjectListPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PeopleListPage)

export default ProjectListPageContainer;