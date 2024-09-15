import axios, { AxiosResponse } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Définir un type utilisateur (ajuster les champs si nécessaire)
interface User {
  id: number;
  username: string;
  firstname: string; // Ajout de firstname
  lastname: string; // Ajout de lastname
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

// Création d'une instance Axios avec un délai d'attente plus long
const userService = axios.create({
  baseURL: "http://localhost:8080", // URL de base
  timeout: 5000, // Délai d'attente de 5 secondes
  headers: { "Content-Type": "application/json" },
});

// Fetch tous les utilisateurs depuis l'API
const getUsers = async (): Promise<User[]> => {
  try {
    const response: AxiosResponse<User[]> = await userService.get("/users");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    throw error;
  }
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
    return null;
  }
};

// Création d'un nouvel utilisateur
const createUser = async (
  firstname: string, // Nouveau paramètre
  lastname: string, // Nouveau paramètre
  username: string,
  email: string,
  password: string,
  confirmedPassword: string
) => {
  if (
    !firstname ||
    !lastname ||
    !username ||
    !email ||
    !password ||
    !confirmedPassword
  ) {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  if (password !== confirmedPassword) {
    alert("Les mots de passe ne correspondent pas.");
    return;
  }

  try {
    const response = await userService.post("/register", {
      firstname, // Inclure dans le corps de la requête
      lastname, // Inclure dans le corps de la requête
      username,
      email,
      password,
      confirmedPassword,
      role: "USER",
    });

    // Sauvegarder le token reçu dans AsyncStorage
    if (response.data.token) {
      await AsyncStorage.setItem("jwt_token", response.data.token);
    }

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
  firstname: string, // Nouveau paramètre
  lastname: string, // Nouveau paramètre
  email: string,
  password: string | null
): Promise<void> => {
  const body =
    password === null
      ? { username, firstname, lastname, email }
      : { username, firstname, lastname, email, password };

  try {
    await userService.patch(`/users/${id}/update`, body, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    throw error;
  }
};

// Suppression d'un utilisateur
const deleteUser = async (id: number): Promise<void> => {
  try {
    await userService.delete(`/users/${id}/delete`);
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur:", error);
    throw error;
  }
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
        username,
        password,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'authentification:", error);
    return null;
  }
};

// Vérification de l'email d'un utilisateur
const checkEmail = async (email: string): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await userService.post(
      "/check-email",
      {
        email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Erreur lors de la vérification de l'email:", error);
    throw error;
  }
};

// Vérification d'un utilisateur déjà existant
const checkUsername = async (username: string): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await userService.post(
      "/check-username",
      {
        username,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error(
      "Erreur lors de la vérification du nom d'utilisateur:",
      error
    );
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
