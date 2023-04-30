import { Layout } from "antd";
import Header from "Layout/Header";
import Sidebar from "Layout/Sidebar";
import { Outlet } from "react-router-dom";

const contentStyle = {
  textAlign: "center",
  height: "auto",
  // lineHeight: "120px",
  color: "#fff",
  overflow: "initial",
  padding: 16,
};
// const contentStyle = {
//   // textAlign: "center",
//   // height: "auto",
//   // lineHeight: "120px",
//   color: "#fff",
//   // overflow: "initial",
//   padding: 24,
//   overflow: "initial",
// };

const AppLayout = () => {
  return (
    <Layout>
      <Header />
      <Layout hasSider>
        <Sidebar />
        <Layout.Content style={contentStyle}>
          <div
            style={{
              paddingLeft: 200,
              paddingTop: 50,
              textAlign: "center",
            }}
          >
            <Outlet />
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
