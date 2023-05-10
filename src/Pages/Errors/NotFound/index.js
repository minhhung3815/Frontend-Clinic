import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" style={{ background: "#1e8ed8" }} onClick={goBack}>
          Back Home
        </Button>
      }
    />
  );
};
export default NotFound;
