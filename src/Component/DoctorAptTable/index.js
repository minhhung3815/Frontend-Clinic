import {
  CheckOutlined,
  EditOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import ViewAppointment from "Component/ViewAppointmentModal";
import NewContext from "Context/createContext";
import useAxiosPrivate from "Hook/useAxiosPrivate";
import { Select, Space, Table, Tag, message, notification } from "antd";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const TableAppointment = () => {
  const axiosPrivate = useAxiosPrivate();
  const [status, setStatus] = useState("");
  const { appointmentList, setAppointmentList } = useContext(NewContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointmentData, setAppointmentData] = useState("");
  const [view, setView] = useState(false);

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
      if (record?.status === "cancelled") {
        return notification.warning({
          message: "Warning",
          description: "Appointment has already cancelled",
        });
      }
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
          hour12: false,
        });
        const end = e.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
          hour12: false,
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
          <EditOutlined
            type="link"
            title="Edit prescription"
            onClick={() => {
              setIsModalOpen(true);
              setAppointmentData(record);
            }}
            style={{ color: "blue", fontSize: "15px" }}
          />
        </Space>
      ),
    },
  ];

  // useEffect(() => {}, [appointmentList]);

  return (
    <NewContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
        appointmentData,
        setView,
      }}
    >
      <Table columns={columns} dataSource={appointmentList} rowKey="_id" />;
      <ViewAppointment />
    </NewContext.Provider>
  );
};

export default TableAppointment;
