import axios, { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  token: string;
  user: User;
  // Ajouter tous les champs supplémentaires retournés par l'API d'authentification
}

// Fonction pour obtenir le jeton depuis AsyncStorage
const getToken = async (): Promise<string> => {
  try {
	const token = await AsyncStorage.getItem('jwt_token');
	return token || '';
  } catch (error) {
	console.error('Error getting token from AsyncStorage:', error);
	return '';
  }
};

// Création d'une instance Axios avec un token dynamique
const userService = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});

// Fetch tous les utilisateurs depuis l'API
const getUsers = async (): Promise<User[]> => {
  const response: AxiosResponse<User[]> = await userService.get('/users');
  return response.data;
};

// Trouver un utilisateur par son ID
const findUser = async (id: number): Promise<User | null> => {
  try {
	const token = await getToken();
	const { data }: AxiosResponse<User> = await userService.get(`/users/${id}`, {
	  headers: {
		Authorization: `Bearer ${token}`,
		'Content-Type': 'application/json',
	  },
	});
	return data;
  } catch (error) {
	console.log(error);
	return null;
  }
};

// Création d'un nouvel utilisateur
const createUser = async ( username: string, email:string , password: string, confirmedPassword: string) => {
    if (!email || !password) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
  
    if (password !== confirmedPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
  
    try {
      await createUser(username, email, password, confirmedPassword);
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
  const body = password === null 
	? { username: username, name: name, email: email }
	: { username: username, name: name, email: email, password: password };
  await userService.patch(`/user/${id}/update`, body, {
	headers: {
	  'Content-Type': 'multipart/form-data',
	  Accept: 'application/json',
	},
  });
};

// Suppression d'un utilisateur
const deleteUser = async (id: number): Promise<void> => {
  await userService.delete(`/user/${id}/delete`);
};

// Authentification d'un utilisateur
const authentification = async (username: string, password: string): Promise<AuthResponse> => {
  const response: AxiosResponse<AuthResponse> = await userService.post('/signin', {
	username: username,
	password: password,
  });
  return response.data;
};

// Vérification de l'email d'un utilisateur
const checkEmail = async (email: string): Promise<AxiosResponse> => {
  try {
	const response: AxiosResponse = await userService.post(
	  '/check-email',
	  {
		email: email,
	  },
	  {
		headers: {
		  'Content-Type': 'multipart/form-data',
		},
	  }
	);
	return response;
  } catch (error) {
	console.error('Error:', error);
	throw error;
  }
};

// Vérification d'un utilisateur déjà exisant
const checkUsername = async (username: string): Promise<AxiosResponse> => {
  try {
	const response: AxiosResponse = await userService.post(
	  '/check-username',
	  {
		username: username,
	  },
	  {
		headers: {
		  'Content-Type': 'multipart/form-data',
		},
	  }
	);
	return response;
  } catch (error) {
	console.error('Error:', error);
	throw error;
  }
};

export { getUsers, createUser, checkEmail, checkUsername, authentification, findUser, updateUser, deleteUser };