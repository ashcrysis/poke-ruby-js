import axios from "axios";
import { message } from "antd";
export async function fetchAllPokemons(authorizationHeader: string) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/v2/pokemons/fetch_all`,
      {
        headers: {
          Authorization: `Bearer ${authorizationHeader}`,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch Pokémon data");
    }

    return response.data.results;
  } catch (error) {
    message.error(error);
  }
}
