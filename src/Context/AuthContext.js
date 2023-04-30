import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  // const [isLogined, setIsLogined] = useState(
  //   localStorage.getItem("isLogined") || false
  // );

  const [auth, setAuth] = useState({});
  const [persist, setPersist] = useState(true);
  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
