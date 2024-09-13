// src/js/websocketController.ts

// Adresse du serveur WebSocket
export const gateway = typeof window !== 'undefined' 
  ? `ws://172.20.10.3/ws` 
  : '';

export let websocket: WebSocket | null = null;
let reconnectAttempts = 0;
const maxReconnectAttempts = 10;
let pingInterval: NodeJS.Timeout | null = null; // Intervalle pour ping

// Initialisation du serveur WebSocket
export function initWebSocket() {
  if (gateway) {
    console.log('Trying to open a WebSocket connection...');
    websocket = new WebSocket(gateway);

    websocket.onopen = onOpen;
    websocket.onclose = onClose;
    websocket.onerror = onError; // Gère les erreurs WebSocket
  } else {
    console.log('WebSocket initialization skipped - not running in a browser environment.');
  }
}

// Callback lorsque la connexion est ouverte
function onOpen(event: Event) {
  console.log('Connection opened');
  reconnectAttempts = 0; // Réinitialise les tentatives de reconnexion

  // Démarre l'envoi de ping pour garder la connexion active
  if (!pingInterval) {
    pingInterval = setInterval(() => {
      if (websocket && websocket.readyState === WebSocket.OPEN) {
        websocket.send(JSON.stringify({ cmd: 'ping' }));
        console.log('Ping sent to server');
      }
    }, 30000); // Envoie un ping toutes les 30 secondes
  }
}

// Callback lorsque la connexion est fermée
function onClose(event: Event) {
  console.log('Connection closed');

  // Arrête l'envoi des pings
  if (pingInterval) {
    clearInterval(pingInterval);
    pingInterval = null;
  }

  // Reconnecte automatiquement si le nombre max de tentatives n'est pas atteint
  if (reconnectAttempts < maxReconnectAttempts) {
    reconnectAttempts++;
    console.log(`Reconnecting... Attempt ${reconnectAttempts}`);
    setTimeout(initWebSocket, 2000);
  } else {
    console.error('Max reconnect attempts reached. Giving up.');
  }
}

// Callback en cas d'erreur WebSocket
function onError(event: Event) {
  console.error('WebSocket error:', event);
}

// Fonction pour envoyer des commandes via WebSocket
export function sendCommand(cmd: number, data: any) {
  if (websocket && websocket.readyState === WebSocket.OPEN) {
    const command = { cmd, data };
    websocket.send(JSON.stringify(command));
    console.log('Command sent:', command);
  } else {
    console.error('WebSocket is not open or initialized.');
  }
}
