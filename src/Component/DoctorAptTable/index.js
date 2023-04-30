import { Space, Table, Tag, Button, notification } from "antd";
import {
  MoreOutlined,
  UserAddOutlined,
  EditOutlined,
  DeleteOutlined,
  FileTextOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import useAxiosPrivate from "Hook/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import NewContext from "Context/createContext";
import { useContext } from "react";

const TableAppointment = () => {
  const axiosPrivate = useAxiosPrivate();
  const { appointmentList, setAppointmentList } = useContext(NewContext);
  const navigate = useNavigate();

  const handleAddPrescription = (id) => {
    navigate({ pathname: "/new-prescription", search: `?id=${id}` });
  };

  const handleMakePayment = async (id) => {
    try {
      await axiosPrivate.post("/payment/new", { appointmentId: id });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axiosPrivate.delete(`/appointment/delete/${id}`);
      if (response.data.success === true) {
        setAppointmentList(appointmentList.filter((user) => user._id !== id));
        notification.success({
          message: "Delete notification",
          description: response.data.data,
        });
      }
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Delete notification",
        description: "Something went wrong",
      });
    }
  };

  function handleClick(id) {
    navigate(`/edit-appointment/${id}`);
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "appointmentId",
      key: "appointmentId",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Patient Name",
      dataIndex: "patient_name",
      key: "patient_name",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Appointment Date",
      key: "date",
      render: ({ appointment_date }) => {
        const apmDate = new Date(appointment_date.date);
        const day = apmDate.getDate().toString().padStart(2, "0");
        const month = (apmDate.getMonth() + 1).toString().padStart(2, "0");
        const year = apmDate.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
      },
    },
    {
      title: "Appointment Time",
      key: "time",
      render: ({ appointment_date }) => {
        const startTime = new Date(appointment_date.startTime);
        const endTime = new Date(appointment_date.endTime);
        const start = startTime.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
        const end = endTime.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
        return `${start} - ${end}`;
      },
    },
    {
      title: "Status",
      key: "status",
      render: (_, { status }) => {
        let color = "green";
        status === "waiting"
          ? (color = "blue")
          : status === "finished"
          ? (color = "green")
          : (color = "volcano");
        return (
          <>
            <Tag color={color}>{status.toUpperCase()}</Tag>
          </>
        );
      },
    },
    {
      title: "Action",
      render: (_, record) => (
        <Space size="middle">
          <FileTextOutlined
            type="link"
            onClick={() => {
              handleAddPrescription(record._id);
            }}
            style={{ color: "blue", fontSize: "15px" }}
          />
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
  return <Table columns={columns} dataSource={appointmentList} rowKey="_id" />;
};

export default TableAppointment;
