// Adresse du serveur WebSocket
export const gateway = typeof window !== 'undefined' 
  ? `ws://172.20.10.3/bumble-b` 
  : '';

export let websocket = null;
let reconnectAttempts = 0;
const maxReconnectAttempts = 10;

// Initialisation du serveur WebSocket
export function initWebSocket() {
  if (gateway) {
    websocket = new WebSocket(gateway);

    websocket.onopen = onOpen;
    websocket.onclose = onClose;
    websocket.onerror = onError; // Gère les erreurs WebSocket
  }
  else {
  }
}


// Callback lorsque la connexion est ouverte
function onOpen(event) {
  reconnectAttempts = 0; // Réinitialise les tentatives de reconnexion
}

// Callback lorsque la connexion est fermée
function onClose(event) {

  // Reconnecte automatiquement si le nombre max de tentatives n'est pas atteint
  if (reconnectAttempts < maxReconnectAttempts) {
    reconnectAttempts++;
    setTimeout(initWebSocket, 2000);
  } else {
    console.error('Maximum de tentative de connexion atteinte.');
  }
}

// Callback en cas d'erreur WebSocket
function onError(event) {
  console.error('WebSocket error:', event);
}

// Fonction pour envoyer des commandes via WebSocket
export function sendCommand(cmd, data) {
  if (websocket && websocket.readyState === WebSocket.OPEN) {
    const command = { cmd, data };
    websocket.send(JSON.stringify(command));
  } else {
    console.error('Erreur. Websocket non initialisé.');
  }
}
