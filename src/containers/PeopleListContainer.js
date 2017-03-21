import { connect } from 'react-redux';
import PeopleList from '../components/PeopleList';

const mapStateToProps = (state, ownProps) => {
    return {
        people: Object.values(state.people),
    }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const PeopleListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PeopleList)

export default PeopleListContainer;