import { Space, Table, Tag, Button, notification } from "antd";
import {
  MoreOutlined,
  UserAddOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import NewContext from "Context/createContext";
import "./style.scss";
import useAxiosPrivate from "Hook/useAxiosPrivate";
import useAuth from "Hook/useAuth";
const TableManager = () => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { managerList, setManagerList } = useContext(NewContext);

  const handleAdd = () => {
    navigate({ pathname: "/admin/new-user", search: "?role=manager" });
  };

  function handleClick(selectedId) {
    navigate({
      pathname: `/admin/edit/account/${selectedId}`,
      search: "?role=manager",
    });
  }

  const handleDelete = async (id) => {
    try {
      const response = await axiosPrivate.delete(`/user/remove/account/${id}`);
      if (response.data.success === true) {
        setManagerList(managerList.filter((user) => user._id !== id));
        notification.success({
          message: "Success",
          description: response?.data?.data,
          duration: 1,
        });
      }
    } catch (error) {
      console.log(error);
      // notification.error({
      //   message: "Error",
      //   description: "Something went wrong",
      //   duration: 1,
      // });
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Birth",
      dataIndex: "date_of_birth",
      render: (date_of_birth) => {
        const date = new Date(date_of_birth);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
      },
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (_, record) => {
        return <Tag color="cyan">{record.role.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Phone",
      dataIndex: "phone_number",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Action",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
            type="link"
            onClick={() => {
              handleClick(record._id);
            }}
            style={{ color: "green", fontSize: "20px" }}
          />
          {auth.id !== record?._id ? (
            <DeleteOutlined
              type="link"
              style={{ color: "red", fontSize: "20px" }}
              onClick={() => {
                handleDelete(record._id);
              }}
            />
          ) : null}
        </Space>
      ),
    },
  ];
  const onChange = (pagination, sorter, extra) => {
    // console.log("params", pagination, sorter, extra);
  };
  return (
    <>
      <div className="nav">
        <div>
          <p style={{ fontSize: "25px" }}>Managers</p>
        </div>
        <div>
          <UserAddOutlined
            type="primary"
            style={{ background: "#1e8ed8", fontSize: "16px" }}
            onClick={handleAdd}
          />
        </div>
      </div>
      <Table
        columns={columns}
        rowKey="_id"
        dataSource={managerList}
        onChange={onChange}
      />
    </>
  );
};

export default TableManager;
