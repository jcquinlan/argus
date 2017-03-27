import React from 'react';
import LoginContainer from '../containers/LoginContainer';

const ProjectListPage = (props) => {

    return (
        <div className="login-page">
            <div className="columns">
                <div className="column">
                    <h3 className="subtitle">Alternate Views for Teamwork</h3>
                </div>
            </div>

            <div className="columns">
                <div className="column">
                    <p className="sub-text">
                        Kiln provides a series of views to display information from TeamWork in new ways that make it easier to get at-a-glance summaries of
                        projects, employees, and tasks.
                    </p>
                    <p className="sub-text heavy">
                        Use your TeamWork API Key and the name of your company to login.
                    </p>
                </div>
                <div className="column">
                    <LoginContainer />
                </div>
            </div>
        </div>
    );
}

export default ProjectListPage;
