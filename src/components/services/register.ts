import axios from "axios";
export async function register(
  email: string,
  nome: string,
  telefone: string,
  cep: string,
  rua: string,
  numero: string,
  complemento: string,
  password: string
) {
  try {
    const requestBody = JSON.stringify({
      user: {
        email,
        nome,
        telefone,
        cep,
        rua,
        numero,
        complemento,
        password,
      },
    });
    const response = await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: requestBody,
    });
    const data = await response.json();
    if (response.ok) {
      alert("Registration successful!");
      return true;
    } else {
      switch (response.status) {
        default:
          alert("Registration failed! \nError: " + data.status.message);
          break;
        case 500:
          alert(
            "Ops, something went wrong, we're aware of the problem and will fix the issue soon as possible"
          );
          break;
      }
    }
    console.log("Response Data:", data);
  } catch (error) {
    console.error("Error:", error);
    alert("Registration failed! Please try again.");
    return false;
  }
}
