import React from 'react';
import LoadingComponent from '../components/LoadingComponent';
import ProjectsListContainer from '../containers/ProjectsListContainer';
import FavoritedProjectsListContainer from '../containers/FavoritedProjectsListContainer';

const ProjectListPage = (props) => {

    // If we haven't fetched projects yet, do it now.
    if(!props.projects.length) props.fetchProjects();

    const showLoading = () => {
        if(!props.projects.length) return (
            <div className="columns">
                <div className="column"><LoadingComponent /></div>
            </div>   
        )
    }

    const showFavoritedProjectsList = () => {
        if(!props.projects.length) return;
        return (
            <div>
                <p className="card-title">Favorited Projects</p>
                <FavoritedProjectsListContainer />
            </div>
        )
    }

    const showProjectsList = () => {
        if(!props.projects.length) return;
        return (
            <div>
                <p className="card-title">Filter Projects</p>
                <ProjectsListContainer />
            </div>
        )
    }

    return (
        <div>
            { showLoading() }
            <div className="columns">
                <div className="column is-4">
                    { showFavoritedProjectsList() }
                </div>
                <div className="column is-8">
                    { showProjectsList() }
                </div>
            </div>
        </div>
    );
}

export default ProjectListPage;
