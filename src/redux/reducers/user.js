const initialState = {
  token: "",
  profile:{}
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return { ...state, token: action.payload };

    case "SET_PROFILE":
      return {...state,profile:action.payload}
    default:
      return state;
  }
};

export default user;
