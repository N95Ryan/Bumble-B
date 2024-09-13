import { sendCommand } from '../../src/js/websocket';

const maxSpeedMeterPerSecond = 0.56;
const maxSpeed = 4095;

export function calculateDistance(speed, time) {
  // distance = vitesse * temps
  distance = speed * time;  // La vitesse est en m/s et le temps en secondes
  return distance;
}

export function calculateAverageSpeed(distance, time) {
  const averageSpeed = distance / time;
  console.log(`Vitesse moyenne : ${averageSpeed.toFixed(2)} m/s`);
  return averageSpeed;
}

export function handleJoystickMove(dx, dy) {
  const forward = dy / -50;  // Ajustement de la vitesse avant/arrière selon l'axe vertical (dy)
  const right = dx / -50;    // Ajustement pour tourner selon l'axe horizontal (dx)

  const currentSpeed = 4095;  // vitesse maximale des moteurs

  // Calcul de la vitesse des roues
  let speedLeft = Math.round(currentSpeed * forward);
  let speedRight = Math.round(currentSpeed * forward);

  // Si on tourne vers la droite, réduire la vitesse de la roue gauche
  if (right > 0) {
    speedLeft = Math.round(currentSpeed * forward * (1 - right));
  }
  // Si on tourne vers la gauche, réduire la vitesse de la roue droite
  else if (right < 0) {
    speedRight = Math.round(currentSpeed * forward * (1 + right));
  }

  // fonction qui modifie les vitesses de chaque moteur
  updateSpeed([speedLeft, speedLeft, speedRight, speedRight]);

  const joystickValue = Math.max(speedLeft, speedRight);
  return calculSpeedMeterPerSecond(joystickValue);  // Retourne la vitesse en m/s
}

export function calculSpeedMeterPerSecond(joystickValue) {
  return (joystickValue / maxSpeed) * maxSpeedMeterPerSecond;
}


export function updateSpeed(speedArray) {
  sendCommand(1, speedArray);
}
