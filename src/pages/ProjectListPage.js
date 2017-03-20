import React from 'react';
import Spinner from 'react-spinkit';
import ProjectsListContainer from '../containers/ProjectsListContainer';
import FavoritedProjectsListContainer from '../containers/FavoritedProjectsListContainer';

const ProjectListPage = (props) => {
    // Load a random message with the spinner icon as projects are being pulled from API.
    const loadingMessages = ['Finding your team...', 'Crunching the numbers...', 'Reviewing the code...', 'Counting closed tickets...', 'Waiting for TeamWork...'];
    const message = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];

    const showLoading = () => {
        if(!props.projects.length) return (
            <div className="columns">
                <div className="column loading-wrapper">
                    <Spinner spinnerName='cube-grid' width={ 80 }/>
                    <p>{ message }</p>
                </div>
            </div>   
        )
    }

    const showFavoritedProjectsList =() => {
        if(!props.projects.length) return;
        return (
            <div>
                <p className="card-title">Favorited Projects</p>
                <FavoritedProjectsListContainer />
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
                <div className="column is-8"><ProjectsListContainer /></div>
            </div>
        </div>
    );
}

export default ProjectListPage;
