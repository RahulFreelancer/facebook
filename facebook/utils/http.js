import axios from "axios";


let cancel;
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  CancelToken:axios.CancelToken,
cancel
};
