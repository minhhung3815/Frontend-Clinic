import useAxiosPrivate from "Hook/useAxiosPrivate";
import { Button, Result } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
const SuccessfulPayment = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useSearchParams();
  const paymentId = params.get("paymentId");
  const PayerID = params.get("PayerID");
  useEffect(() => {
    const controller = new AbortController();

    const getSuccess = async () => {
      try {
        const response = await axiosPrivate.get(
          `/payment/paypal/execute-payment?paymentId=${paymentId}&&PayerID=${PayerID}`,
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
      status="success"
      title="Successfully Purchased"
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
export default SuccessfulPayment;
