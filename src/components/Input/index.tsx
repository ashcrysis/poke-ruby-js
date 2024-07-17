import React from "react";
import { Input as AntdInput, Typography } from "antd";

import * as S from "./styles.ts";
import { useField } from "formik";

export interface IInputProps {
  label: string;
  name: string;
  type?: string;
  disable?: boolean;
}

const Input: React.FC<IInputProps> = (props) => {
  const { label, name, type, disable } = props;

  const [field, meta, helpers] = useField(props);

  return (
    <S.InputContainer>
      <Typography.Text>{label}</Typography.Text>

      <AntdInput
        {...field}
        id={name}
        type={type || "text"}
        disabled={disable || false}
      />

      <Typography.Text type="danger">{meta.error}</Typography.Text>
    </S.InputContainer>
  );
};

export default Input;
