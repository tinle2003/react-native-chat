const initialState = {
  messageList: [],
  detalMessage: [],
  messageID: "",
};

const message = (state = initialState, action) => {
  switch (action.type) {
    case "LIST_MESSAGE":
      return { ...state, messageList: action.payload };
    case "DETAIL_MESSAGE":
      return { ...state, detalMessage: action.payload };
    case "MESSAGE_ID":
      return { ...state, messageID: action.payload };
    default:
      return state;
  }
};

export default message;
