import React, { Component } from 'react';
import FilteredPeopleList from './FilteredPeopleList';
import PeopleToolbar from './PeopleToolbar';

class PeopleList extends Component {
    constructor(props){
        super(props);
        this.state = {
            filterValue: '',
        }

        this.handleFilterValueChange = this.handleFilterValueChange.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState){
        const { people, user } = this.props;
        const { filterValue } = this.state;
        if(people !== nextProps.people) return true;
        if(user !== nextProps.user) return true;
        if(filterValue !== nextState.filterValue) return true;
        return false;
    }


    handleFilterValueChange(event){
        const filterValue = event.target.value.toLowerCase();
        this.setState({ filterValue });
    }

    render(){
        const { people } = this.props;
        const { filterValue } = this.state;
        const filtered_people = people.filter(person => {
            let name = `${ person['first-name'] } ${ person['last-name'] }`;
            name = name.toLowerCase();
            return name.includes(filterValue);
        });

        return (
            <div>
                <PeopleToolbar handleValueChange={ this.handleFilterValueChange } numberOfPeople={ people.length }/>
                <FilteredPeopleList people={ filtered_people } />
            </div>
        );
    }

}

export default PeopleList;
