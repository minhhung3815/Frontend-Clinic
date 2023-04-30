import { Space, Table, Tag, notification } from "antd";
import {
  CloudDownloadOutlined,
  EyeFilled,
  DeleteFilled,
} from "@ant-design/icons";
import NewContext from "Context/createContext";
import useAxiosPrivate from "Hook/useAxiosPrivate";
import { useContext } from "react";
const Prescription = () => {
  const axiosPrivate = useAxiosPrivate();
  const { prescriptionList, setPrescriptionList } = useContext(NewContext);
  const handleDelete = async (id) => {
    try {
      const response = await axiosPrivate.delete(`/prescription/delete/${id}`);
      if (response.data.success === true) {
        setPrescriptionList(prescriptionList.filter((user) => user._id !== id));
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
  const columns = [
    {
      title: "Patient",
      dataIndex: "patient_name",
      key: "patient_name",
    },
    {
      title: "Doctor",
      dataIndex: "doctor_name",
      key: "doctor_name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (value) => <Tag color="green">${value}</Tag>,
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (data) => {
        const date = new Date(data);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
      },
    },
    {
      title: "Diseases",
      dataIndex: "diagnose",
      key: "diagnose",
      render: (diagnose) => (
        <>
          <Tag color="orange">{diagnose.toUpperCase()}</Tag>
        </>
      ),
    },
    {
      title: "Action",
      render: (_, record) => (
        <Space size="middle">
          <CloudDownloadOutlined />
          <DeleteFilled
            type="link"
            style={{ color: "red", fontSize: "20px" }}
            onClick={() => {
              handleDelete(record._id);
            }}
          />
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={prescriptionList} rowKey="_id" />;
};

export default Prescription;
