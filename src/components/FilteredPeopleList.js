import React from 'react';
import PersonCard from './PersonCard';

const FilteredPeopleList = (props) => {
    const { people } = props;
    return (
            <div>
                { 
                    people.map(person => {
                        return <PersonCard key={ person.id } person={ person }/>
                    }) 
                }
            </div>
        );
}

export default FilteredPeopleList;