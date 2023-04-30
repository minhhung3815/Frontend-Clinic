import DoctorCard from "Component/DoctorCard";
import "./style.scss";
import { Button, Empty } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UserContext from "Context/createContext";
import useAxiosPrivate from "Hook/useAxiosPrivate";
import Loading from "Layout/Loading";
import { MoreOutlined, UserAddOutlined } from "@ant-design/icons";

const Doctors = () => {
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [doctorList, setDoctorList] = useState([]);

  function handleClick() {
    navigate("/new-doctor");
  }
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getDoctor = async () => {
      try {
        const response = await axiosPrivate.get("/user/account/doctor", {
          signal: controller.signal,
        });
        isMounted && setDoctorList(response.data.data);
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
    // axiosPrivate
    //   .get("/user/account/doctor")
    //   .then((res) => {
    //     setDoctorList(res.data.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     // navigate('/error')
    //   });
  }, []);
  return (
    <>
      <UserContext.Provider value={{ doctorList, setDoctorList }}>
        <div className="nav">
          <div>
            <p style={{ fontSize: "25px" }}>Doctors</p>
          </div>
          <div>
            <UserAddOutlined
              type="primary"
              style={{ fontSize: "16px" }}
              onClick={handleClick}
            />
          </div>
        </div>
        {loading ? (
          <Loading size="large" />
        ) : doctorList.length > 0 ? (
          <>
            <DoctorCard />
          </>
        ) : (
          <Empty style={{ marginTop: "10%" }} />
        )}
      </UserContext.Provider>
    </>
  );
};

export default Doctors;
