import axios from "axios";

const testConnection = {
  baseURL: "http://localhost:6000/",
};
const productionConnection = {
  baseURL: "https://careful-jade-ox.cyclic.app/",
};
const axiosClient = axios.create({
  baseURL: productionConnection.baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
export default axiosClient;
