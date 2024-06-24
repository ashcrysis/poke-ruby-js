import React, { useEffect, useState } from "react";
import { Dropdown, Menu } from "antd"; // Importando Dropdown e Menu do Ant Design
//@ts-ignore
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
    localStorage.setItem("authorizationHeader", "");

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

  const menu = (
    <Menu>
      <Menu.Item
        key="logout"
        onClick={onLogout}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Log Off
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="user-component">
      <Dropdown overlay={menu} trigger={["hover"]} placement="bottomCenter">
        <div className="user-info">
          <img src={userIcon} alt="User Icon" className="user-icon" />
          <span className="user-email">{userEmail}</span>
        </div>
      </Dropdown>
    </div>
  );
};

export default UserComponent;
