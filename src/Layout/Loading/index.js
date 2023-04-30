import { Spin } from "antd";
const Loading = (props) => {
  const size = props.size;
  return (
    <>
      {size === "small" ? (
        <Spin tip="Loading" size="small" style={{ marginTop: "25%" }}>
          <div className="content" />
        </Spin>
      ) : size === "default" ? (
        <Spin tip="Loading" style={{ marginTop: "25%" }}>
          <div className="content" />
        </Spin>
      ) : size === "large" ? (
        <Spin tip="Loading" size="large" style={{ marginTop: "25%" }}>
          <div className="content" />
        </Spin>
      ) : null}
    </>
  );
};
export default Loading;
