import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import hamburgerReducer from './hamburgerReducer';
import headerNotificationReducer from './headerNotificationReducer';
import reviewReducer from './reviewReducer';
import emailReducer from './emailReducer';

export default combineReducers({
  hamburgerOn: hamburgerReducer,
  headerNotificationOn: headerNotificationReducer,
  reviewOn: reviewReducer,
  emailStatus: emailReducer,
  form: formReducer
});
