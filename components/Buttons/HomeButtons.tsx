import React from 'react';
import { Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importer AsyncStorage

export const HomeButtons = () => {
  const router = useRouter();

  const handleGuestMode = async () => {
    try {
      // Supprimer le token du AsyncStorage
      await AsyncStorage.removeItem('jwt_token');
      // Naviguer vers la page dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Erreur lors de la suppression du token:', error);
    }
  };

  return (
    <>
      <TouchableOpacity onPress={() => router.push('/signUp')} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>S'inscrire</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleGuestMode} style={styles.guestButton}>
        <Text style={styles.guestButtonText}>Mode invité</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    width: '100%',
    padding: 16,
    backgroundColor: '#FDE047',
    borderRadius: 24,
    alignItems: 'center',
    marginVertical: 8,
  },
  guestButton: {
    width: '100%',
    padding: 16,
    backgroundColor: '#E2E8F0',
    borderRadius: Platform.OS === 'web' ? 24 : 0,
    alignItems: 'center',
    marginVertical: 8,
  },
  loginButtonText: {
    color: '#713F12',
    fontWeight: 'bold',
    fontSize: 16,
    display: 'flex',
    justifyContent: 'center',
  },
  guestButtonText: {
    color: '#1E293B',
    fontWeight: 'bold',
    fontSize: 16,
    display: 'flex',
    justifyContent: 'center',
  },
});
