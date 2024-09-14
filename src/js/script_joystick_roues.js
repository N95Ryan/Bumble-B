// importation de la fonction qui permet l'envoi de commande
import { sendCommand } from '../../src/js/websocket';

// On défini la vitesse max de la voiture en m/s
// calcul vitesse = vitesse de rotation des roues × diamètre des pneus × π × 60 / 10 000 000
const maxSpeedMeterPerSecond = 0.56;
// On  défini la vitesse max de la voiture sous forme de valeur que l'ESP32 comprends
const maxSpeed = 4095;

export function calculateDistance(speed, time) {
  // distance = vitesse * temps
  distance = speed * time;
  return distance;
}

// calcul de la vitesse moyenne de la voiture pendant la course
export function calculateAverageSpeed(distance, time) {
  const averageSpeed = distance / time;
  return averageSpeed;
}

export function handleJoystickMove(dx, dy) {
  // réduire ou augmenter la valeur du calcul pour ajuster l'amplitude de la voiture lors du déplacement du joystick
  const forward = dy / -50;  // valeur du joystick sur l'axe vertical
  const right = dx / -50;    // aleur du joystick sur l'axe horizontal

  // Calcul de la vitesse des roues
  // la valeur de "forward" est comprise entre 0 et 1
  let speedLeft = Math.round(maxSpeed * forward);
  let speedRight = Math.round(maxSpeed * forward);

  // Si on tourne vers la droite, réduire la vitesse de la roue gauche
  if (right > 0) {
    speedLeft = Math.round(maxSpeed * forward * (1 - right));
  }
  // Si on tourne vers la gauche, réduire la vitesse de la roue droite
  else if (right < 0) {
    speedRight = Math.round(maxSpeed * forward * (1 + right));
  }

  // fonction qui modifie les vitesses de chaque moteur
  updateSpeed([speedLeft, speedLeft, speedRight, speedRight]);

  const joystickValue = Math.max(speedLeft, speedRight);
  // Retourne la vitesse en m/s
  return calculSpeedMeterPerSecond(joystickValue);  
}

export function calculSpeedMeterPerSecond(joystickValue) {
  return (joystickValue / maxSpeed) * maxSpeedMeterPerSecond;
}

// fonction qui envoie la commande qui permet de modifier la vitesse du véhicule
// cmd 1, [X],[X],[X],[X]
export function updateSpeed(speedArray) {
  sendCommand(1, speedArray);
}
