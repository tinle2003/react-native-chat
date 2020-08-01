import { callApi } from "./callapi";

const login = (data) => {
  return async (dispatch) => {
    return callApi("/user/login", null, data).then((users) => {
      dispatch({
        type: "SET_TOKEN",
        payload: users.data.token || "",
      });
      return users.data;
    });
  };
};

const register = (data) => {
  return async (dispatch) => {
    return callApi("/user/register", null, data).then((users) => {
      return users.data;
    });
  };
};

const fetchUserDetail = (token = "") => {
  return async (dispatch) => {
    return callApi("/user/detail", token).then((users) => {
      dispatch({
        type: "SET_PROFILE",
        payload: users.data || {},
      });
      return users.data;
    });
  };
};



export { login, register, fetchUserDetail };
