import React, { useEffect, useState } from "react";
import { Dropdown, Menu, Tooltip, Button } from "antd";
import * as S from "../styles.ts";
// @ts-ignore
import userIcon from "../../../assets/user-icon.png";
import axios from "axios";
import EditUserModal from "./EditUserModal.tsx";

interface IUserData {
  email: string;
  name: string;
  phone?: string;
  postal_code?: string;
  street?: string;
  number?: string;
  complement?: string;
  password?: string;
  image_blob?: {
    url: string;
    content_type: string;
    filename: string;
    byte_size: number;
  };
}

const UserComponent = () => {
  let authorizationHeader = localStorage.getItem("authorizationHeader");
  const [userData, setUserData] = useState<IUserData>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userId, setUserId] = useState<string>();

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
        setUserData(data.data.attributes);
        setUserId(data.data.id);
        console.log(data.data);
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

  const handleToggleApi = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/v2/pokemons/toggle_api`,
        {
          headers: {
            Authorization: `Bearer ${authorizationHeader}`,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("Error toggling API:", error);
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="meus-dados" onClick={() => setIsModalVisible(true)}>
        <Tooltip title="Edit your data" placement="left">
          My data
        </Tooltip>
      </Menu.Item>
      <Menu.Item key="favoritos" disabled>
        <Tooltip title="Soon!" placement="left">
          Favorites
        </Tooltip>
      </Menu.Item>
      <Menu.Item key="toggle_api" onClick={handleToggleApi}>
        <Tooltip
          title="Hot swap between local Pokemon repository and Pokeapi data"
          placement="left"
        >
          Toggle api
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
          {userData?.image_blob ? (
            <img
              src={userData.image_blob.url}
              alt="User Icon"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          ) : (
            <img src={userIcon} alt="User Icon" />
          )}
          <span>Hello, {userData?.name.split(" ")[0]}!</span>
        </S.UserContent>
      </Dropdown>
      <EditUserModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        userData={userData}
        userId={userId}
        setUserData={setUserData}
      />
    </S.UserContainer>
  );
};

export default UserComponent;
