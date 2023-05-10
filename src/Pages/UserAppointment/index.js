import UserTableAppointment from "Component/UserTableAppointment";
import React from "react";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "Hook/useAxiosPrivate";
import NewContext from "Context/createContext";
import { CalendarOutlined } from "@ant-design/icons";
import "style.scss";
import Loading from "Layout/Loading";

const UserAppointment = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [appointmentList, setAppointmentList] = useState([]);

  function handleClick() {
    navigate("/admin/doctors");
  }
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getAppointment = async () => {
      try {
        const response = await axiosPrivate.get("/appointment/user/all", {
          signal: controller.signal,
        });
        isMounted && setAppointmentList(response?.data?.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    getAppointment();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <>
      <NewContext.Provider
        value={{
          appointmentList,
          setAppointmentList,
        }}
      >
        <div className="nav">
          <div>
            <p style={{ fontSize: "25px" }}>Appointments</p>
          </div>
        </div>
        {loading ? <Loading size="large" /> : <UserTableAppointment />}
      </NewContext.Provider>
    </>
  );
};

export default UserAppointment;
