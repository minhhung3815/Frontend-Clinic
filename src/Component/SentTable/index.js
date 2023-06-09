import { Space, Table, Tag, notification } from "antd";
import {
  CloudDownloadOutlined,
  EyeFilled,
  EyeOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import NewContext from "Context/createContext";
import useAxiosPrivate from "Hook/useAxiosPrivate";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const SentTable = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { sentList, setSentList } = useContext(NewContext);
  const handleClick = (id) => {
    navigate(`/request/sent/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axiosPrivate.delete(`/request/delete/${id}`);
      if (response.data.success) {
        setSentList(sentList.filter((user) => user._id !== id));
        notification.success({
          message: "Success",
          description: response?.data?.data,
          duration: 1,
        });
      }
    } catch (error) {
      console.log(error);
      console.log(error)
      // notification.error({
      //   message: "Error",
      //   description: "Something went wrong",
      //   duration: 1,
      // });
    }
  };
  const columns = [
    {
      title: "To",
      render: (_, { receiver_id }) => {
        return <span>{receiver_id.email}</span>;
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Explanation",
      dataIndex: "explanation",
      render: (value) => (
        <span>{value.length > 20 ? value.slice(0, 20) + "..." : value}</span>
      ),
    },
    {
      title: "Accept",
      dataIndex: "accepted",
      render: (value) => {
        let color = "red";
        value === "pending"
          ? (color = "blue")
          : value === "accept"
          ? (color = "green")
          : (color = " red");
        return <Tag color={color}>{value.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Action",
      render: (_, record) => (
        <Space size="middle">
          <EyeOutlined
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

  return <Table columns={columns} dataSource={sentList} rowKey="_id" />;
};

export default SentTable;
