import React from 'react';
import Spinner from 'react-spinkit';

const LoadingComponent = (props) => {
    const { messages } = props;
    const loadingMessages = messages || ['Finding your team...', 'Crunching the numbers...', 'Reviewing the code...', 'Counting closed tickets...', 'Waiting for TeamWork...'];
    const message = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];

    return (
        <div className="loading-wrapper">
            <Spinner spinnerName='cube-grid' width={ 80 }/>
            <p>{ message }</p>
        </div>
    )
}

export default LoadingComponent;