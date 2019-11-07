import { combineReducers } from 'redux';
import hamburgerReducer from './hamburgerReducer';
import headerNotificationReducer from './headerNotificationReducer';

export default combineReducers({
  hamburgerOn: hamburgerReducer,
  headerNotificationOn: headerNotificationReducer
});
