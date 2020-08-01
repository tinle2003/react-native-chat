import { callApi } from "./callapi";

const getListMessages = (token = "") => {
  return async (dispatch) => {
    return callApi("/chat/list", token).then((messages) => {
      dispatch({
        type: "LIST_MESSAGE",
        payload: messages.data || [],
      });
      return messages.data;
    });
  };
};

const fetchDetailMessage = (token, messageId) => {
  return async (dispatch) => {
    return callApi("/chat/detail", token, { messageId }).then((messages) => {
      dispatch({
        type: "DETAIL_MESSAGE",
        payload: messages.data || [],
      });
      return messages.data;
    });
  };
};

const inviteMessages = (token, idUserInvite) => {
  return async (dispatch) => {
    return callApi("/chat/invite", token, { idUserInvite }).then((messages) => {
      return messages.data;
    });
  };
};

const initTokenDivice = (token, tokenDevice) => {
  return async (dispatch) => {
    return callApi("/chat/init", token, { token: tokenDevice }).then((data) => {
      return data.data;
    });
  };
};

const updateMessagesDetail = (token, id, status,idReceiver) => {
  return async (dispatch) => {
    return callApi("/chat/accept", token, { id, status ,idReceiver}).then((data) => {
      return data.data;
    });
  };
};

const sendMessage = (token, params) => {
  return async (dispatch) => {
    return callApi("/chat/send", token, params).then((data) => {
      return data.data;
    });
  };
};

const saveMessagesId = (messageId) => {
  return (dispatch) => {
    dispatch({
      type: "MESSAGE_ID",
      payload: messageId || "",
    });
  };
};

export {
  getListMessages,
  inviteMessages,
  initTokenDivice,
  updateMessagesDetail,
  sendMessage,
  fetchDetailMessage,
  saveMessagesId
};
