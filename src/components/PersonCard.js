import React from 'react';
import { Card, CardText, CardHeader } from 'material-ui/Card';
import PersonTimeTable from './PersonTimeTable';

const PersonCard = (props) => {
    const styles = {
        marginBottom: '30px',
    }
    
    return (
        <Card style={ styles }>
            <CardHeader
                title={ props.person['first-name'] + ' ' + props.person['last-name'] }
                titleStyle={{ fontSize: '24px' }}
                />
            <CardText>
                <div className="row">
                    <div className="col-xs-6">
                        <PersonTimeTable person={ props.person }/>
                    </div>
                </div>
                
            </CardText>
        </Card>

    );
  }

export default PersonCard;
