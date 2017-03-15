import React from 'react';
import ProjectCardContainer from '../containers/ProjectCardContainer';

const FilteredProjectsList = (props) => {
    const { projects } = props;
    return (
            <div>
                { 
                    projects.map(project => {
                        return <ProjectCardContainer key={ project.id } project={ project }/>
                    }) 
                }
            </div>
        );
}

export default FilteredProjectsList;