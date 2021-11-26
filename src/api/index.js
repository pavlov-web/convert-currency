import axios from "axios";

const api = axios.create({
  baseURL: "https://api.fastforex.io/",
  params: {
    api_key: "f22f78e1f4-6cbbe71f10-r361uu",
  },
});

export default api;
