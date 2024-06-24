import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import "../App.css";
import { login } from "../services/login.ts";

interface IFormData {
  email: string;
  password: string;
  username?: string;
}

const Login = () => {
  const [formData, setFormData] = useState<IFormData>({
    email: "",
    password: "",
    username: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleLogin = async () => {
    const { email, password } = formData;
    if (formData.email !== "" && formData.password !== "") {
      const output = await login(email, password);
      if (output) {
        navigate("/search");
      }
    } else {
      alert("You must fill all fields before logging in!");
    }
  };

  const onFinish = (values: IFormData) => {
    handleLogin();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="pokedex-container">
      <div className="pokedex-content">
        <h2 className="pokedex-title">Login</h2>
        <Form
          name="login"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              id="email"
              onChange={handleInputChange}
              style={{
                width: "24vh",
              }}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              id="password"
              onChange={handleInputChange}
              style={{
                width: "24vh",
              }}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}></Form.Item>
        </Form>
        {formData.username && (
          <p className="pokedex-greeting">Hello, {formData.username}</p>
        )}
        <Button type="primary" htmlType="submit" className="pokedex-button">
          Login
        </Button>
        <Button
          onClick={() => navigate("/register")}
          className="pokedex-button"
        >
          Don't have an account? Register
        </Button>
      </div>
    </div>
  );
};

export default Login;
