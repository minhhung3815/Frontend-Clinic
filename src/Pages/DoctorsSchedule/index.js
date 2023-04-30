import TableSchedule from "Component/TableSchedule";
import "./style.scss";
import { Button } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const DoctorsSchedule = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/new-schedule");
  };
  return (
    <>
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
      <TableSchedule />
    </>
  );
};

export default DoctorsSchedule;
