import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

const PersonTimeTable = (props) => {
    const { person } = props;
    const times = person.times;

    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S',];
    const column_colors = {
        today: 'rgba(86, 193, 91, .2)',
        zero: 'rgba(244, 88, 0, 0.2)'
    } 

    const determine_day_color = (today, day, index) => {
        let color;
        // If there are no hours, and its not the weekend, mark this with a warning color;
        if(day.total === 0 && index !== 0 && index !== 6) color = column_colors['zero'];
        if(index === today) color = column_colors['today'];
        if(index > today) color = 'inherit';
        return color;
    }

    const renderDayHeaders = () => {
        return days.map(day => {
            return <TableHeaderColumn 
                key={ day }
                style={{ textAlign: 'center' }}>
                    { day }
                </TableHeaderColumn>
        })
    }

    const renderDayRow = () => {
        const today = new Date().getDay();

        return times.by_day.map((day, index) => {
            const styles = {
                textAlign: 'center',
                backgroundColor: determine_day_color(today, day, index),
            }

            return <TableRowColumn 
                key={ day.day } 
                style={ styles }>
                    { index > today ? '-' : day.total / 60}
                </TableRowColumn>
        })
    }

    return (
        <Table>
            <TableHeader displaySelectAll={ false } adjustForCheckbox={ false }>
                <TableRow>
                    { renderDayHeaders() }
                    <TableHeaderColumn style={{ textAlign: 'center' }}>Total</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={ false }>
                <TableRow>
                    { renderDayRow() }
                    <TableHeaderColumn style={{ textAlign: 'center' }}>{ times.total / 60 }</TableHeaderColumn>
                </TableRow>
            </TableBody>
        </Table>

    );
}

export default PersonTimeTable;
