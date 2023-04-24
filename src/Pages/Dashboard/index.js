import BarChart from "Component/BarChart";
import CardList from "Component/CardList";
import Chart from "Component/chart/Chart";
import TableUser from "Component/TableUser";
import { useEffect, useState } from "react";
import { UserData } from "Utils/Data";
import Axios from "../../Axios/axios";
import NotFound from "Pages/Errors/NotFound";
import "./style.scss";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [userData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    Axios.get("/user/account/user")
      .then((res) => {
        setUserList(res.data.data);
      })
      .catch((error) => {
        console.log(error);
        // navigate('/error')
      });
  }, []);

  return (
    <div>
      <CardList />
      <div className="chart-container">
        <div className="chart-item">
          <Chart />
        </div>

        <div className="chart-bar">
          <BarChart chartData={userData} />
        </div>
      </div>

      <TableUser list={userList} />
    </div>
  );
};

export default Dashboard;
