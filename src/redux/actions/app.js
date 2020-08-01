const logout = () => {
  return (dispatch) => {
    dispatch({
      type: "APP_LOGOUT",
      payload:{},
    });
    return true;
  };
};

export { logout };
