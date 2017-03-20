import React, { Component } from 'react';
import { Card, CardText, CardHeader } from 'material-ui/Card';
import PersonTimeTable from './PersonTimeTable';

class PersonCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            expanded: false,
        }

        this.handleExpandChange = this.handleExpandChange.bind(this);
    }

    render(){
        const { person } = this.props;
        const { expanded } = this.state;
        const styles = {
            marginBottom: '30px',
        }
        
        return (
            <Card style={ styles } expanded={ expanded } onExpandChange={ this.handleExpandChange }>
                <CardHeader
                    title={ person['first-name'] + ' ' + person['last-name'] }
                    titleStyle={{ fontSize: '24px' }}
                    avatar={ person['avatar-url'] }
                    showExpandableButton={ true }
                />
                <CardText>
                    <div className="row">
                        <div className="col-xs-6">
                            <PersonTimeTable showProjects={ expanded } person={ person }/>
                        </div>
                    </div>
                </CardText>
            </Card>

        );
    }

    handleExpandChange(){
        const { expanded } = this.state;
        this.setState({ expanded: !expanded })
    }
  }

export default PersonCard;
