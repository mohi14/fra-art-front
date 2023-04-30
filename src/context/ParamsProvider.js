import React, { createContext, useState } from "react";

export const ParamsContext = createContext();

const ParamsProvider = ({ children }) => {
  const [userId, setUserId] = useState("");

  if (userId.length > 0) {
    localStorage.setItem("params", userId);
  }

  const [active, setActive] = useState("");
  const paramsInfo = { userId, setUserId, active, setActive };
  return (
    <ParamsContext.Provider value={paramsInfo}>
      {children}
    </ParamsContext.Provider>
  );
};

export default ParamsProvider;
