import { connect } from 'react-redux';
import { fetchPeopleAndPastWeekTimes } from '../actions';
import PeopleListPage from '../pages/PeopleListPage';

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.authentication.user,
        people: Object.values(state.people),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPeopleAndPastWeekTimes: (companyId) => dispatch(fetchPeopleAndPastWeekTimes(companyId)),
    }
}

const ProjectListPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PeopleListPage)

export default ProjectListPageContainer;