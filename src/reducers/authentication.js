import { LOGIN, LOGOUT, SET_USER } from '../constants'

const initialState = {
    isLoggedIn: false,
    user: null,
  }

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, { isLoggedIn: true });

    case LOGOUT:
      return Object.assign({}, state, { isLoggedIn: false });

    case SET_USER:
      return Object.assign({}, state, { user: action.user });

    default:
      return state
  }
}
