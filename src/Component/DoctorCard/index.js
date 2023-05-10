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
} from "@ant-design/icons";
import "./style.scss";
import UserContext from "Context/createContext";
import NewAppointment from "Component/AppointmentForm";
import NewAppointmentModal from "Component/AppointmentModal";

const PAGE_SIZE = 6;

const DoctorCard = () => {
  const { doctorList, setDoctorList } = useContext(UserContext);
  const [selectedDoctor, setSelectedDoctor] = useState("");
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

  const handleClick = (id) => {
    navigate(`/admin/edit/doctor/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axiosPrivate.delete(`/user/remove/doctor/${id}`);
      if (response.data.success === true) {
        setDoctorList(doctorList.filter((user) => user._id !== id));
        notification.success({
          message: "Success",
          description: response?.data?.data,
          duration: 1,
        });
      }
    } catch (error) {
      console.log(error)
      // notification.error({
      //   message: "Error",
      //   description: "Something went wrong",
      //   duration: 1,
      // });
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
        }}
      >
        <Row gutter={16}>
          {currentItems.map((data) => (
            <Col span={8} key={data._id}>
              <Card
                className="doctor-card"
                actions={[
                  <EditOutlined
                    key="edit"
                    title="Edit doctor"
                    style={{ color: "blue" }}
                    onClick={() => {
                      handleClick(data._id);
                    }}
                  />,
                  <PlusOutlined
                    style={{ color: "green" }}
                    title="New appointment"
                    onClick={() => {
                      setIsModalOpen(true);
                      setSelectedDoctor(data._id);
                      setDoctorName(data.name);
                    }}
                  />,
                  <DeleteFilled
                    key="delete"
                    title="Delete doctor"
                    style={{ color: "red" }}
                    onClick={() => {
                      handleDelete(data._id);
                    }}
                  />,
                ]}
              >
                <div className="avatar">
                  <img src={data.avatar.url} alt="qwe" />
                </div>
                <div className="name">{data.name}</div>
                <div className="age">{data.email}</div>
                {/* <div className='staff'>{data.staff}</div>
            <div className='address'>{data.address}</div> */}
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
        <NewAppointmentModal />
      </NewContext.Provider>
    </>
  );
};

export default DoctorCard;
