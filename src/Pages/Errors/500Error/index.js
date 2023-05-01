import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
const Error500 = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={
        <Button type="primary" onClick={goBack}>
          Back Home
        </Button>
      }
    />
  );
};
export default Error500;
