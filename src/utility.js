import { FAVORITE_PROJECT, LOCAL_STORAGE_PROJECTS } from './constants';
import moment from 'moment';

export function updateLocalStorageFavoritedProjects(action){
    let favorited_projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECTS)) || [];
    const project_index = favorited_projects.indexOf(action.projectId);
    let new_favorited_projects = favorited_projects.slice();

    switch(action.type){
        case FAVORITE_PROJECT:
            if(project_index < 0){
                new_favorited_projects.push(action.projectId);
            } else {
                new_favorited_projects.splice(project_index, 1);
            }
            break;
        default:
            break;
    }
    localStorage.setItem(LOCAL_STORAGE_PROJECTS, JSON.stringify(new_favorited_projects));
}

// Returns a DATE object set to the next instance of the desired day of the week.
export function getNearestFutureDay(day){
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = new Date();
    let final_date = new Date();
    const current_day = today.getDay();
    const desired_day = days.indexOf(day.toLowerCase());
    let day_difference = desired_day - current_day;

    // If the desired day already passed this week, find out how many days until it comes back around.
    if(day_difference < 0) day_difference = (7 - Math.abs(day_difference));

    // Set the final_date
    final_date = new Date(final_date.setDate(today.getDate() + day_difference));

    return final_date;
}

export function getDayByWeek(day, weeksPast){
	const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const index = days.indexOf(day);
	return moment().day(index + (weeksPast ? weeksPast * 7: 0)).toDate();
}

export function getNearestPastDay(day){
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = new Date();
    let final_date = new Date();
    const current_day = today.getDay();
    const desired_day = days.indexOf(day.toLowerCase());
    let day_difference = desired_day - current_day;

    if(day_difference >= 0) day_difference = (7 - Math.abs(day_difference)) * -1;

     // Set the final_date
    final_date = new Date(final_date.setDate(today.getDate() + day_difference));

    return final_date;
}

// Takes time entries from Teamwork and organizes them into an array of objects that each represent a day of the week
// with each object containing time information and the actual entries made on that dayfunction organizeTimesIntoWeekDays(times, weekOffset){
export function organizeTimesIntoWeekDays(times, weekOffset){
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',];
    const sunday = getDayByWeek('sunday', weekOffset);

    return days.map((day, index) => {
      let iterative_day = moment(sunday).add(index, 'days').hours(9).startOf('hour').unix();
      let iterative_day_plus_one = moment(sunday).add(index + 1, 'days').hours(9).startOf('hour').unix();
      
      const entries = times.filter(time => {
              const date = moment(time.date).unix();
              return date > iterative_day && date < iterative_day_plus_one;
          });

      const total = entries.reduce((sum, time) => {
              return sum + getEntryMinutes(time);
          }, 0);
      
      return { day, date: iterative_day, index, total, entries }
    })
}

// Formats a date object specifically for Teamwork's query parameters
export function formatDate(date){
      const month = appendZero(date.getMonth() + 1);
      const date_number = appendZero(date.getDate());
      return '' + date.getFullYear() + month + date_number;
  }

function appendZero(number){
      if(number < 10) return '0' + number;
      return number;
  }

export function gleenPeopleFromTimeEntries(entries){
    let people = [];
    entries.forEach(entry => {
        const person = { name: `${ entry['person-first-name'] } ${ entry['person-last-name'] }`, id: entry['person-id'] };
        if(searchArrayForObject(people, person) === -1) people.push(person); 
    });
    return people;
}

// Takes the array of objects and an object, returns index of the object in the array.
// Returns -1 if the object is not in the array.
function searchArrayForObject(array, object){
    let index = -1;
    for(let i = 0; i < array.length; i++){
        let objectsAreSame = true;
        const currentObject = array[i];

        if(typeof currentObject !== 'object') throw new Error('Item must be an object.');

        const currentObjectValues = Object.values(currentObject);
        const objectValues = Object.values(object);

        if(currentObjectValues.length === objectValues.length){
            
            for(let j = 0; j < currentObjectValues.length; j++){
                if(currentObjectValues[j] !== objectValues[j]){
                    objectsAreSame = false;
                }
            }

            if(objectsAreSame){
                index = i;
                break;
            }
        }
    }
    return index;
}

export function getEntryMinutes(entry){
    return (parseInt(entry.hours, 10) * 60) + parseInt(entry.minutes, 10);
}

export function getProjectURL(projectId){
    return `https://bricksimple.teamwork.com/#/projects/${ projectId }/overview/summary`;
}

export function getPersonURL(personId){
    return `https://bricksimple.teamwork.com/#/people/${ personId }`;
}

