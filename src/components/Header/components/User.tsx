import React, { useEffect, useState } from "react";
import { Dropdown, Menu, Tooltip } from "antd";
import * as S from "../styles.ts";
// @ts-ignore
import userIcon from "../../../assets/user-icon.png";

interface IUserData {
  email: string;
  nome: string;
}

const UserComponent = () => {
  const [userData, setUserData] = useState<IUserData>();

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
        setUserData(data);
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
      <Menu.Item key="meus-dados" disabled>
        <Tooltip title="Soon!" placement="left">
          My data
        </Tooltip>
      </Menu.Item>

      <Menu.Item key="favoritos" disabled>
        <Tooltip title="Soon!" placement="left">
          Favorites
        </Tooltip>
      </Menu.Item>

      <Menu.Divider />

      <Menu.Item key="logout" onClick={onLogout}>
        Log Off
      </Menu.Item>
    </Menu>
  );

  return (
    <S.UserContainer>
      <Dropdown overlay={menu} trigger={["hover"]} placement="bottom">
        <S.UserContent>
          <img src={userIcon} alt="User Icon" />

          <span>Hello, {userData?.nome.split(" ")[0]}!</span>
        </S.UserContent>
      </Dropdown>
    </S.UserContainer>
  );
};

export default UserComponent;
