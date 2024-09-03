import axios, { AxiosResponse } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Définir un type utilisateur (ajuster les champs si nécessaire)
interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  // Ajouter tous les champs supplémentaires que l'objet utilisateur pourrait contenir
}

// Définir le type de réponse pour l'authentification
interface AuthResponse {
  error: string;
  token: string;
  user: User;
  // Ajouter tous les champs supplémentaires retournés par l'API d'authentification
}

// Fonction pour obtenir le jeton depuis AsyncStorage
const getToken = async (): Promise<string> => {
  try {
    const token = await AsyncStorage.getItem("jwt_token");
    return token || "";
  } catch (error) {
    console.error("Error getting token from AsyncStorage:", error);
    return "";
  }
};

// Création d'une instance Axios avec la base URL
const userService = axios.create({
  baseURL: "http://localhost:8080", // URL de base
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

// Fetch tous les utilisateurs depuis l'API
const getUsers = async (): Promise<User[]> => {
  const response: AxiosResponse<User[]> = await userService.get("/users");
  return response.data;
};

// Trouver un utilisateur par son ID
const findUser = async (id: number): Promise<User | null> => {
  try {
    const token = await getToken();
    const { data }: AxiosResponse<User> = await userService.get(
      `/users/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// Création d'un nouvel utilisateur
const createUser = async (
  username: string,
  email: string,
  confirmedPassword: string,
  password: string
) => {
  if (!username || !email || !confirmedPassword || !password) {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  try {
    const response = await userService.post("/register", {
      // Endpoint corrigé pour l'inscription
      username: username,
      email: email,
      confirmedPassword: confirmedPassword,
      password: password,
      role: "USER",
    });

    // Sauvegarder le token reçu dans AsyncStorage
    if (response.data.token) {
      await AsyncStorage.setItem("jwt_token", response.data.token);
    }

    console.log("Réponse du serveur:", response);
    alert("Utilisateur créé avec succès !");
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur:", error);
    alert("Une erreur est survenue, veuillez réessayer.");
  }
};

// Mise à jour d'un utilisateur
const updateUser = async (
  id: number,
  username: string,
  name: string,
  email: string,
  password: string | null
): Promise<void> => {
  const body =
    password === null
      ? { username: username, name: name, email: email }
      : { username: username, name: name, email: email, password: password };

  await userService.patch(`/users/${id}/update`, body, {
    headers: {
      "Content-Type": "application/json", // Ajustez le type de contenu si nécessaire
      Accept: "application/json",
    },
  });
};

// Suppression d'un utilisateur
const deleteUser = async (id: number): Promise<void> => {
  await userService.delete(`/users/${id}/delete`);
};

// Authentification d'un utilisateur
const authentification = async (
  username: string,
  password: string
): Promise<AuthResponse | null> => {
  try {
    const response: AxiosResponse<AuthResponse> = await userService.post(
      "/login",
      {
        username: username,
        password: password,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

// Vérification de l'email d'un utilisateur
const checkEmail = async (email: string): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await userService.post(
      "/check-email",
      {
        email: email,
      },
      {
        headers: {
          "Content-Type": "application/json", // Ajustez le type de contenu si nécessaire
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// Vérification d'un utilisateur déjà existant
const checkUsername = async (username: string): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await userService.post(
      "/check-username",
      {
        username: username,
      },
      {
        headers: {
          "Content-Type": "application/json", // Ajustez le type de contenu si nécessaire
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export {
  getUsers,
  createUser,
  checkEmail,
  checkUsername,
  authentification,
  findUser,
  updateUser,
  deleteUser,
};