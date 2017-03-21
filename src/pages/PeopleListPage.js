import React from 'react';
import LoadingComponent from '../components/LoadingComponent';
import PeopleListContainer from '../containers/PeopleListContainer';
import PeopleMissingDaysListContainer from '../containers/PeopleMissingDaysListContainer';

const PeopleListPage = (props) => {
    const { people, user, fetchPeopleAndPastWeekTimes } = props;

    // If we haven't fetched projects yet, do it now.
    if(!people.length) fetchPeopleAndPastWeekTimes(user['company-id']);

    const showLoading = () => {
        if(!people.length) return (
            <div className="columns">
                <div className="column"><LoadingComponent /></div>
            </div>   
        )
    }

    const showPeopleMissingDaysList = () => {
        if(!people.length) return;
        return (
            <div>
                <p className="card-title">People Missing Times</p>
                <PeopleMissingDaysListContainer />
            </div>
        )
    }

    const showPeopleList = () => {
        if(!people.length) return;
        return (
            <div>
                <p className="card-title">Employees</p>
                <PeopleListContainer />
            </div>
        )
    }

    return (
        <div>
            { showLoading() }
            <div className="columns">
                <div className="column is-4">
                    { showPeopleMissingDaysList() }
                </div>

                <div className="column is-8">
                    { showPeopleList() }
                </div>
            </div>
        </div>
    );
}

export default PeopleListPage;
