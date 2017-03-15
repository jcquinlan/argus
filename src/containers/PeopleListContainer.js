import { connect } from 'react-redux';
import { fetchPeopleAndPastWeekTimes } from '../actions';
import PeopleList from '../components/PeopleList';

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.authentication.user,
        people: state.people,
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
      fetchPeopleAndPastWeekTimes: (companyId) => dispatch(fetchPeopleAndPastWeekTimes(companyId)),
  }
}

const PeopleListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PeopleList)

export default PeopleListContainer;