import React from 'react';
import { List, ListItem } from 'material-ui/List';
import { Card } from 'material-ui/Card';

const PeopleMissingDaysList = (props) => {
      const { peopleMissingDays } = props;

      const renderPeople = () => {
          return peopleMissingDays.map(person => {
              return <ListItem key={ person.id } primaryText={ `${ person['first-name'] } ${ person['last-name'] }` } />
          })
      }

      return (
          <Card>
            <List>
                { renderPeople() }
            </List>
          </Card>
    );
}

export default PeopleMissingDaysList;
      