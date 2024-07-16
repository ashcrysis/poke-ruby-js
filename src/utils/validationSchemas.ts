import * as Yup from "yup";

const REQUIRED_MESSAGE = "You missed this one.";

export const loginSchema = Yup.object().shape({
  email: Yup.string().email().required(REQUIRED_MESSAGE),
  password: Yup.string()
    .min(8, "Enter at least 8 characters")
    .required(REQUIRED_MESSAGE),
});
