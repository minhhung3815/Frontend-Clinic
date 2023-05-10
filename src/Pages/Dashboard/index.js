import BarChart from "Component/BarChart";
import CardList from "Component/CardList";
import TableUser from "Component/TableUser";
import Chart from "Component/chart/Chart";
import NewContext from "Context/createContext";
import useAxiosPrivate from "Hook/useAxiosPrivate";
import Loading from "Layout/Loading";
import { UserData } from "Utils/Data";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./style.scss";
const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [accountLoading, setAccountLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();
  const [userList, setUserList] = useState([]);
  const [totalAccount, setTotalAccount] = useState([]);
  const [totalAppointments, setTotalAppointments] = useState([]);
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
        isMounted && setUserList(response?.data?.data);
      } catch (error) {
        console.log(error);
        // navigate("/login", { state: { from: location }, replace: true });
      } finally {
        setLoading(false);
      }
    };

    getUser();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getAccounts = async () => {
      try {
        const response = await axiosPrivate.get("/statistic/total", {
          signal: controller.signal,
        });
        isMounted && setTotalAccount(response?.data?.data);
      } catch (error) {
        console.log(error);
        // navigate("/login", { state: { from: location }, replace: true });
      } finally {
        setAccountLoading(false);
      }
    };

    getAccounts();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getAppointments = async () => {
      try {
        const response = await axiosPrivate.get("/statistic/appointments", {
          signal: controller.signal,
        });
        isMounted && setTotalAppointments(response?.data?.data);
      } catch (error) {
        console.log(error);
        // navigate("/login", { state: { from: location }, replace: true });
      } finally {
        setAccountLoading(false);
      }
    };

    getAppointments();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <NewContext.Provider
      value={{
        userList,
        setUserList,
        totalAccount,
        setTotalAccount,
        totalAppointments,
      }}
    >
      {accountLoading ? <Loading size="default" /> : <CardList />}
      <div className="chart-container">
        <div className="chart-item">
          <Chart />
        </div>

        <div className="chart-bar">
          <BarChart chartData={userData} />
        </div>
      </div>

      {loading ? <Loading size="default" /> : <TableUser />}
    </NewContext.Provider>
  );
};

export default Dashboard;
