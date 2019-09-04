import { createStore, combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import scheduleReducer from './reducers/scheduleReducer';

const reducers = combineReducers({
  authState: authReducer,
  scheduleState: scheduleReducer
});

const store = createStore(reducers);

export default store;
