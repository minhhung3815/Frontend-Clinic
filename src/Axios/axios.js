import axios from "axios";
import { LocalHttp, DeployedHttps } from "./Url";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
// import { duration } from "moment";

const Instance = axios.create({
  baseURL: LocalHttp,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosPrivate = axios.create({
  baseURL: LocalHttp,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default Instance;
