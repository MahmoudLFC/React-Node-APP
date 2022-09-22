import axios from "axios";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

export default {
    get: axios.get, post: axios.post, put: axios.put, delete: axios.delete
};
