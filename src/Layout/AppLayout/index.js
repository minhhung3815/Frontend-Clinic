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
      <UserLayout style={{ backgroundColor: 'white',}}/>
    </>
  );
};

export default AppLayout;
