import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

const PersonTimeTable = (props) => {
    const { person, showProjects } = props;
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

    const renderDayColumns = () => {
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

    const renderAllProjectsRow = () => {
        return (
            <TableRow>
                <TableHeaderColumn style={{ textAlign: 'center' }}>All Projects</TableHeaderColumn>
                { renderDayColumns() }
                <TableHeaderColumn style={{ textAlign: 'center' }}>{ times.total / 60 }</TableHeaderColumn>
            </TableRow>
        )
    }

    const renderProjectRows = () => {
        return person.projects.map((project, index) => {
            const today = new Date().getDay();
            // Add custom alternating row colors
            const backgroundColor = index % 2 ? '#fff' : '#f9f9f9';

            return (
                <TableRow key={ project.projectId } style={{ backgroundColor, border: 'none' }}>
                    <TableRowColumn style={{ textAlign: 'center', whiteSpace: 'initial', padding: '5px' }}>{ project.projectName }</TableRowColumn>

                    <TableRowColumn style={{ textAlign: 'center' }}>{ 0 > today ? '-' : (project.week[0].total / 60) }</TableRowColumn>
                    <TableRowColumn style={{ textAlign: 'center' }}>{ 1 > today ? '-' : (project.week[1].total / 60) }</TableRowColumn>
                    <TableRowColumn style={{ textAlign: 'center' }}>{ 2 > today ? '-' : (project.week[2].total / 60) }</TableRowColumn>
                    <TableRowColumn style={{ textAlign: 'center' }}>{ 3 > today ? '-' : (project.week[3].total / 60) }</TableRowColumn>
                    <TableRowColumn style={{ textAlign: 'center' }}>{ 4 > today ? '-' : (project.week[4].total / 60) }</TableRowColumn>
                    <TableRowColumn style={{ textAlign: 'center' }}>{ 5 > today ? '-' : (project.week[5].total / 60) }</TableRowColumn>
                    <TableRowColumn style={{ textAlign: 'center' }}>{ 6 > today ? '-' : (project.week[6].total / 60) }</TableRowColumn>

                    <TableRowColumn style={{ textAlign: 'center' }}>{ (project.total / 60).toFixed(2) }</TableRowColumn>
                </TableRow>
            )
        });
    }

    return (
        <div className="person-time-table">
            <Table selectable={ false }>
                <TableHeader displaySelectAll={ false } adjustForCheckbox={ false }>
                    <TableRow>
                        <TableHeaderColumn style={{ textAlign: 'center' }}></TableHeaderColumn>
                        { renderDayHeaders() }
                        <TableHeaderColumn style={{ textAlign: 'center' }}>Total</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={ false }>
                    { renderAllProjectsRow() }
                    { showProjects && renderProjectRows() }
                </TableBody>
            </Table>
        </div>
    );
}

export default PersonTimeTable;
