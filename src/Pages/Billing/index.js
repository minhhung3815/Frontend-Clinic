import useAxiosPrivate from "Hook/useAxiosPrivate";
import Loading from "Layout/Loading";
import { Descriptions, Tag } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Billing = () => {
  const [total, setTotal] = useState(0);
  const { appointmentId } = useParams();
  const [appointmentData, setAppointmentData] = useState("");
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getAppointment = async () => {
      try {
        const response = await axiosPrivate.get(
          `/appointment/specific/${appointmentId}`,
          {
            signal: controller.signal,
          }
        );
        const appointmentData = response?.data?.data;
        console.log(appointmentData);

        const totalService = appointmentData?.service?.reduce(
          (acc, curr) => acc + curr.price,
          0
        );
        const medication_price =
          Number(appointmentData?.prescription_id?.price) || 0;
        const total_appointment_price = Number(totalService) + medication_price;
        setTotal(total_appointment_price);
        isMounted && setAppointmentData(response?.data?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getAppointment();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <>
      {loading ? (
        <Loading size="large" />
      ) : (
        <>
          <Descriptions
            title="Billing"
            layout="vertical"
            style={{ maxWidth: 600, margin: "0 auto" }}
            bordered
          >
            <Descriptions.Item label="APT-ID" style={{ textAlign: "center" }}>
              {appointmentData?.appointmentId}
            </Descriptions.Item>
            <Descriptions.Item
              label="Status"
              style={{ textAlign: "center" }}
              span={2}
            >
              <Tag color="green">
                {appointmentData?.payment_id?.status.toUpperCase()}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Patient Name" span={2}>
              {appointmentData?.patient_name}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {appointmentData?.user_id?.email}
            </Descriptions.Item>
            <Descriptions.Item label="Services" span={2}>
              {appointmentData?.service?.map((service) => (
                <div key={service?.type}>
                  {service.type} - ${service.price} <br />
                </div>
              ))}
            </Descriptions.Item>
            <Descriptions.Item label="Service Total">
              <Tag color="green">
                $
                {appointmentData?.service?.reduce(
                  (acc, curr) => acc + curr?.price,
                  0
                )}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Medications" span={2}>
              {appointmentData?.prescription_id?.medications?.map((service) => (
                <div key={service?.name}>
                  {service?.name} <br />
                </div>
              ))}
            </Descriptions.Item>
            <Descriptions.Item label="Medications Total">
              <Tag color="green">
                ${appointmentData?.prescription_id?.price.toFixed(2)}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Total" span={3}>
              <Tag color="green" style={{ fontSize: "15px" }}>
                ${total}
              </Tag>
            </Descriptions.Item>
          </Descriptions>
          {/* <br />
          <Button
            type="primary"
            style={{ background: "#1e8ed8", width: "100%", maxWidth: 600 }}
            htmlType="submit"
            onClick={handleClick}
          >
            {" "}
            PURCHASE
          </Button> */}
        </>
      )}
    </>
  );
};

export default Billing;
