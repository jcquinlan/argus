import React, { Component } from 'react';
import { getProjectURL } from '../utility';
import { Card, CardText, CardHeader } from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import LinearProgress from 'material-ui/LinearProgress';

import FavoriteProjectIconContainer from '../containers/FavoriteProjectIconContainer';
import HorizontalBar from './HorizontalBar';
import ProjectPeopleTable from './ProjectPeopleTable';

class ProjectCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            expanded: false,
        }
        
        this.handleExpandChange = this.handleExpandChange.bind(this);
    }

    componentDidMount(){
        const { project, fetchProjectTimesEstimatesTasks } = this.props;
        if(project.favorited) this.setState({ expanded: true });
        if(project.favorited && !project.times.length) fetchProjectTimesEstimatesTasks(project.id);
    }

    render(){
        const { project } = this.props;
        const { expanded } = this.state;
        const styles = {
            marginBottom: '30px',
        }
        const created_on = new Date(project['created-on']);
        const options = {
            weekday: "long", year: "numeric", month: "short",
            day: "numeric", hour: "2-digit", minute: "2-digit"
        };
        
        return (
            <Card style={ styles } expanded={ expanded } onExpandChange={ this.handleExpandChange }>
                { project.times.entries.length && <HorizontalBar total={ project.times.minutesEstimated } partial={ project.times.minutesLogged }/> }
                { this.isLoading() }
                <CardHeader
                    avatar={ <FavoriteProjectIconContainer project={ project } />}
                    title={ project.name }
                    titleStyle={{ fontSize: '24px' }}
                    subtitle={ (<span>{ `Created: ${ created_on.toLocaleTimeString('en-us', options) } -` } <a className="teamwork-project-link" href={ getProjectURL(project.id) } target="_blank">View on TeamWork</a></span>) }
                    showExpandableButton={ true } />

                <CardText expandable={ true }>
                    <div className="row">
                        <div className="col-xs-12">
                            { this.displayProjectTasks() }
                            { this.displayTimeTable() }
                        </div>
                    </div>
                </CardText>
            </Card>
        );
    }

    isLoading(){
        const { project } = this.props;
        const { expanded } = this.state;

        if(!project.times.entries.length && expanded) return <LinearProgress color={ '#13C15B' } style={{ height: '10px' }} mode="indeterminate" />
    }

    displayTimeTable(){
        const { project } = this.props;

        if(project.times.entries.length) return <ProjectPeopleTable project={ project }/>;
        return 'Loading!'
    }

    displayProjectTasks(){
        const { project } = this.props;
        if(project && project.tasks){
            return (
                <p className="project-tasks">
                    { project.tasks.completed.length } / { project.tasks.all.length } tasks completed
                    <FontIcon className="material-icons project-tasks-icon">
                        { project.tasks.completed.length ? 'check' : 'cancel' }
                    </FontIcon>
                </p>
            )
        }

    }

    handleExpandChange(){
        const { project, fetchProjectTimesEstimatesTasks } = this.props;
        const { expanded } = this.state;

        if(!expanded && !project.times.entries.length) fetchProjectTimesEstimatesTasks(project.id);
        this.setState({ expanded: !expanded })
    }
      
}

export default ProjectCard
      