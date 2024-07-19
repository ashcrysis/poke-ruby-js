import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { message, Upload, Button, Form, Avatar } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";
import axios from "axios";
import * as Yup from "yup";
import Input from "../components/Input/index.tsx";
import { Formik } from "formik";
import Header from "../components/Header/index.tsx";

import "../App.css";
import * as S from "../styles/search.styles.ts";

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

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  );
  const [imageSelected, setImageSelected] = useState(false);
  let authorizationHeader = localStorage.getItem("authorizationHeader");
  const [userId, setUserId] = useState<string>();
  const [userData, setUserData] = useState<IUserData>({
    email: "",
    name: "",
    image_url: "",
  });

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
        console.error("Error fetching user data:", error);
      });
  }, []);

  const validationSchema = Yup.object().shape({
    phone: Yup.string().required("Please input your phone!"),
    postal_code: Yup.string().required("Please input your postal code!"),
    street: Yup.string().required("Please input your street!"),
    number: Yup.string().required("Please input your house number!"),
    complement: Yup.string(),
  });

  const checkTokenExpiry = () => {
    if (!authorizationHeader) return;

    try {
      const decodedToken: any = jwtDecode(authorizationHeader);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem("authorizationHeader");
        alert("Your session has expired. Please log in again.");
        navigate("/");
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(checkTokenExpiry, 60000);
    return () => clearInterval(interval);
  }, [authorizationHeader]);

  if (!authorizationHeader) {
    alert("You are not allowed to access this page before logging in.");
    navigate("/");
    return <></>;
  }
  const handleOk = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append("user[email]", values.email);
      formData.append("user[name]", values.name);
      formData.append("user[phone]", values.phone);
      formData.append("user[postal_code]", values.postal_code);
      formData.append("user[street]", values.street);
      formData.append("user[number]", values.number);
      formData.append("user[complement]", values.complement);

      if (imageFile) {
        formData.append("user[image]", imageFile);
      }
      const newUserData = {
        email: values.email,
        name: values.name,
        phone: values.phone,
        postal_code: values.postal_code,
        street: values.street,
        number: values.number,
        complement: values.complement,
        image_url: imageFile ? imageFile.name : userData.image_url,
      };
      const isDataChanged = Object.keys(newUserData).some(
        (key) => newUserData[key] !== userData[key]
      );

      if (!isDataChanged) {
        message.info("No profile changes detected.");
        setTimeout(() => {
          navigate("/search");
        }, 1000);
        return;
      }
      setLoading(true);
      const token = localStorage.getItem("authorizationHeader");
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/v2/users/update/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserData(response.data);
    } catch (error) {
      console.error("Failed to update user data:", error);
      if (error.response) {
        message.error(
          `Error: ${
            error.response.data.message || "Failed to update user data"
          }`
        );
      } else if (error.request) {
        message.error("Error: No response from server");
      } else {
        message.error("Error: Failed to update user data");
      }
    } finally {
      setLoading(false);
    }
    setTimeout(() => {
      navigate("/search");
    }, 1000);
  };

  const handleImageChange = (file: File) => {
    setImageFile(file);
    setImageSelected(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    if (file) {
      reader.readAsDataURL(file);
    }

    return false;
  };

  const handleCancel = () => {
    setImageFile(null);
    setImagePreview(userData.image_url);
    setImageSelected(false);
  };

  return (
    <S.Container>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "100px",
        }}
      >
        <S.Greyed style={{ height: "340px", color: "white" }}>
          <h2>{userData.name}</h2>
          <h4>Profile Image</h4>
          <Form.Item>
            <Upload
              listType="picture-card"
              showUploadList={false}
              beforeUpload={handleImageChange}
            >
              <Avatar
                size={100}
                src={imagePreview || userData.image_url}
                icon={<UserOutlined />}
                alt="Profile Image"
              />
            </Upload>
          </Form.Item>
        </S.Greyed>
        <S.Greyed>
          <Formik
            enableReinitialize
            initialValues={{
              email: userData.email,
              name: userData.name,
              phone: userData.phone || "",
              postal_code: userData.postal_code || "",
              street: userData.street || "",
              number: userData.number || "",
              complement: userData.complement || "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleOk}
          >
            {({ handleSubmit }) => (
              <Form id="editUserForm" onFinish={handleSubmit}>
                <Input
                  label="Email"
                  name="email"
                  disable={true}
                  style={{ color: "white" }}
                />
                <Input
                  label="Name"
                  name="name"
                  disable={true}
                  style={{ color: "white" }}
                />
                <Input label="Phone" name="phone" style={{ color: "white" }} />
                <Input
                  label="Postal Code"
                  name="postal_code"
                  style={{ color: "white" }}
                />
                <Input
                  label="Street"
                  name="street"
                  style={{ color: "white" }}
                />
                <Input
                  label="Number"
                  name="number"
                  style={{ color: "white" }}
                />
                <Input
                  label="Complement"
                  name="complement"
                  style={{ color: "white" }}
                />
                <div style={{ textAlign: "right" }}>
                  <Button
                    key="back"
                    onClick={handleCancel}
                    style={{ marginRight: 8 }}
                    danger
                  >
                    Cancel
                  </Button>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Save
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </S.Greyed>
      </div>
    </S.Container>
  );
};

export default Profile;
