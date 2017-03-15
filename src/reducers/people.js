import { SET_PEOPLE } from '../constants'

export default function people(state = [], action) {
  switch (action.type) {
    case SET_PEOPLE:
      if(action.people) return action.people;
      console.error('Action requires a "people" attribute. State not updated.');
      return state;

    default:
      return state
  }
}
