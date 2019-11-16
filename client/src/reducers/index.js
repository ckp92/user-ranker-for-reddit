import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import hamburgerReducer from "./hamburgerReducer";
import headerNotificationReducer from "./headerNotificationReducer";
import reviewReducer from "./reviewReducer";
import emailReducer from "./emailReducer";
import currentlySearchingReducer from "./currentlySearchingReducer";
import searchTypeReducer from "./searchTypeReducer";
import dataReducer from "./dataReducer";
import sortReducer from "./sortReducer";

export default combineReducers({
  hamburgerOn: hamburgerReducer,
  headerNotificationOn: headerNotificationReducer,
  reviewOn: reviewReducer,
  emailStatus: emailReducer,
  currentlySearching: currentlySearchingReducer,
  searchType: searchTypeReducer,
  data: dataReducer,
  sort: sortReducer,
  form: formReducer
});
