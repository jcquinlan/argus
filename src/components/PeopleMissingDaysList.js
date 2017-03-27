import React from 'react';
import { List, ListItem } from 'material-ui/List';
import { Card } from 'material-ui/Card';

const PeopleMissingDaysList = (props) => {
      const { peopleMissingDays } = props;

      const renderPeople = () => {
          if(!peopleMissingDays.length){
              return <ListItem disabled={ true } style={{ textAlign: 'center' }} primaryText={ "No one is missing times! :')" } />
          } else {
              return peopleMissingDays.map(person => {
                  return <ListItem disabled={ true } key={ person.id } primaryText={ `${ person['first-name'] } ${ person['last-name'] }` } />
              })
          }
      }

      return (
          <Card>
            <List style={{ padding: '0' }}>
                { renderPeople() }
            </List>
          </Card>
    );
}

export default PeopleMissingDaysList;
      