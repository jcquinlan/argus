import React from 'react';
import FontIcon from 'material-ui/FontIcon';

const styles = {
    cursor: 'pointer',
    top: '8px',
    marginRight: '10px',
}

const FavoriteProjectIcon = (props) => {
    const { project, toggleFavoriteProject } = props;
    const icon_color = props.project.favorited ? '#ffeb2d' : '#eee';
    
    return (
        <FontIcon className="material-icons" onClick={ () => toggleFavoriteProject(project.id) } style={ styles } hoverColor={ '#fff591' } color={ icon_color }>star</FontIcon>
    )
}

export default FavoriteProjectIcon