import { View , Text, StyleSheet, Button, Image } from "react-native";

export default function HomePage() {

  const logoImg  = require('../../assets/images/bumbleB-logo.png');

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>ACCUEIL</Text>
      <Image source={logoImg} style={{ width: 200, height: 200 }} />      
      <Text style={styles.description}>Ceci est une application mobile de test, crée dans le but d'apprendre à utiliser React Native.</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Cliquez ici !"
          color="#1f1f1f"
          onPress={() => alert('Ce bouton fonctionne correctement !')}
        />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({

  screen:{
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#ffbf00" ,
  },

  title: {
    fontSize: 28, 
    fontWeight: "bold", 
    color: "#1f1f1f",
    textAlign: 'center',
    margin: 4,
  },

  description: {
    fontSize: 14,
    fontWeight: "bold", 
    color: "#1f1f1f",
    textAlign: 'center',
    margin: 4,
  },

  buttonContainer: {
    margin: 10,
  },
});