import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function UserDeatils({ userId }) {
  const users = useSelector((state) => state.users.user);
  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);

  let user;

  if (status === "succeed") {
    user=users.find((f) => Number.parseInt(f.id) === Number.parseInt(userId));
  } else if (status === "error") {
    user = `${error}`;
  } else if (status === "loading") {
    user = "Loading....!";
  }

  return (
    <section className="postCredit">
      {user ? user.name : "Unknown Author"}
    </section>
  );
}

export default UserDeatils;
