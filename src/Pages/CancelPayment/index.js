import useAxiosPrivate from "Hook/useAxiosPrivate";
import { Button, Result } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
const CancelPayment = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useSearchParams();
  const token = params.get("token");
  useEffect(() => {
    const controller = new AbortController();

    const getSuccess = async () => {
      try {
        const response = await axiosPrivate.get(
          `/payment/paypal/cancel-payment?token=${token}`,
          {
            signal: controller.signal,
          }
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getSuccess();

    return () => {
      controller.abort();
    };
  });
  return (
    <Result
      status="warning"
      title="Cancel Purchased"
      //   subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
      extra={[
        <Button
          key="buy"
          onClick={() => {
            navigate("/home");
          }}
        >
          Home
        </Button>,
      ]}
    />
  );
};
export default CancelPayment;
