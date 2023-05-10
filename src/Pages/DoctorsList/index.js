import DoctorCard from "Component/DoctorCard";
import "./style.scss";
import { Button, Empty } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UserContext from "Context/createContext";
import useAxiosPrivate from "Hook/useAxiosPrivate";
import Loading from "Layout/Loading";
import { MoreOutlined, UserAddOutlined } from "@ant-design/icons";
import DoctorCardUser from "Component/DoctorCardUser";

const DoctorsList = () => {
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getDoctor = async () => {
      try {
        const response = await axiosPrivate.get("/user/account/doctor", {
          signal: controller.signal,
        });
        isMounted && setDoctorList(response?.data?.data);
      } catch (error) {
        console.log(error);
        // navigate("/login", { state: { from: location }, replace: true });
      } finally {
        setLoading(false);
      }
    };

    getDoctor();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <>
      <UserContext.Provider value={{ doctorList, setDoctorList }}>
        <div className="nav">
          <div>
            <p style={{ fontSize: "25px", marginLeft: 50 }}>Doctors</p>
          </div>
        </div>
        {loading ? (
          <Loading size="large" />
        ) : doctorList.length > 0 ? (
          <>
            <DoctorCardUser />
          </>
        ) : (
          <Empty style={{ marginTop: "10%" }} />
        )}
      </UserContext.Provider>
    </>
  );
};

export default DoctorsList;
