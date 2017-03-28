import React from 'react';
import LoadingComponent from '../components/LoadingComponent';
import ProjectsListContainer from '../containers/ProjectsListContainer';
import FavoritedProjectsListContainer from '../containers/FavoritedProjectsListContainer';

const ProjectListPage = (props) => {

    const { projects } = props;

    // If we haven't fetched projects yet, do it now.
    if(!projects.length) props.fetchProjects();

    const showLoading = () => {
        if(!props.projects.length) return (
            <div className="columns">
                <div className="column"><LoadingComponent /></div>
            </div>   
        )
    }

    const showFavoritedProjectsList = () => {
        if(!projects.length) return;
        return (
            <FavoritedProjectsListContainer />
        )
    }

    const showProjectsList = () => {
        if(!projects.length) return;
        return (
            <ProjectsListContainer />
        )
    }

    const showPageTitle = () => {
        if(!projects.length) return;
        return (
            <div className="columns">
                <div className="column">
                    <h4 className="page-title">Projects</h4>
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
