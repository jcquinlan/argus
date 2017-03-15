import React from 'react';
import { List, ListItem } from 'material-ui/List';
import { Card } from 'material-ui/Card';

const FavoritedProjectsList = (props) => {
      const { favoritedProjects } = props;
      const renderProjects = () => {
          return favoritedProjects.map(project => {
              return (<ListItem key={ project.id } primaryText={ project.name } />)
          })
      }

      return (
          <Card>
            <List>
                { renderProjects() }
            </List>
          </Card>
    );
}

export default FavoritedProjectsList;
      