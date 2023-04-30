import BarChart from "Component/BarChart";
import CardList from "Component/CardList";
import Chart from "Component/chart/Chart";
import TableUser from "Component/TableUser";
import { useEffect, useState } from "react";
import { UserData } from "Utils/Data";
import useAxiosPrivate from "Hook/useAxiosPrivate";
import NotFound from "Pages/Errors/NotFound";
import NewContext from "Context/createContext";
import "./style.scss";
import { useLocation, useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();
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
    let isMounted = true;
    const controller = new AbortController();

    const getUser = async () => {
      try {
        const response = await axiosPrivate.get("/user/account/user", {
          signal: controller.signal,
        });
        isMounted && setUserList(response.data?.data);
      } catch (error) {
        console.log(error);
        // navigate("/login", { state: { from: location }, replace: true });
      } finally {
        setLoading(true);
      }
    };

    getUser();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <NewContext.Provider value={{ userList, setUserList }}>
      <CardList />
      <div className="chart-container">
        <div className="chart-item">
          <Chart />
        </div>

        <div className="chart-bar">
          <BarChart chartData={userData} />
        </div>
      </div>

      <TableUser />
    </NewContext.Provider>
  );
};

export default Dashboard;
