import { Space, Table, Tag, Button, notification } from "antd";
import {
  MoreOutlined,
  UserAddOutlined,
  EditOutlined,
  DeleteOutlined,
  FileTextOutlined,
  EyeOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import useAxiosPrivate from "Hook/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import NewContext from "Context/createContext";
import { useContext, useEffect } from "react";

const TableAppointment = () => {
  const axiosPrivate = useAxiosPrivate();
  const { appointmentList, setAppointmentList } = useContext(NewContext);
  const navigate = useNavigate();

  const handleAddPrescription = (appointmentId, prescriptionId = "") => {
    if (!prescriptionId) {
      navigate(`/new-prescription?appointmentId=${appointmentId}`);
    } else {
      notification.warning({
        message: "Warning",
        description: "Appointment already has prescription.",
      });
    }
  };

  const handleUpdate = (appointmentId, prescriptionId = "") => {
    if (prescriptionId) {
      navigate(
        `/edit-prescription?appointmentId=${appointmentId}&prescriptionId=${prescriptionId}`
      );
    } else {
      notification.warning({
        message: "Warning",
        description:
          "Appointment has no prescription. Please create a new one before edit",
      });
    }
  };

  const handleClick = async (id, record) => {
    try {
      const response = await axiosPrivate.put(
        `/appointment/update/status/${id}`,
        {
          ...record,
          status: "examined",
        }
      );
      if (response?.data?.success) {
        setAppointmentList((prevItems) =>
          prevItems.map((item) =>
            item._id === id ? { ...item, status: "examined" } : item
          )
        );
        notification.success({
          message: "Success",
          description: response?.data?.data,
        });
      } else {
        notification.error({
          message: "Error",
          description: "Something went wrong",
        });
      }
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Error",
        description: "Something went wrong",
      });
    }
  };

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
        const apmDate = new Date(appointment_date);
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
      render: ({ startTime, endTime }) => {
        const s = new Date(startTime);
        const e = new Date(endTime);
        const start = s.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
        const end = e.toLocaleTimeString([], {
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
          : (color = "purple");
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
            title="New prescription"
            onClick={() => {
              handleAddPrescription(record?._id, record?.prescription_id);
            }}
            style={{ color: "red", fontSize: "15px" }}
          />

          <EditOutlined
            type="link"
            title="Edit prescription"
            onClick={() => {
              handleUpdate(record?._id, record?.prescription_id);
            }}
            style={{ color: "blue", fontSize: "15px" }}
          />

          <CheckOutlined
            type="link"
            title="Update status"
            onClick={() => {
              handleClick(record?._id, record);
            }}
            style={{ color: "green", fontSize: "15px" }}
          />
        </Space>
      ),
    },
  ];

  // useEffect(() => {}, [appointmentList]);
  return <Table columns={columns} dataSource={appointmentList} rowKey="_id" />;
};

export default TableAppointment;
