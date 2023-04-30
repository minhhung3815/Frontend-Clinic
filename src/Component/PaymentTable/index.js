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

const PaymentTable = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { paymentList, setPaymentList } = useContext(NewContext);

  // const handleClick = (id) => {
  //   navigate(`/medicines/${id}`);
  // };

  const handleDelete = async (id) => {
    try {
      const response = await axiosPrivate.delete(`/payment/delete/${id}`);
      if (response.data.success) {
        setPaymentList(paymentList.filter((user) => user._id !== id));
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
      title: "Payment ID",
      dataIndex: "paymentId",
      key: "name",
    },
    {
      title: "APT-ID",
      render: (_, { appointment_id }) => {
        return appointment_id.appointmentId;
      },
    },
    {
      title: "Patient Name",
      render: (_, { appointment_id }) => {
        return appointment_id.patient_name;
      },
    },
    {
      title: "Patient Email",
      render: (_, { user_id }) => {
        return user_id.email;
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (value) => <Tag color="green">${value}</Tag>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value) => (
        <Tag color={value === "completed" ? "green" : "red"}>
          {value.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (value) => {
        const apmDate = new Date(value);
        const day = apmDate.getDate().toString().padStart(2, "0");
        const month = (apmDate.getMonth() + 1).toString().padStart(2, "0");
        const year = apmDate.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
      },
    },
    {
      title: "Action",
      render: (_, record) => (
        <Space size="middle">
          {/* <EditOutlined
            type="link"
            onClick={() => {
              handleClick(record._id);
            }}
            style={{ color: "green", fontSize: "15px" }}
          /> */}
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

  return <Table columns={columns} dataSource={paymentList} rowKey="_id" />;
};

export default PaymentTable;
