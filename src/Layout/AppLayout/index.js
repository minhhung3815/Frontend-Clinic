import { Layout } from "antd";
import Header from "Layout/Header";
import Sidebar from "Layout/Sidebar";
import { Outlet } from "react-router-dom";
import useAuth from "Hook/useAuth";

const contentStyle = {
  textAlign: "center",
  height: "auto",
  // lineHeight: "120px",
  color: "#fff",
  overflow: "initial",
  padding: 16,
};

const AppLayout = () => {
  const { auth } = useAuth();
  return (
    <Layout>
      <Header />
      <Layout hasSider>
        {auth?.role === "manager" || auth?.role === "doctor" ? (
          <Sidebar />
        ) : null}
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
