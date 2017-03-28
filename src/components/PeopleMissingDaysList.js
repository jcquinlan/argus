import React from 'react';
import { List, ListItem } from 'material-ui/List';
import { Card } from 'material-ui/Card';

const PeopleMissingDaysList = (props) => {
      const { peopleMissingDays } = props;

      const renderPeople = () => {
          if(!peopleMissingDays.length){
              // nestedItems prop on ListItem expects array, so manually put this ListItem into an array
              // to prevent from returning a node.
              return [<ListItem key="not-a-real-key" disabled={ true } style={{ textAlign: 'center' }} primaryText={ "No one is missing times! :')" } />]
          } else {
              return peopleMissingDays.map(person => {
                  return <ListItem disabled={ true } key={ person.id } primaryText={ `${ person['first-name'] } ${ person['last-name'] }` } />
              })
          }
      }

      return (
          <Card>
            <List style={{ padding: '0' }}>
                <ListItem primaryText="People Missing Days" nestedItems={ renderPeople() } />
            </List>
          </Card>
    );
}

export default PeopleMissingDaysList;
      