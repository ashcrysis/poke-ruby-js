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
      return true;
    }

    return response.data.results;
  } catch (error) {
    console.error("Error:", error);

    return false;
  }
}
