import React from "react";
import { Descriptions, Badge, Button } from "antd";
import { useEffect, useState } from "react";
import useAxiosPrivate from "Hook/useAxiosPrivate";
import {
  useNavigate,
  useParams,
  useSearchParams,
  Redirect,
  Navigate,
} from "react-router-dom";
import { redirect } from "react-router-dom";
import Loading from "Layout/Loading";

const UserPay = () => {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const { appointmentId } = useParams();
  const abc = useParams();
  console.log(appointmentId, abc);
  const [appointmentData, setAppointmentData] = useState("");
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();

  const handleClick = async () => {
    try {
      const response = await axiosPrivate.post(`/payment/new`, {
        appointmentId,
        amount: total,
      });
      if (response?.data?.success) {
        // console.log(response?.data?.data);
        // redirect(response?.data?.data);
        return window.location.replace(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        if (appointmentData?.status === "finished") {
          return navigate("/notfound404");
        }
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
        // navigate("/login", { state: { from: location }, replace: true });
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
              label="Billing Mode"
              style={{ textAlign: "center" }}
              span={2}
            >
              Fee-for-Service
            </Descriptions.Item>
            <Descriptions.Item label="Patient Name">
              {appointmentData?.patient_name}
            </Descriptions.Item>
            <Descriptions.Item label="Phone Number" span={2}>
              {appointmentData?.user_id?.phone_number}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {appointmentData?.user_id?.email}
            </Descriptions.Item>
            <Descriptions.Item label="Gender" span={2}>
              {appointmentData?.user_id?.gender}
            </Descriptions.Item>
            <Descriptions.Item label="Services" span={2}>
              {appointmentData?.service?.map((service) => (
                <>
                  {service.type} - ${service.price} <br />
                </>
              ))}
            </Descriptions.Item>
            <Descriptions.Item label="Medications">
              {appointmentData?.prescription_id?.medications?.map((service) => (
                <>
                  {service.name} <br />
                </>
              ))}
            </Descriptions.Item>
            <Descriptions.Item label="Total" span={3}>
              ${total}
            </Descriptions.Item>
          </Descriptions>
          <br />
          <Button
            type="primary"
            style={{ background: "#1e8ed8", width: "100%", maxWidth: 600 }}
            htmlType="submit"
            onClick={handleClick}
          >
            {" "}
            PURCHASE
          </Button>
        </>
      )}
    </>
  );
};

export default UserPay;
