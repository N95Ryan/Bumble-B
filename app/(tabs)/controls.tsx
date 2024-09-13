import Bandeau from '@/components/Controls/Bandeau';
import Image from '@/components/Controls/Camera';
import Units from '@/components/Controls/Units';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';

interface JwtPayload {
    sub?: string;
}

// Fonction pour décoder le token JWT
const parseJwt = (token: string): JwtPayload | null => {
    try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = atob(base64);
        const decoded = decodeURIComponent(
            jsonPayload
                .split("")
                .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                .join("")
        );
        return JSON.parse(decoded);
    } catch (error) {
        console.error("Erreur lors du décodage du JWT :", error);
        return null;
    }
};

// Fonction pour obtenir les utilisateurs par nom d'utilisateur
const getUsersByUsername = async (username: string, token: string) => {
    try {
        const response = await axios.get('http://localhost:8080/users', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data.filter((user: any) => user.username === username);
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        return [];
    }
};

export default function ControlsPage() {
    const { width, height } = useWindowDimensions();
    const is_landscape = width > height;
    const is_tall = height > 900;

    const [user, setUser] = useState<any>(null);

    // Appel à l'API pour récupérer les utilisateurs
    useEffect(() => {
        const getUserData = async () => {
            try {
                const token = await AsyncStorage.getItem("jwt_token");
                if (token) {
                    const decodedToken = parseJwt(token);
                    const userName = decodedToken?.sub || "";
                    if (userName) {
                        const users = await getUsersByUsername(userName, token);
                        if (users.length > 0) {
                            setUser(users[0]);
                        }
                    }
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données:", error);
            }
        };

        getUserData();
    }, []);

    return (
        <View style={[
                styles.container, 
                is_landscape && styles.container_landscape,
                is_tall && styles.container_tall]}>
            <Bandeau is_landscape={is_landscape} />
            <Image is_landscape={is_landscape} />
            <Units is_landscape={is_landscape} user={user} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: "#020617",
        paddingVertical: 24,
    },
    container_landscape: {
        position: 'relative'
    },
    container_tall: {
        justifyContent: 'flex-start',
        paddingVertical: 48,
        rowGap: 32,
    }
});
