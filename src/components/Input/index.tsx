import React from "react";
import { Input as AntdInput, Typography } from "antd";

import * as S from "./styles.ts";
import { useField } from "formik";

export interface IInputProps {
  label: string;
  name: string;
  type?: string;
  disable?: boolean;
  general_style?: React.CSSProperties;
  input_style?: React.CSSProperties;
  className?: string;
  required?: boolean;
}

const Input: React.FC<IInputProps> = (props) => {
  const { label, name, type, disable, className, required = true } = props;

  const [field, meta, helpers] = useField(props);

  return (
    <S.InputContainer className={className}>
      <Typography.Text>{`${label}${
        required ? "" : " (optional)"
      }`}</Typography.Text>

      <AntdInput
        {...field}
        id={name}
        type={type || "text"}
        disabled={disable || false}
      />

      {meta.touched && meta.error && (
        <Typography.Text type="danger">{meta.error}</Typography.Text>
      )}
    </S.InputContainer>
  );
};

export default Input;
