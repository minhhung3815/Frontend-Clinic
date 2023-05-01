import TableSchedule from "Component/TableSchedule";
import "./style.scss";
import { CalendarOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosPrivate from "Hook/useAxiosPrivate";
import NewContext from "Context/createContext";
import Loading from "Layout/Loading";

const DoctorsSchedule = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(true);
  const [scheduleList, setScheduleList] = useState([]);

  const handleClick = () => {
    navigate("/new-schedule");
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getSchedule = async () => {
      try {
        const response = await axiosPrivate.get("/schedule/all", {
          signal: controller.signal,
        });
        isMounted && setScheduleList(response?.data?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getSchedule();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <>
      <NewContext.Provider value={{ scheduleList, setScheduleList }}>
        <div className="nav">
          <div>
            <p style={{ fontSize: "25px" }}>Schedule</p>
          </div>
          <div>
            <CalendarOutlined
              type="primary"
              style={{ fontSize: "16px" }}
              onClick={handleClick}
            />
          </div>
        </div>
        {loading ? <Loading size="large" /> : <TableSchedule />}
      </NewContext.Provider>
    </>
  );
};

export default DoctorsSchedule;
