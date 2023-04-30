import axios from "axios";
import { LocalHttp, DeployedHttps } from "./Url";

const Instance = axios.create({
  baseURL: DeployedHttps,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": true,
  },
});

export const axiosPrivate = axios.create({
  baseURL: DeployedHttps,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": true,
  },
});

export default Instance;
