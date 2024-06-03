import React from "react";
import userIcon from "../user-icon.png";

const UserComponent = ({ userEmail }) => {
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
        <span className="user-email">{"userEmail@gmail.com"}</span>
      </div>
      <button className="logout-button" onClick={onLogout}>
        Log Off
      </button>
    </div>
  );
};

export default UserComponent;
