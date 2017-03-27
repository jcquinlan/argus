import React from 'react';
import { List, ListItem } from 'material-ui/List';
import { Card } from 'material-ui/Card';

const FavoritedProjectsList = (props) => {
      const { favoritedProjects } = props;
      const renderProjects = () => {
          if(!favoritedProjects.length) {
              return <ListItem disabled={ true } style={{ textAlign: 'center', cursor: 'default' }} primaryText={ 'No favorited projects yet...' } />
          } else {
              return favoritedProjects.map(project => {
                  return (<ListItem key={ project.id } hoverColor="transparent" primaryText={ project.name } />)
              })
          }
      }

      return (
          <Card>
            <List style={{ padding: '0' }}>
                { renderProjects() }
            </List>
          </Card>
    );
}

export default FavoritedProjectsList;
      