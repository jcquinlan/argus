import { SET_PEOPLE, SET_PERSON_PROJECTS } from '../constants'

function person(state = {}, action){
    switch(action.type){
          case SET_PERSON_PROJECTS:
              const { projects } = action;
              return Object.assign({}, state, { projects })
    }
}

export default function people(state = [], action) {
  switch (action.type) {
    case SET_PEOPLE:
      if(!action.people) {
          throw new Error('Action requires an array of people.');
      }
      const people = {};
      action.people.map(person => people[person.id] = person);

      return people;

    case SET_PERSON_PROJECTS:
      if(!action.projects) throw new Error('Action requires array of projects.');
      return Object.assign({}, state, { [person.id]: person(state[person.id], action) });

    default:
      return state
  }
}
