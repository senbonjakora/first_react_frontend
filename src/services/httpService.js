import axios from "axios";
import { toast } from "react-toastify";

function setJsonWebToken(jsonWebToken) {
  axios.defaults.headers.common["x-auth-token"] = jsonWebToken;
}

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, (error) => {
  const expactedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expactedError) {
    console.log("Logging the error ", error);
    toast.error("An unexpected error occurred!");
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJsonWebToken,
};
