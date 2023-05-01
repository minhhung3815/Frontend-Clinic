import { Space, Table, Tag, Button, notification } from "antd";
import { FormOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import NewContext from "Context/createContext";
import { useContext } from "react";
import useAxiosPrivate from "Hook/useAxiosPrivate";

const TableSchedule = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { scheduleList, setScheduleList } = useContext(NewContext);

  const handleDelete = async (id) => {
    try {
      const response = await axiosPrivate.delete(`/schedule/delete/${id}`);
      if (response.data.success === true) {
        setScheduleList(scheduleList.filter((user) => user._id !== id));
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

  const handleClick = (id) => {
    navigate(`/edit-schedule/${id}`);
  };

  const columns = [
    {
      title: "Doctor Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => <div>{record.doctor_id?.name}</div>,
    },
    {
      title: "Available Days",
      render: (record) => {
        const unique = [
          ...new Map(record.working_time.map((m) => [m.date, m])).values(),
        ];
        return (
          <>
            {unique.map((data) => {
              let color = "green";
              data.date === "monday"
                ? (color = "green")
                : data.date === "tuesday"
                ? (color = "purple")
                : data.date === "wednesday"
                ? (color = "blue")
                : data.date === "thursday"
                ? (color = "orange")
                : data.date === "friday"
                ? (color = "pink")
                : data.date === "saturday"
                ? (color = "red")
                : data.date === "sunday"
                ? (color = "cyan")
                : (color = "white");
              return (
                <Tag key={data._id} color={color}>
                  {data.date.toUpperCase()}
                </Tag>
              );
            })}
          </>
        );
      },
    },
    {
      title: "Action",
      render: (_, record) => (
        <Space size="middle">
          <FormOutlined
            type="link"
            onClick={() => {
              handleClick(record._id);
            }}
            style={{ color: "green", fontSize: "20px" }}
          />
          <CloseCircleOutlined
            type="link"
            onClick={() => {
              handleDelete(record._id);
            }}
            style={{ color: "red", fontSize: "20px" }}
          />
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={scheduleList} rowKey="_id" />;
};

export default TableSchedule;
