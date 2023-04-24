import axios from "axios";
import { LocalHttp, DeployedHttps } from "./Url";

const Instance = axios.create({
  baseURL: LocalHttp,
  headers: {
    "Content-Type": "application/json",
    // 'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
    Authorization:
      "Bearer " +
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MWViMDBjN2E3MWNmNTAyOWQ4MzczNyIsIm5hbWUiOiJNYW5hZ2VyMSIsInJvbGUiOiJtYW5hZ2VyIiwiZW1haWwiOiJtYW5hZ2VyMUBtYWlsLmNvbSIsImlhdCI6MTY4MjMwMDA1OCwiZXhwIjoxNjgyOTA0ODU4fQ.gLBoImZRAZbjObcyPVz1saK7608jH6RZfHK1dJlD28s",
  },
});

// instance.interceptors.response.use(
//   (response) => {
//     return response
//   },
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       // Handle unauthorized error (e.g. redirect to login page)
//       console.log('Unauthorized')
//     } else {
//       // Handle other errors (e.g. display error message and redirect to error page)
//       console.error('An error occurred:', error.message)
//       window.location.href = '/error'
//     }
//     return Promise.reject(error)
//   }
// )

export default Instance;
