import React from 'react';
import { Card, CardText, CardHeader } from 'material-ui/Card';
import PersonTimeTable from './PersonTimeTable';

const PersonCard = (props) => {
    const { person } = props;
    console.log(person);
    const styles = {
        marginBottom: '30px',
    }
    
    return (
        <Card style={ styles } expandable={ true }>
            <CardHeader
                title={ person['first-name'] + ' ' + person['last-name'] }
                titleStyle={{ fontSize: '24px' }}
                showExpandableButton={ true }
            />
            <CardText>
                <div className="row">
                    <div className="col-xs-6">
                        <PersonTimeTable person={ person }/>
                    </div>
                </div>
            </CardText>
        </Card>

    );
  }

export default PersonCard;
