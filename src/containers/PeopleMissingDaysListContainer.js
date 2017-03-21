import { connect } from 'react-redux';
import PeopleMissingDaysList from '../components/PeopleMissingDaysList';

const mapStateToProps = (state, ownProps) => {
    return {
        peopleMissingDays: Object.values(state.people).filter(person => person.missingDays),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

const PeopleMissingDaysListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(PeopleMissingDaysList)

export default PeopleMissingDaysListContainer;