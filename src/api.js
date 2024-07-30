// api.js
import axios from "axios";

export const saveCollection = async (collection, userId) => {
  try {
    const response = await axios.post(
      "http://localhost:3002/bouquets",
      collection,
      {
        headers: {
          Authorization: `Bearer ${userId}`, // Falls Authentifizierung erforderlich ist
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
