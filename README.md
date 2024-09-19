# Description du projet 👨‍🏫

Bumble B est une application mobile développée dans le cadre d'un projet scolaire.

L'application sert à contrôler une petite voiture équipée d'un module ESP32.

Cette application permettra à l'utilisateur non seulement de piloter le véhicule, mais aussi de visualiser diverses données sous forme de graphiques. Le contrôle de la vitesse, de la trajectoire ainsi que la récupération de
données et de statistiques.

# Stack technique 🖥

## Front-end 🚀

Voici les technologies utilisées en Front-end au sein de ce projet :

- React Native

Le développement front-end de notre application repose sur [React Native](https://reactnative.dev/), cet outil nous permet de développer l'application sous iOS et Android avec une seule codebase.

Il se différencie également par son ergonomie, simplifiant la maintenance du code.

- Expo

[Expo](https://expo.dev/) est un outil qui permet de développer nos applications mobiles. Nous l'avons choisi principalement pour sa simplicité d’utilisation ainsi que pour sa compatibilité avec React Native. 

Cela nous élimine également la nécessité de configurer manuellement les environnements iOS et Android, ce qui est un gain de temps.


- TypeScript

TypeScript a été choisi pour ce projet afin d'améliorer la qualité du code et d'assurer une meilleure maintenabilité à long terme. En tant que sur-ensemble typé de JavaScript, TypeScript permet de définir des types explicites pour les variables, fonctions et objets, ce qui aide à prévenir les erreurs fréquentes et facilite le travail en équipe.

- Axios

Axios a été utilisé pour effectuer des requêtes HTTP vers le serveur ESP32 et d'autres points d’accès API nécessaires pour le projet. L’application Bumble B dépend de la communication réseau pour récupérer et envoyer des informations sur la voiture en temps réel, comme les vitesses et les données des capteurs.

## Back-end 🛠️

Voici le lien vers les repos GitHub en lien avec le back-end du projet.

- Back-end : https://github.com/annemhd/fil-rouge-backend
- ESP : https://github.com/jasonljasonl/websocket-mqtt-bumble-b



## Installation 📥

Voici comment installer la partie front-end du projet :
```bash
  git clone https://github.com/N95Ryan/Bumble-B.git
  cd Bumble-B
  yarn
  yarn start
```
    


# 👥 Auteurs
- [@Ryan PINA-SILASSE](https://github.com/N95Ryan)
- [@Nathan PINARD](https://github.com/YOUGBOY95)
- [@Anne-Catherine MICHAUD](https://github.com/annemhd)
- [@Elisa LENOTRE]( https://github.com/elisalenotre)
- [@Nolan RAMOS](https://github.com/Nolan-ramos)
- [@Jason LANDIM](https://github.com/jasonljasonl)
- [@Maxime DESRUETS](https://github.com/Jylt-wNz)