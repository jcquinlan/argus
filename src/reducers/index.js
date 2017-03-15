import { combineReducers } from 'redux'
import authentication from './authentication';
import projects from './data';
import people from './people';
import { reducer as toastrReducer } from 'react-redux-toastr'

const rootReducer = combineReducers({
  authentication,
  people,
  projects,
  toastr: toastrReducer,
})

export default rootReducer