import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  Col,
  Row,
  Popover,
  notification,
  Pagination,
  Modal,
  Space,
  Tag,
} from "antd";
import NewContext from "Context/createContext";
import { MoreOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "Hook/useAxiosPrivate";
import {
  EditOutlined,
  EllipsisOutlined,
  UserAddOutlined,
  PlusOutlined,
  DeleteFilled,
  EyeOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import "./style.scss";
import UserContext from "Context/createContext";
import NewAppointment from "Component/AppointmentForm";
import NewAppointmentModal from "Component/AppointmentModal";
import UserAppointmentModal from "Component/UserAppointmentModal";
import useAuth from "Hook/useAuth";

const PAGE_SIZE = 6;

const DoctorCardUser = () => {
  const { auth } = useAuth();
  const { doctorList, setDoctorList } = useContext(UserContext);
  const isLogined = localStorage.getItem("isLogined");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [doctorName, setDoctorName] = useState("");
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * PAGE_SIZE;
  const indexOfFirstItem = indexOfLastItem - PAGE_SIZE;
  const currentItems = doctorList.slice(indexOfFirstItem, indexOfLastItem);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleClick = (data) => {
    if (!isLogined) {
      notification.warning({
        message: "Warning",
        description: "Sign In to access this feature",
      });
      navigate("/login");
    } else {
      setIsModalOpen(true);
      setSelectedDoctor(data?._id);
      setDoctorName(data?.name);
      setCurrentUser({ username: auth?.username, email: auth?.email });
    }
  };

  return (
    <>
      <NewContext.Provider
        value={{
          isModalOpen,
          setIsModalOpen,
          selectedDoctor,
          setSelectedDoctor,
          doctorName,
          setDoctorName,
          currentUser,
        }}
      >
        <Row gutter={16}>
          {currentItems.map((data) => (
            <Col span={8} key={data._id}>
              <Card
                className="doctor-card"
                actions={[
                  <CalendarOutlined
                    type="default"
                    key="edit"
                    title="Make Appointment"
                    style={{ color: "#4663ac", fontSize: 20 }}
                    onClick={() => {
                      handleClick(data);
                    }}
                  />,
                ]}
              >
                <div className="avatar">
                  <img src={data.avatar.url} alt="qwe" />
                </div>
                <div className="name">{data.name}</div>
                <div className="age">{data.email}</div>
                <div className="staff">{data.description}</div>
                <Space align="baseline">
                  {data?.specialization?.map((data) => (
                    <Tag
                      key={data}
                      style={{
                        background: "#e1f1fd",
                        color: "#4663ac",
                        fontWeight: "bold",
                      }}
                    >
                      {data}
                    </Tag>
                  ))}
                </Space>
                {/* <div className="address">{data.address}</div> */}
              </Card>
            </Col>
          ))}
        </Row>
        <Pagination
          current={currentPage}
          pageSize={PAGE_SIZE}
          total={doctorList.length}
          onChange={handlePageChange}
        />
        <UserAppointmentModal />
      </NewContext.Provider>
    </>
  );
};

export default DoctorCardUser;
