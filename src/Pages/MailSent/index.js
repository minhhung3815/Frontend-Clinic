// import Prescription from "Component/Prescription";
import { PlusCircleOutlined } from "@ant-design/icons";
import SentTable from "Component/SentTable";
import NewContext from "Context/createContext";
import useAxiosPrivate from "Hook/useAxiosPrivate";
import Loading from "Layout/Loading";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const SentMail = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [sentList, setSentList] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleClick = () => {
    navigate("/new-request");
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getRequest = async () => {
      try {
        const response = await axiosPrivate.get("/request/user/requests", {
          signal: controller.signal,
        });
        isMounted && setSentList(response?.data?.data);
      } catch (error) {
        console.log(error);
        // navigate("/login", { state: { from: location }, replace: true });
      } finally {
        setLoading(false);
      }
    };

    getRequest();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <>
      <NewContext.Provider value={{ sentList, setSentList }}>
        <div className="nav">
          <div>
            <p style={{ fontSize: "25px" }}>Sent Requests</p>
          </div>
          <div>
            <PlusCircleOutlined
              type="primary" style={{ background: "#1e8ed8" }}
              style={{ fontSize: "16px" }}
              onClick={handleClick}
            />
          </div>
        </div>
        {loading ? <Loading size="large" /> : <SentTable />}
      </NewContext.Provider>
    </>
  );
};

export default SentMail;
