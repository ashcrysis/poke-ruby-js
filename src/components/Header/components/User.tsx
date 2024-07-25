import React, { useEffect, useState } from "react";
import { Dropdown, Menu, Tooltip, Button } from "antd";
import { useNavigate } from "react-router-dom";

import * as S from "../styles.ts";
//@ts-ignore
import userIcon from "../../../assets/user-icon.png";
import axios from "axios";
import EditUserModal from "./EditUserModal.tsx";
import { message } from "antd";
interface IUserData {
  email: string;
  name: string;
  phone?: string;
  postal_code?: string;
  street?: string;
  number?: string;
  complement?: string;
  password?: string;
  image_url: string;
}

const UserComponent = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<IUserData>({
    email: "",
    name: "",
    image_url: "",
  });
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
        setUserData({
          ...data.data.attributes,
          image_url: data.image,
        });
        setUserId(data.data.id);
      })
      .catch((error) => {
        message.error("Error fetching user data:", error);
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
        message.info("You have logged out.");
        window.location.href = "/";
      })
      .catch((error) => {
        message.error("Error logging out:", error);
      });
  };

  const handleToggleApi = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/v2/pokemons/toggle_api`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "authorizationHeader"
            )}`,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      message.error("Error toggling API:", error);
    }
  };
  const profile = () => {
    navigate("/profile");
  };
  const menu = (
    <Menu>
      <Menu.Item key="meus-dados">
        <Tooltip title="Edit your profile" placement="left">
          <span
            onClick={() => {
              profile();
            }}
          >
            Edit Profile
          </span>
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
          {userData?.image_url ? (
            <img
              src={userData.image_url}
              alt="User Icon"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          ) : (
            <img src={userIcon} alt="User Icon" />
          )}
          <span>Hello, {userData?.name.split(" ")[0]}!</span>
        </S.UserContent>
      </Dropdown>
    </S.UserContainer>
  );
};

export default UserComponent;
