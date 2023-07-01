import React, { useEffect } from "react";
import { useUserContext } from "../contexts/UserContext";

const Another = () => {
  const { setUser, setLoggedIn } = useUserContext();
  useEffect(() => {
    setUser({
      ign: "abi",
      _id: "1",
    });
    setLoggedIn(true);
  }, []);
  return <div></div>;
};

export default Another;
