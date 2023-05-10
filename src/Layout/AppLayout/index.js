import { Layout } from "antd";
import Header from "Layout/Header";
import Sidebar from "Layout/Sidebar";
import { Outlet } from "react-router-dom";
import UserLayout from "Layout/UserLayout";
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
    <>
      {/* {auth?.role === "manager" || auth?.role === "doctor" ? (
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
      ) : ( */}
      <UserLayout />
      {/* )} */}
    </>
  );
};

export default AppLayout;
