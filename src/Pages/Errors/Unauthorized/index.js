import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
const Unauthorized = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button
          type="primary" style={{ background: "#1e8ed8" }}
          onClick={() => {
            goBack();
          }}
        >
          Back Home
        </Button>
      }
    />
  );
};

export default Unauthorized;
