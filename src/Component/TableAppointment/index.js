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
  const { appointmentList, setAppointmentList, doctorList } =
    useContext(NewContext);
  // console.log(appointmentList);
  const navigate = useNavigate();

  const handleAddPrescription = (appointmentId, prescriptionId) => {
    navigate("/new-prescription");
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
          message: "Success",
          description: response?.data?.data,
          duration: 1,
        });
      }
    } catch (error) {
      console.log(error)
      // notification.error({
      //   message: "Error",
      //   description: "Something went wrong",
      //   duration: 1,
      // });
    }
  };

  function handleClick(id) {
    navigate(`/edit-appointment/${id}`);
  }

  const optionDoctor = (doctorData) => {
    return {
      key: doctorData._id,
      value: doctorData.name,
      text: doctorData.name,
    };
  };

  const filtersDoctor = doctorList.map((doctorData) =>
    optionDoctor(doctorData)
  );
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
      render: (data) => <div>{data.doctor_id?.name}</div>,
      filters: filtersDoctor,
      filterSearch: true,
      onFilter: (value, record) => record.doctor_name.startsWith(value),
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
        <>
          {record?.status.toLowerCase() !== "finished" ? (
            <Tag color="red">PENDING</Tag>
          ) : (
            <EyeOutlined
              style={{ color: "blue", fontSize: "20px", position: "center" }}
            />
          )}
        </>
        // <EditOutlined
        //   onClick={() => {
        //     handleMakePayment(record._id);
        //   }}
        // />
      ),
    },
    {
      title: "Action",
      render: (_, record) => (
        <Space size="middle">
          {/* <FileTextOutlined
            type="link"
            onClick={() => {
              handleAddPrescription(record?._id, record?.prescription_id);
            }}
            style={{ color: "blue", fontSize: "15px" }}
          /> */}
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
  return <Table columns={columns} dataSource={appointmentList} rowKey="_id" />;
};

export default TableAppointment;
