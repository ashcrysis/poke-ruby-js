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
    } else {
      switch (response.status) {
        default:
          alert(
            "Registration failed! \nError: " + response.data.status.message
          );
          break;
        case 500:
          alert(
            "Ops, something went wrong, we're aware of the problem and will fix the issue soon as possible"
          );
          break;
      }
    }

    return response.data.results;
  } catch (error) {
    console.error("Error:", error);
    alert("Registration failed! Please try again.");
    return false;
  }
}
