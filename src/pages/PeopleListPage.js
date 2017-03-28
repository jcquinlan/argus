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
                <PeopleMissingDaysListContainer />
            </div>
        )
    }

    const showPeopleList = () => {
        if(!people.length) return;
        return (
            <div>
                <PeopleListContainer />
            </div>
        )
    }

    const showPageTitle = () => {
        if(!people.length) return;
        return (
            <div className="columns">
                <div className="column">
                    <h4 className="page-title">People</h4>
                </div>
            </div>
        )
    }

    return (
        <div>
            { showLoading() }

            { showPageTitle() }

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
