import {
  LOGGED_IN,
  LOGGED_OUT
} from '../actions';

const initialState = {
  email: ""
};

function authReducer(state = initialState, action) {
  if (action.type === LOGGED_IN) {
    return {
      email: action.email
    };
  } else if (action.type === LOGGED_OUT) {
    return {
      email: ""
    };
  }
  return state;
};

export default authReducer;
