import { combineReducers } from "redux";
import message from "./message";
import user from "./user";

const appReducer = combineReducers({
  message,
  user,
});

const initialState = appReducer({}, {});
const rootReducer = (state, action) => {
  if (action.type === "APP_LOGOUT") {
    state = initialState;
  }

  return appReducer(state, action);
};

export default rootReducer;
