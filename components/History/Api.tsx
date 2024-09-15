import axios from "axios";
import { format, parse } from "date-fns";
import { fr } from "date-fns/locale";

// Fonction pour décoder le token JWT
export function parseJwt(token: string) {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) {
      throw new Error("Invalid token format");
    }

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = atob(base64);

    const decoded = decodeURIComponent(
      jsonPayload
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(decoded);
  } catch (error) {
    console.error("Erreur lors du décodage du JWT :", error);
    return null;
  }
}

// Fonction pour obtenir les utilisateurs par nom d'utilisateur
export const getUsersByUsername = async (username: string, token: string) => {
  try {
    const response = await axios.get("http://localhost:8080/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.filter((user: any) => user.username === username);
  } catch (error) {
    console.error("Get Users Error:", error);
    return [];
  }
};

// Fonction pour obtenir les courses d'un utilisateur par ID
export const getRacesById = async (userId: string, token: string) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/users/${userId}/races`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Get Races Error:", error);
    return [];
  }
};

// Fonction pour supprimer toutes les courses d'une date donnée
export const deleteRacesByDate = async (date: string, token: string) => {
  try {
    const isoDate = format(
      parse(date, "d MMMM", new Date(), { locale: fr }),
      "yyyy-MM-dd"
    );
    const response = await axios.get(`http://localhost:8080/races`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const racesToDelete = response.data.filter(
      (race: any) => format(new Date(race.createdAt), "yyyy-MM-dd") === isoDate
    );

    for (const race of racesToDelete) {
      await axios.delete(`http://localhost:8080/races/${race.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  } catch (error) {
    console.error("Erreur lors de la suppression des courses :", error);
  }
};
