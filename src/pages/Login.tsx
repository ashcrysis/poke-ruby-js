import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../services/login.ts";

import Input from "../components/Input/index.tsx";

import "../App.css";
import { Form, Formik } from "formik";
import { loginInitialValues } from "../utils/initialValues.ts";
import { loginSchema } from "../utils/validationSchemas.ts";
import { Button } from "antd";

interface IFormData {
  email: string;
  password: string;
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
    console.log({ values });
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

        <Formik
          initialValues={loginInitialValues}
          validationSchema={loginSchema}
          onSubmit={onFinish}
        >
          {() => (
            <Form>
              <Input label="Email" name="email" />

              <Input label="Password" name="password" type="password" />

              <Button
                type="primary"
                htmlType="submit"
                className="pokedex-button"
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/register")}
                className="pokedex-button"
              >
                Don't have an account? Register
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
