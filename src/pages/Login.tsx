import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Alert } from "antd";
import "../App.css";
import { login } from "../services/login.ts";

interface IFormData {
  email: string;
  password: string;
  username?: string;
}

const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (values: IFormData) => {
    const output = await login(values.email, values.password);
    if (output) {
      navigate("/search");
    } else {
      setError("Login failed! Please verify your credentials and try again.");
    }
  };

  const onFinish = (values: IFormData) => {
    handleLogin(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    setError("You must fill all fields before logging in!");
  };
  const handleClose = () => {
    setError(null);
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
              style={{
                width: "24vh",
              }}
            />
          </Form.Item>
          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              closable
              onClose={handleClose}
            />
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

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}></Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
