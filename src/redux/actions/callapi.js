import Axios from "axios";
const host = "http://192.168.31.46:3333/api";
export const callApi = (url, token = "", data=null) => {
  return Axios({
    method: "POST",
    url: `${host}${url}`,
    data,
    validateStatus: (status) => {
      return true; // I'm always returning true, you may want to do it depending on the status received
    },
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
};
