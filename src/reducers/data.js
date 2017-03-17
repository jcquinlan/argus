import { ADD_PROJECT, ADD_PROJECTS, ADD_PROJECT_PEOPLE, ADD_PROJECT_TIMES, ADD_PROJECT_TASKS, FAVORITE_PROJECT } from '../constants'

// IMPORTANT NOTE //
// State in this reducer will be a single project, not the entire projects object in Redux!
function project(state = {}, action){
  switch(action.type) {
    case ADD_PROJECT_TIMES:
      const { times } = action;
      return Object.assign({}, state, { times })

    case ADD_PROJECT_TASKS:
      const { tasks } = action;
      return Object.assign({}, state, { tasks })

    case ADD_PROJECT_PEOPLE:
      const { people } = action;
      return Object.assign({}, state, people)
    
    case FAVORITE_PROJECT:
      const favorited = state.favorited ? false : true;
      return Object.assign({}, state, { favorited });

    default:
      return state
  }
}

// This Reducer handles only the projects, including people assigned to a project, time entries, etc.
// It is assumed that all actions will require the 'type' attribute.
export default function projects(state = {}, action) {
  switch (action.type) {

    case ADD_PROJECT:
      if(action.project) return Object.assign({}, state, { [action.project.id]: action.project });
      return state;

    case ADD_PROJECTS:
      if(action.projects) {
        // Create a temporary object to store the new projects.
        let new_projects = {};
        // Map over the incoming projects array, and for each one, add it to the new_projects object.
        action.projects.map(project => new_projects[project.id] = project)

        return Object.assign({}, state, new_projects);
      }
      return state;

    case ADD_PROJECT_TIMES:
      if(action.times) {
        if(!action.projectId){
          console.error('Action needs to contain a "companyId" attribute. State not updated.')
          return state;
        }
        // Get Project ID from the action.
        const { projectId } = action;

        return Object.assign({}, state, { [projectId]: project(state[projectId], action) });
      }
      return state;

    case ADD_PROJECT_TASKS:
      if(action.tasks) {
        if(!action.projectId){
          console.error('Action needs to contain a "companyId" attribute. State not updated.')
          return state;
        }
        // Get Project ID from the action.
        const { projectId } = action;

        return Object.assign({}, state, { [projectId]: project(state[projectId], action) });
      }
      return state;

    case ADD_PROJECT_PEOPLE:
      if(action.times) {
        if(!action.projectId){
          console.error('Action needs to contain a "companyId" attribute. State not updated.')
          return state;
        }
        // Get Project ID from the action.
        const { projectId } = action;

        return Object.assign({}, state, { [projectId]: project(state[projectId], action) });
      }
      return state;

    case FAVORITE_PROJECT:
      if(!action.projectId){
          console.error('Action needs to contain a "companyId" attribute. State not updated.')
          return state;
      }
      // Get Project ID from the action.
      const { projectId } = action;
      return Object.assign({}, state, { [projectId]: project(state[projectId], action) });

    default:
      return state
  }
}
