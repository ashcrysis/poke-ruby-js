import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Alert } from "antd";
import "../App.css";
import { register } from "../services/register.ts";
import { IRegisterPostParams } from "../types/register";

const Register = () => {
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<IRegisterPostParams>({
    email: "",
    name: "",
    phone: "",
    postal_code: "",
    street: "",
    number: "",
    complement: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const fieldLabels: Record<string, string> = {
    email: "Email",
    name: "Name",
    phone: "Phone",
    postal_code: "Postal Code",
    street: "Street",
    number: "Number",
    complement: "Add-on Address",
    password: "Password",
  };

  const handleRegister = async () => {
    let missingFields: string[] = [];

    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        missingFields.push(fieldLabels[key]);
      }
    });

    if (missingFields.length === Object.keys(formData).length) {
      setError("Please fill in all needed fields.");
      return;
    }

    try {
      const output = await register(formData);
      if (output) {
        navigate("/");
      }
    } catch (error) {
      setError("Registration failed, please try again.");
    }
  };

  const onFinish = async (values: IRegisterPostParams) => {
    handleRegister();
  };

  const onFinishFailed = (errorInfo: any) => {
    const missingFields = Object.keys(errorInfo.values).filter((field) =>
      errorInfo.errorFields.some((item) => item.name[0] === field)
    );

    const missingFieldLabels = missingFields.map((field) => fieldLabels[field]);
    if (missingFieldLabels.length > 6) {
      setError(`Please fill in all the necessary fields`);
    } else {
      setError(
        `Please fill in the following fields: ${missingFieldLabels.join(", ")}`
      );
    }
  };

  const handleClose = () => {
    setError(null);
  };

  return (
    <div className="pokedex-container">
      <div className="pokedex-content">
        <h2 className="pokedex-title">Register</h2>
        <Form
          name="register"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{
            width: "100%",
            maxWidth: 400,
            marginLeft: "130px",
          }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input id="email" onChange={handleInputChange} />
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input id="name" onChange={handleInputChange} />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input id="phone" onChange={handleInputChange} />
          </Form.Item>
          <Form.Item
            label="Postal Code"
            name="postal_code"
            rules={[
              { required: true, message: "Please input your postal code!" },
            ]}
          >
            <Input id="postal_code" onChange={handleInputChange} />
          </Form.Item>
          <Form.Item
            label="Street"
            name="street"
            rules={[{ required: true, message: "Please input your street!" }]}
          >
            <Input id="street" onChange={handleInputChange} />
          </Form.Item>
          <Form.Item
            label="Number"
            name="number"
            rules={[
              { required: true, message: "Please input your house number!" },
            ]}
          >
            <Input id="number" onChange={handleInputChange} />
          </Form.Item>
          <Form.Item label="Add-on Address" name="complement">
            <Input id="complement" onChange={handleInputChange} />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password id="password" onChange={handleInputChange} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            {error && (
              <Alert
                message={error}
                type="error"
                showIcon
                closable
                onClose={handleClose}
              />
            )}
            <div style={{ display: "flex", marginLeft: "-50px" }}>
              <Button
                className="pokedex-button"
                type="primary"
                htmlType="submit"
              >
                Register
              </Button>
              <Button onClick={() => navigate("/")} className="pokedex-button">
                Have an account? Login
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
