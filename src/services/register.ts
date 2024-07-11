import axios from "axios";
import { IRegisterPostParams } from "../types/register";

export async function register(params: IRegisterPostParams) {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/signup`,
      {
        user: params,
      }
    );

    if (response.status === 200) {
      alert("Registration successful!");
      return { success: true };
    }

    return { success: false, message: response.data.results };
  } catch (error: any) {
    console.error("Error:", error);

    if (error.response) {
      switch (error.response.status) {
        case 400:
          return {
            success: false,
            message: "Bad request. Please check your input.",
          };
        case 401:
          return {
            success: false,
            message: "Unauthorized. Please check your credentials.",
          };
        case 409:
          return { success: false, message: "Conflict. Email already exists." };
        default:
          return { success: false, message: "An unexpected error occurred." };
      }
    } else if (error.request) {
      return {
        success: false,
        message: "No response from server. Please try again later.",
      };
    } else {
      return { success: false, message: "Error in setting up the request." };
    }
  }
}
