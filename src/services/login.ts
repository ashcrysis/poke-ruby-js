import axios from "axios";
export async function login(email: string, password: string) {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/login`,
      {
        user: { email, password },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      const authorizationHeader = response.headers["authorization"];
      if (authorizationHeader) {
        localStorage.setItem(
          "authorizationHeader",
          authorizationHeader.split(" ")[1]
        );

        return true;
      }
    } else {
      alert("Login failed! Please check your credentials and try again.");
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Login failed! Please check your credentials and try again.");
  }
}
