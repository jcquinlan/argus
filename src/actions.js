import axios from 'axios';
import { browserHistory } from 'react-router';
import { LOGIN, LOGOUT, SET_USER, SET_PEOPLE, ADD_PROJECT, ADD_PROJECTS, ADD_PROJECT_PEOPLE, ADD_PROJECT_TIMES, FAVORITE_PROJECT, LOCAL_STORAGE_PROJECTS } from './constants';
import { formatDate, organizeTimesIntoWeekDays, getNearestFutureDay, gleenPeopleFromTimeEntries, getDayByWeek, getEntryMinutes } from './utility';

// ASYNCRONOUS ACTIONS
export function loginHandler(key, company){
    return function(dispatch){
        axios.defaults.baseURL = `http://${ company }.teamwork.com`;
        axios.defaults.headers.common['Authorization'] = 'Basic ' + btoa(key + ':anything');

        return axios.get('/me.json').then(response => {
            // If it all goes smoothly, save locally, update User and Logged In, and route to projects.
            if(response.status === 200){
                localStorage.setItem('api_key', key);
                localStorage.setItem('company', company);
                localStorage.setItem('user', JSON.stringify(response.data.person));
                dispatch(setUser(response.data.person));
                dispatch(login());

                browserHistory.push('/');
            }
        },
        error => {
            console.error('Incorrect login credentials provided');
        })
    }
}

export function fetchProjects(){
    return function(dispatch){
        const key = localStorage.getItem('api_key');
        const company = localStorage.getItem('company');
        const favorited_projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECTS)) || [];

        // If the API Key or the Company name are not saved to local storage, log the user out.
        // This should be checked on every API call to prevent errors before initiating a network request.
        if(!(key && company)){
            console.error('API Key or Company name missing: Logging user out.');
            dispatch(logout());
            return;
        }

        // We are assuming the axios defaults already include the necessary headers to complete the request.
        //
        // TODO: Listen for the failed Authentication header, then emit LOGOUT action and reroute to login view.
        //
        return axios.get('projects.json')
            .then(response => {
                // Map over each project, and see if any of them are persisted as being "favorited" via localStorage.
                // If they are, set the favorited attribute to true.
                const projects = response.data.projects.map(project => {
                    const times = [];
                    const id = project.id.toString();
                    const favorited = favorited_projects.includes(id);
                    return Object.assign({}, project, { favorited, times })
                });
                
                dispatch(addProjects(projects));
            },
            error => {
                console.error(error);
            })
    }
}

// Handles the async operations to retrieve times and people at the same time so the data can be marshalled
// into a new structure that is easier for the functional components to consume.
export function fetchPeopleAndPastWeekTimes(companyId){
    return function(dispatch){
        return axios.all([fetchPastWeekTimes(), fetchPeople(companyId)])
                .then(axios.spread((all_times, people) => {
                    // Update the Redux state using prop methods passed from container component
                    people = people.data.people.filter(person => !person.administrator);

                    // Map each persons times to the corresponding person object
                    people = people
                        .map(person => {
                            // Get all time entries for this person
                            const all = all_times.filter(time => time['person-id'] === person.id);
                            const total = all.reduce((sum, entry) => {
                                return sum + getEntryMinutes(entry);
                            }, 0);

                            // Organize all time entries by day of the week
                            const by_day = organizeTimesIntoWeekDays(all);

                            const times = { total, all, by_day }
                            // Return a new copy of the person object with their time entries attached
                            return Object.assign({}, person, { times })
                        });

                    dispatch(setPeople(people));
                }));
    }
}

function fetchPeople(companyId){
    return axios.get(`companies/${ companyId }/people.json`)
}

// Fetches all the time entries for the past week.
function fetchPastWeekTimes(){
    let times = [];
    let day = getNearestFutureDay('saturday');
    let one_week_ago = new Date();
    let formatted_day;
    let formatted_one_week_ago;
    // Set Date object to 9am this morning
    day.setHours(23, 59, 59);
    formatted_day = formatDate(day);
    // Create Date object for exactly one week prior
    one_week_ago = new Date(day.setDate(day.getDate() - 7));
    formatted_one_week_ago = formatDate(one_week_ago)

    return new Promise(function(resolve,reject){
        getTimes();

        function getTimes(page = 1){
            axios.get(`/time_entries.json?fromdate=${ formatted_one_week_ago }&todate=${ formatted_day }&page=${ page }`)
                .then(response => {
                    const currentPage = response.headers['x-page'];
                    const totalPages = response.headers['x-pages'];
                    
                    times = times.concat(response.data['time-entries']);

                    if(currentPage < totalPages){
                        getTimes(page + 1);
                    } else {
                        resolve(times);
                    }
                })
        }
    })
  }

export function fetchProjectTimesAndEstimates(projectId){
    return function(dispatch){
        return axios.all([fetchProjectTimes(projectId), fetchProjectEstimates(projectId)])
                .then(axios.spread((entries, estimates) => {
                    estimates = estimates.data.projects[0];
                    const minutesEstimated = parseInt(estimates['time-estimates']['total-mins-estimated'], 10);
                    const minutesLogged = parseInt(estimates['time-totals']['total-mins-sum'], 10);
                    const peopleList = gleenPeopleFromTimeEntries(entries);
                    const people = peopleList.map(person => {
                        const filteredEntries = entries.filter(entry => entry['person-id'] === person.id)
                        const total = filteredEntries.reduce((sum, entry) => {
                            return sum + ((parseInt(entry.hours, 10) * 60) + parseInt(entry.minutes, 10));
                        }, 0);

                        const thisWeek = organizeTimesIntoWeekDays(filteredEntries, 0);
                        const lastWeek = organizeTimesIntoWeekDays(filteredEntries, -1);

                        console.log(lastWeek);

                        const thisWeekTotal = thisWeek.reduce((sum, day) => {
                            const dayTotal = day.entries.reduce((sum, entry) => sum + getEntryMinutes(entry), 0);
                            return sum + dayTotal;
                        }, 0);

                        const lastWeekTotal = lastWeek.reduce((sum, day) => {
                            return sum + day.total;
                        }, 0);

                        const personTimes = { 
                            entries: filteredEntries,
                            thisWeek: { thisWeek, total: thisWeekTotal },
                            lastWeek: { lastWeek, total: lastWeekTotal },
                            total,
                        };
                        
                        return Object.assign({}, person, { times: personTimes })
                    });

                    const times = { entries, minutesEstimated, minutesLogged, people };
                    dispatch(addProjectTimes(projectId, times))
                }));
    }
}

export function fetchProjectTimes(projectId){
    let times = [];

    return new Promise(function(resolve, reject){
        fetchTimesPage();

        function fetchTimesPage(page = 1){
            axios.get(`projects/${ projectId }/time_entries.json?page=${ page }`)
                .then(response => {
                    const time_entries = response.data['time-entries'];
                    const currentPage = response.headers['x-page'];
                    const totalPages = response.headers['x-pages'];
                    times = times.concat(time_entries);

                    if(currentPage < totalPages){
                        fetchTimesPage(page + 1);
                    } else {
                        resolve(times);
                    }
                })
        }
    })
}

export function fetchProjectEstimates(projectId){
    return axios.get(`projects/${ projectId }/time/total.json`)
}

// SYNCONRONOUS ACTIONS
export function login(){
    console.log('Logging user in.');
    return {
        type: LOGIN,
    }
}

export function logout(){
    console.log('Logging user out.');
    return {
        type: LOGOUT,
    }
}

export function setUser(user){
    return {
        type: SET_USER,
        user,
    }
}

export function setPeople(people){
    return {
        type: SET_PEOPLE,
        people,
    }
} 

export function addProject(project){
    return {
        type: ADD_PROJECT,
        project,
    }
}

export function addProjects(projects){
    return {
        type: ADD_PROJECTS,
        projects,
    }
}

export function addProjectTimes(projectId, times){
    return {
        type: ADD_PROJECT_TIMES,
        projectId,
        times,
    }
}

export function addProjectPeople(projectId, people){
    return {
        type: ADD_PROJECT_PEOPLE,
        projectId,
        people,
    }
}

export function toggleFavoriteProject(projectId){
    return {
        type: FAVORITE_PROJECT,
        projectId,
    }
}
   