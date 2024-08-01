import React, { useState } from "react";
import { Modal, message, Upload, Button, Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import * as Yup from "yup";
import Input from "../../Input/index.tsx";
import { Formik } from "formik";

interface IEditUserModalProps {
  visible: boolean;
  onClose: () => void;
  userData: {
    email: string;
    name: string;
    phone?: string;
    postal_code?: string;
    street?: string;
    number?: string;
    complement?: string;
    image_url: string;
  };
  userId: string | undefined;
  setUserData: (data: any) => void;
}

const EditUserModal: React.FC<IEditUserModalProps> = ({
  visible,
  onClose,
  userData,
  userId,
  setUserData,
}) => {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageSelected, setImageSelected] = useState(false);

  const [initialValues] = useState({
    email: userData.email,
    name: userData.name,
    phone: userData.phone || "",
    postal_code: userData.postal_code || "",
    street: userData.street || "",
    number: userData.number || "",
    complement: userData.complement || "",
  });

  const isFormDirty = (values: any) => {
    return (
      values.email !== initialValues.email ||
      values.name !== initialValues.name ||
      values.phone !== initialValues.phone ||
      values.postal_code !== initialValues.postal_code ||
      values.street !== initialValues.street ||
      values.number !== initialValues.number ||
      values.complement !== initialValues.complement ||
      imageSelected
    );
  };

  const validationSchema = Yup.object().shape({
    phone: Yup.string().required("Please input your phone!"),
    postal_code: Yup.string().required("Please input your postal code!"),
    street: Yup.string().required("Please input your street!"),
    number: Yup.string().required("Please input your house number!"),
    complement: Yup.string(),
  });

  const handleOk = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append("user[email]", userData.email);
      formData.append("user[name]", userData.name);
      formData.append("user[phone]", values.phone);
      formData.append("user[postal_code]", values.postal_code);
      formData.append("user[street]", values.street);
      formData.append("user[number]", values.number);
      formData.append("user[complement]", values.complement);

      if (imageFile) {
        formData.append("user[image]", imageFile);
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
      onClose();
      window.location.reload();
    } catch (error) {
      message.error("Failed to update user data:", error);
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
  };

  const handleImageChange = (file: File) => {
    setImageFile(file);
    setImageSelected(true);
    return false;
  };

  return (
    <Modal title="Your data" visible={visible} onCancel={onClose} footer={null}>
      <Formik
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
        {({ values }) => (
          <Form id="editUserForm">
            <Input label="Email" name="email" disable={true} />
            <Input label="Name" name="name" disable={true} />
            <Input label="Phone" name="phone" />
            <Input label="Postal Code" name="postal_code" />
            <Input label="Street" name="street" />
            <Input label="Number" name="number" />
            <Input label="Complement" name="complement" />

            <Form.Item label="Profile Image">
              <Upload listType="picture" beforeUpload={handleImageChange}>
                <Button icon={<UploadOutlined />}>Upload Image</Button>
              </Upload>
            </Form.Item>

            <div style={{ textAlign: "right" }}>
              <Button
                key="back"
                onClick={onClose}
                style={{ marginRight: 8 }}
                danger={true}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                disabled={!imageSelected || !isFormDirty(values)}
                danger={true}
              >
                Save
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default EditUserModal;
