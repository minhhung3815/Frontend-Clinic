import { Space, Table, Tag, notification } from "antd";
import {
  CloudDownloadOutlined,
  EyeFilled,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import NewContext from "Context/createContext";
import useAxiosPrivate from "Hook/useAxiosPrivate";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const ServiceTable = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { serviceList, setServiceList } = useContext(NewContext);

  const handleClick = (id) => {
    navigate(`/admin/service/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axiosPrivate.delete(`/services/delete/${id}`);
      if (response.data.success) {
        setServiceList(serviceList.filter((user) => user._id !== id));
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
      title: "Service",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (value) => (
        <span>{value.length > 20 ? value.slice(0, 50) + "..." : value}</span>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (value) => <Tag color="green">${value}</Tag>,
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
            style={{ color: "green", fontSize: "15px" }}
          />
          <DeleteOutlined
            type="link"
            onClick={() => {
              handleDelete(record._id);
            }}
            style={{ color: "red", fontSize: "15px" }}
          />
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={serviceList} rowKey="_id" />;
};

export default ServiceTable;
