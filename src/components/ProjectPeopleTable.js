import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

const ProjectPeopleTable = (props) => {
    const { project } = props;
    const { people } = project.times;

    const renderPersonRow = (people) => {
        return people.map((person, index) => {
            return <TableRow
                key={ person.id } >
                    <TableRowColumn>{ person.name }</TableRowColumn>
                    <TableRowColumn>{ person.times.lastWeek.total / 60 }</TableRowColumn>
                    <TableRowColumn>{ person.times.thisWeek.total / 60 }</TableRowColumn>
                    <TableRowColumn>{ (person.times.total / 60).toFixed(2) }</TableRowColumn>
                </TableRow>
        })
    }

    return (
        <Table>
            <TableHeader displaySelectAll={ false } adjustForCheckbox={ false }>
                <TableRow>
                    <TableHeaderColumn>People</TableHeaderColumn>
                    <TableHeaderColumn>Last Week</TableHeaderColumn>
                    <TableHeaderColumn>This Week</TableHeaderColumn>
                    <TableHeaderColumn>Total Hrs.</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={ false }>
                { people && renderPersonRow(people) }
                <TableRow>
                    <TableRowColumn>Totals</TableRowColumn>
                    <TableRowColumn>{ project.times.lastWeekTotal / 60 }</TableRowColumn>
                    <TableRowColumn>{ project.times.thisWeekTotal / 60 }</TableRowColumn>
                    <TableRowColumn>{ (project.times.minutesLogged / 60).toFixed(2) }</TableRowColumn>
                </TableRow>
            </TableBody>
        </Table>

    );
}

export default ProjectPeopleTable;
