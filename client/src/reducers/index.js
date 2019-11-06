import { combineReducers } from 'redux';
import hamburgerReducer from './hamburgerReducer';

export default combineReducers({
  hamburgerOn: hamburgerReducer
});
