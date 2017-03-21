import React, { Component } from 'react';
import Pagination from 'rc-pagination';
import FilteredProjectsList from './FilteredProjectsList';
import ProjectToolbar from './ProjectToolbar';
import 'rc-pagination/assets/index.css';

class ProjectList extends Component {
    constructor(props){
        super(props);
        this.state = {
            filterValue: '',
            currentPage: 1,
            pageSize: 10,
        }

        this.handleFilterValueChange = this.handleFilterValueChange.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    handleFilterValueChange(event){
        const filterValue = event.target.value.toLowerCase();
        this.setState({ filterValue });
    }

    handlePageChange(currentPage){
        this.setState({ currentPage });
        window.scrollTo(0, 0);
    }

    sliceArrayByPage(array, currentPage, pageSize){
        const start = (currentPage - 1) * pageSize;
        const end = (start + pageSize);
        return array.slice(start, end);
    }

    renderProjectsList(){
        const { projects } = this.props;
        if(projects.length){
            const { filterValue, currentPage, pageSize } = this.state;
            // This contains the projects array after the seach term is applied.
            const filtered_projects = filterValue ? projects.filter(project => project.name.includes(filterValue)) : projects;
            // This takes the array with search terms applies and paginates the results.
            const paginated_projects = this.sliceArrayByPage(filtered_projects, currentPage, pageSize);

            return (
                <div>
                    <Pagination onChange={ this.handlePageChange } current={ currentPage } pageSize={ pageSize } total={ filtered_projects.length } />
                    <ProjectToolbar handleValueChange={ this.handleFilterValueChange } numberOfProjects={ projects.length } />
                    <FilteredProjectsList projects={ paginated_projects } />
                    <Pagination onChange={ this.handlePageChange } current={ currentPage } pageSize={ pageSize } total={ filtered_projects.length } />
                </div>
            )
        }
    }

    render(){
        return (
            <div>
                { this.renderProjectsList() }
            </div>
        );
    }

}

export default ProjectList;
