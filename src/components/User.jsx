import React, { useEffect, useState } from "react";
import userIcon from "../user-icon.png";

const UserComponent = () => {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authorizationHeader");

    fetch(`${process.env.REACT_APP_API_URL}/v2/users/current`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserEmail(data.email);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const onLogout = () => {
    const token = localStorage.getItem("authorizationHeader");

    fetch(`${process.env.REACT_APP_API_URL}/logout`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        alert("You have logged out.");
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  return (
    <div className="user-component">
      <div className="user-info">
        <img src={userIcon} alt="User Icon" className="user-icon" />
        <span className="user-email">{userEmail}</span>
      </div>
      <button className="logout-button" onClick={onLogout}>
        Log Off
      </button>
    </div>
  );
};

export default UserComponent;
