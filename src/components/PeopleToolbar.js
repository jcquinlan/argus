import React from 'react';
import DebouncedInput from './DebouncedInput';
import Chip from 'material-ui/Chip';
import Paper from 'material-ui/Paper';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

const PeopleToolbar = (props) => {

    return (
        <Paper zDepth={ 1 }>
        <Toolbar style={{ backgroundColor: '#fff', marginBottom: '30px' }}>
            <ToolbarGroup firstChild={true}>
                <DebouncedInput 
                    style={{ padding: '10px', width: '400px', border: 'none', outline: 'none' }}
                    handleValueChange={ props.handleValueChange }
                    debounceTimeLength={ 200 }
                    placeholder="Search People"/>
            </ToolbarGroup>
            <ToolbarGroup>
                <Chip backgroundColor={ '#13C15B' } labelColor={ '#fff' }>{ props.numberOfPeople } total</Chip>
            </ToolbarGroup>
        </Toolbar>
        </Paper>
    );
}

PeopleToolbar.propTypes = {
    numberOfPeople: React.PropTypes.number,
    handleValueChange: React.PropTypes.func,
}

export default PeopleToolbar;