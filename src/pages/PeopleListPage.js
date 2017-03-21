import React from 'react';
import PeopleListContainer from '../containers/PeopleListContainer';
import PeopleMissingDaysListContainer from '../containers/PeopleMissingDaysListContainer';

const PeopleListPage = (props) => {

    return (
        <div>
            <div className="columns">
                <div className="column is-4">
                    <p className="card-title">People Missing Times</p>
                    <PeopleMissingDaysListContainer />
                </div>

                <div className="column is-8">
                    <PeopleListContainer />
                </div>
            </div>
        </div>
    );
}

export default PeopleListPage;
