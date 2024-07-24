import * as Yup from "yup";

const REQUIRED_MESSAGE = "You missed this one.";

export const loginSchema = Yup.object().shape({
  email: Yup.string().email().required(REQUIRED_MESSAGE),
  password: Yup.string()
    .min(8, "Enter at least 8 characters")
    .required(REQUIRED_MESSAGE),
});
export const profileSchema = Yup.object().shape({
  phone: Yup.string().required("Please input your phone!"),
  postal_code: Yup.string().required("Please input your postal code!"),
  street: Yup.string().required("Please input your street!"),
  number: Yup.string().required("Please input your house number!"),
  complement: Yup.string(),
});
