import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import RaceBoard from "@/components/RaceBoard/RaceBoard";
import Navbar from "@/components/Navbar/Navbar";
import { launchImageLibrary } from 'react-native-image-picker';

// Interface pour le payload JWT
interface JwtPayload {
  sub?: string;
  // Ajouter d'autres champs si nécessaire
}

function parseJwt(token: string) {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) {
      throw new Error("Invalid token format");
    }

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = atob(base64);

    // Ajout du support pour UTF-8
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

const getUsersByUsername = async (username: string, token: string) => {
  try {
    console.log("Fetching users with username:", username);
    const response = await axios.get("http://localhost:8080/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Users Response:", response.data);
    const filteredUsers = response.data.filter(
      (user: any) => user.username === username
    );
    console.log("Filtered Users:", filteredUsers);
    return filteredUsers;
  } catch (error) {
    console.error("Get Users Error:", error);
    return [];
  }
};

const getRacesById = async (userId: string, token: string) => {
  try {
    console.log("Fetching races for userId:", userId);
    const response = await axios.get(
      `http://localhost:8080/users/${userId}/races`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Races Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Get Races Error:", error);
    return [];
  }
};

export default function Dashboard() {
  const [username, setUsername] = useState<string>("");
  const [races, setRaces] = useState<any[]>([]);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        console.log("Fetching JWT token from AsyncStorage...");
        const token = await AsyncStorage.getItem("jwt_token");
        if (token) {
          console.log("Token found:", token);
          setToken(token);
          const decodedToken = parseJwt(token) as JwtPayload;
          const userName = decodedToken?.sub || "Inconnu";
          console.log("Decoded username:", userName);
          setUsername(userName);

          const users = await getUsersByUsername(userName, token);
          const user = users[0];
          if (user) {
            console.log("User found:", user);
            setUserId(user.id);
            const userRaces = await getRacesById(user.id, token);
            setRaces(userRaces);
            if (user.avatarId) {
              const avatarUri = `http://localhost:8080/documents/${user.avatarId}`;
              console.log("Setting avatar URL:", avatarUri);
              setAvatarUrl(avatarUri);
            }
          } else {
            console.log("No user found with username:", userName);
          }
        } else {
          console.log("No token found in AsyncStorage.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du token ou des données utilisateur :", error);
      }
    };

    fetchUsername();
  }, []);

  const handleImagePick = () => {
    console.log("Launching image picker...");
    launchImageLibrary({ mediaType: 'photo', includeBase64: false }, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        console.log("Image picked:", response.assets);
        const selectedFile = response.assets?.[0];
        if (selectedFile && token) {
          console.log("Selected file:", selectedFile);
          try {
            const { uri, type, fileName } = selectedFile;
            console.log("File details:", { uri, type, fileName });
            
            const fileType = type || determineFileType(uri || ''); // Provide a default empty string
            const fileDisplayName = fileName || 'unknown';
            
            if (uri && fileType) {
              const formData = new FormData();
              formData.append('file', {
                uri,
                type: fileType,
                name: fileDisplayName,
              } as any); // Casting as any to bypass type issues

              console.log("Uploading file...");
              const uploadResponse = await axios.post('http://localhost:8080/documents', formData, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'multipart/form-data',
                },
              });

              console.log('Image Response:', uploadResponse.data);
              const avatarId = uploadResponse.data.id;
              console.log("Avatar ID received:", avatarId);
              if (avatarId && userId) {
                console.log("Updating avatar...");
                await updateAvatar(avatarId);
              }
            } else {
              console.log("File details are missing (uri or type is undefined).");
            }
          } catch (error) {
            console.error('Upload Error:', error);
          }
        } else {
          console.log("No file selected or token missing.");
        }
      }
    });
  };

  const determineFileType = (fileUri: string) => {
    // Déterminez le type basé sur l'extension du fichier
    if (fileUri.endsWith('.jpg') || fileUri.endsWith('.jpeg')) return 'image/jpeg';
    if (fileUri.endsWith('.png')) return 'image/png';
    if (fileUri.endsWith('.gif')) return 'image/gif';
    return 'application/octet-stream'; // Type par défaut
  };

  const updateAvatar = async (avatarId: string) => {
    if (userId && token) {
      try {
        console.log("Sending request to update avatar...");
        await axios.patch(
          `http://localhost:8080/users/${userId}/avatar/${avatarId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const newAvatarUrl = `http://localhost:8080/documents/${avatarId}`;
        console.log("Avatar updated successfully. New avatar URL:", newAvatarUrl);
        setAvatarUrl(newAvatarUrl);
      } catch (error) {
        console.error('Update Avatar Error:', error);
      }
    } else {
      console.log("User ID or token is missing. Cannot update avatar.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleImagePick}>
        <Image
          source={avatarUrl ? { uri: avatarUrl } : require("../../components/RaceBoard/assets/Frame-1.png")}
          style={{ width: 56, height: 56 }}
        />
      </TouchableOpacity>
      <Text style={styles.greeting}>Bonjour {username}</Text>
      <Text style={styles.text}>Bienvenue sur Bumble B 🐝</Text>
      <RaceBoard races={races} />
      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1f1f1f",
    textAlign: "center",
    margin: 4,
  },

  greeting: {
    color: "#020617",
    fontSize: 33,
    fontStyle: "normal",
    fontWeight: "700",
  },

  text: {
    color: "#64748B",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "400",
  },
});
