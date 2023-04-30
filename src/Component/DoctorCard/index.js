import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  Col,
  Row,
  Popover,
  notification,
  Pagination,
} from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "Hook/useAxiosPrivate";
import {
  EditOutlined,
  EllipsisOutlined,
  UserAddOutlined,
  DeleteFilled,
} from "@ant-design/icons";
import "./style.scss";
import UserContext from "Context/createContext";

const PAGE_SIZE = 6;

const DoctorCard = () => {
  const { doctorList, setDoctorList } = useContext(UserContext);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * PAGE_SIZE;
  const indexOfFirstItem = indexOfLastItem - PAGE_SIZE;
  const currentItems = doctorList.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleClick = (id) => {
    navigate(`/edit/doctor/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axiosPrivate.delete(`/user/remove/doctor/${id}`);
      if (response.data.success === true) {
        setDoctorList(doctorList.filter((user) => user._id !== id));
        notification.success({
          message: "Delete notification",
          description: response.data.data,
        });
      }
    } catch (error) {
      notification.error({
        message: "Delete notification",
        description: "Something went wrong",
      });
    }
  };

  return (
    <>
      <Row gutter={16}>
        {currentItems.map((data) => (
          <Col span={8} key={data._id}>
            <Card
              className="doctor-card"
              actions={[
                <EditOutlined
                  key="edit"
                  style={{ color: "blue" }}
                  onClick={() => {
                    handleClick(data._id);
                  }}
                />,
                <DeleteFilled
                  key="delete"
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
    </>
  );
};

export default DoctorCard;
