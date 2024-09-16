import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { Alert, Button } from "antd";
import "../App.css";
import { register } from "../services/register.ts";
import Input from "../components/Input/index.tsx";
import { IRegisterPostParams } from "../types/register";
import * as Yup from "yup";

const Register = () => {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Initial values
  const registerInitialValues = {
    email: "",
    name: "",
    phone: "",
    postal_code: "",
    street: "",
    number: "",
    complement: "",
    password: "",
  };

  // Validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Please type in your email."),
    name: Yup.string()
      .min(3, "Your name should have at least 3 characters.")
      .required("Required"),
    phone: Yup.string().required("Please type in your phone."),
    postal_code: Yup.string().required("Please type in your postal code."),
    street: Yup.string().required("Please type in your postal street."),
    number: Yup.string().required(
      "Please type in your postal code house number."
    ),
    complement: Yup.string(),
    password: Yup.string()
      .min(8, "Password too short")
      .required("Please type in your password."),
  });

  // Handle form submission
  const handleRegister = async (values: IRegisterPostParams) => {
    setIsSubmitting(true);
    try {
      const result = await register(values);
      if (result.success) {
        navigate("/");
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError("Registration failed, please try again.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="pokedex-container">
      <div className="pokedex-content">
        <h2 className="pokedex-title">Register</h2>
        <Formik
          initialValues={registerInitialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister} // Ensure formik's onSubmit is wired up
        >
          {({ errors, touched }) => (
            <Form>
              <Input label="Email" name="email" />
              <Input label="Name" name="name" />
              <Input label="Phone" name="phone" />
              <Input label="Postal Code" name="postal_code" />
              <Input label="Street" name="street" />
              <Input label="Number" name="number" />
              <Input
                label="Add-on Address"
                name="complement"
                required={false}
              />
              <Input label="Password" name="password" type="password" />

              {error && (
                <Alert message={error} type="error" showIcon closable />
              )}

              <Button
                type="primary"
                htmlType="submit" // Ensure the button triggers form submission
                disabled={isSubmitting}
              >
                Register
              </Button>

              <Button
                onClick={() => navigate("/")}
                className="pokedex-button"
                type="primary"
              >
                Have an account? Login
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
