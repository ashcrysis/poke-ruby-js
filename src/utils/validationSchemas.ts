import * as Yup from "yup";

const REQUIRED_MESSAGE = "You missed this one.";

export const loginSchema = Yup.object().shape({
  email: Yup.string().email().required(REQUIRED_MESSAGE),
  password: Yup.string()
    .min(8, "Enter at least 8 characters")
    .required(REQUIRED_MESSAGE),
});

const isInteger = (value) => /^[0-9]+$/.test(value);
export const profileSchema = Yup.object().shape({
  phone: Yup.string()
    .required("Please input your phone!")
    .test("is-integer", "Phone number must be an number", isInteger),
  postal_code: Yup.string()
    .required("Please input your postal code!")
    .test("is-integer", "Postal code must be an number", isInteger),
  street: Yup.string().required("Please input your street!"),
  number: Yup.string()
    .required("Please input your house number!")
    .test("is-integer", "House number must be an number", isInteger),
  complement: Yup.string(),
});
