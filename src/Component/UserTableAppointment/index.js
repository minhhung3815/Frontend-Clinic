import { Space, Table, Tag, notification } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  DownloadOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import useAxiosPrivate from "Hook/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import NewContext from "Context/createContext";
import { useContext, useState } from "react";
import UserEditAppointmentModal from "Component/UserEditAppointmentModal";
import useAuth from "Hook/useAuth";

const UserTableAppointment = () => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const { appointmentList, setAppointmentList } = useContext(NewContext);
  const navigate = useNavigate();
  const [appointmentData, setAppointmentData] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (data) => {
    try {
      if (data?.status === "cancelled") {
        return notification.warning({
          message: "Warning",
          description: "Appointment has already cancelled",
        });
      } else if (data?.status === "finished" || data?.status === "examined") {
        return notification.warning({
          message: "Warning",
          description: "Appointment has ended",
        });
      }
      const appointmentDate = new Date(data?.appointment_date);
      const currentDate = new Date();

      const timeDiff = appointmentDate.getTime() - currentDate.getTime();
      const hoursDiff = timeDiff / (1000 * 60 * 60);
      if (hoursDiff < 24) {
        return notification.warning({
          message: "Warning",
          description: "Cannot cancel appointment before a day",
        });
      }
      const response = await axiosPrivate.put(
        `/appointment/cancel/${data._id}`
      );
      if (response.data.success === true) {
        setAppointmentList((prevItems) =>
          prevItems.map((item) =>
            item._id === data?._id ? { ...item, status: "cancelled" } : item
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

  function handleClick(data) {
    if (data?.status === "cancelled") {
      return notification.warning({
        message: "Warning",
        description: "Appointment has already cancelled",
      });
    } else if (data?.status === "finished" || data?.status === "examined") {
      return notification.warning({
        message: "Warning",
        description: "Appointment has ended",
      });
    }
    const appointmentDate = new Date(data?.appointment_date);
    const currentDate = new Date();

    const timeDiff = appointmentDate.getTime() - currentDate.getTime();
    const hoursDiff = timeDiff / (1000 * 60 * 60);
    if (hoursDiff < 24) {
      return notification.warning({
        message: "Warning",
        description: "Cannot change appointment before a day",
      });
    }
    setIsModalOpen(true);
    setAppointmentData({ ...data });
    setCurrentUser({ email: auth?.email, username: auth?.username });
  }

  const handleDownload = async (data) => {
    try {
      // console.log(data);
      if (!data?.prescription_id) {
        return notification.warning({
          message: "Warning",
          description: "Appointment has no prescription",
        });
      }
      const response = await axiosPrivate.get(
        `/prescription/download/${data?._id}`,
        { responseType: "blob" }
      );
      const file = new Blob([response.data], { type: "application/pdf" });

      const fileURL = URL.createObjectURL(file);

      const link = document.createElement("a");
      link.href = fileURL;
      link.target = "_blank";
      link.download = "prescription.pdf";

      link.click();
    } catch (error) {
      console.log(error);
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
      title: "Doctor Name",
      key: "doctor_name",
      render: (data) => <div>{data.doctor_name}</div>,
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
        const sTime = new Date(startTime);
        const eTime = new Date(endTime);
        const start = sTime.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
        const end = eTime.toLocaleTimeString([], {
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
          : status === "cancelled"
          ? (color = "volcano")
          : (color = "purple");
        return (
          <>
            <Tag color={color}>{status.toUpperCase()}</Tag>
          </>
        );
      },
    },
    {
      title: "Payment",
      render: (_, record) => (
        <div>
          {record?.status.toLowerCase() !== "finished" ? (
            <Tag color="red">PENDING</Tag>
          ) : (
            <EyeOutlined
              style={{ color: "blue", fontSize: "20" }}
              onClick={() => {
                navigate(`/billing/${record?._id}`);
              }}
            />
          )}
        </div>
      ),
    },
    {
      title: "Action",
      render: (_, record) => (
        <Space size="middle">
          <DownloadOutlined
            type="link"
            title="Download Prescription"
            onClick={() => {
              handleDownload(record);
              // handleAddPrescription(record?._id, record?.prescription_id);
            }}
            style={{ color: "blue", fontSize: "15px" }}
          />
          <EditOutlined
            type="link"
            title="Modify Appointment"
            onClick={() => {
              handleClick(record);
            }}
            style={{ color: "green", fontSize: "15px" }}
          />
          <CloseCircleOutlined
            type="link"
            title="Cancel Appointment"
            onClick={() => {
              handleDelete(record);
            }}
            style={{ color: "red", fontSize: "15px" }}
          />
        </Space>
      ),
    },
  ];
  return (
    <NewContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
        appointmentData,
        setAppointmentData,
        currentUser,
      }}
    >
      <Table columns={columns} dataSource={appointmentList} rowKey="_id" />
      ;
      <UserEditAppointmentModal />
    </NewContext.Provider>
  );
};

export default UserTableAppointment;
