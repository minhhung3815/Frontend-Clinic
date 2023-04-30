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

const MedicineTable = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { medicineList, setMedicineList } = useContext(NewContext);

  const handleClick = (id) => {
    navigate(`/medicines/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axiosPrivate.delete(`/medicine/delete/${id}`);
      if (response.data.success) {
        setMedicineList(medicineList.filter((user) => user._id !== id));
        notification.success({
          message: "Delete notification",
          description: response.data.data,
          duration: 2,
        });
      }
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Delete notification",
        description: "Something went wrong",
        duration: 2,
      });
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Manufacturer",
      dataIndex: "manufacturer",
      key: "manufacturer",
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

  return <Table columns={columns} dataSource={medicineList} rowKey="_id" />;
};

export default MedicineTable;
