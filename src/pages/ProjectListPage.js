import React from 'react';
import ProjectsListContainer from '../containers/ProjectsListContainer';
import FavoritedProjectsListContainer from '../containers/FavoritedProjectsListContainer';

const ProjectListPage = (props) => {

    return (
        <div className="columns">
            <div className="column is-4">
                <p className="card-title">Favorited Projects</p>
                <FavoritedProjectsListContainer />
            </div>
            <div className="column is-8"><ProjectsListContainer /></div>
        </div>
    );
}

export default ProjectListPage;
