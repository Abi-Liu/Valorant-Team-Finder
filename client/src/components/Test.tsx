import React from "react";
import { useUserContext } from "../contexts/UserContext";

const Test = () => {
  const { user, loggedIn } = useUserContext();
  console.log(loggedIn);
  return (
    <div>
      <p>username: {user.ign}</p>
      <p>is logged in: {loggedIn.toString()}</p>
    </div>
  );
};

export default Test;
