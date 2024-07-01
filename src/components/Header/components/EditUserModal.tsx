import React, { useState } from "react";
import { Modal, Form, Input, message, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const EditUserModal = ({ visible, onClose, userData, userId, setUserData }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      if (!values.password) {
        values.password = userData.password;
      }

      setLoading(true);
      const token = localStorage.getItem("authorizationHeader");
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/v2/users/update/${userId}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserData(response.data);

      form.resetFields();
      onClose();

      window.location.reload();
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
  };
  const handleImageChange = ({ file }) => {
    setImageFile(file.originFileObj);
  };
  return (
    <Modal
      title="Edit User Data"
      visible={visible}
      onOk={handleOk}
      onCancel={onClose}
      confirmLoading={loading}
    >
      <Form form={form} initialValues={userData}>
        <Form.Item label="Email" name="email">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Name" name="name">
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: "Please input your phone!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Postal Code"
          name="postal_code"
          rules={[
            { required: true, message: "Please input your postal code!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Street"
          name="street"
          rules={[{ required: true, message: "Please input your street!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Number"
          name="number"
          rules={[
            { required: true, message: "Please input your house number!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Complement" name="complement">
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password placeholder="Enter new password or leave empty to keep the current" />
        </Form.Item>
        <Form.Item label="Profile Image">
          <Upload
            listType="picture"
            beforeUpload={() => false}
            onChange={handleImageChange}
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUserModal;
