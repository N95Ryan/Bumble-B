import { sendCommand} from "./websocket";

let intervalId = null; // Variable pour stocker l'identifiant d'intervalle
export let guidedMode = false;

// Toutes les O,5s on active le mode suivi pour que les capteurs se mettent bien à jour
// et on actualise les valeurs du sonar
export function modeGuide() {
    if (guidedMode && !intervalId) {
        intervalId = setInterval(() => {
            // pour récuperer et mettre a jour les valeurs toutes les 500ms
            obstacleTrouve();
            // Pour que les capteurs se mettent bien a jour, on envoi la commande toutes les 500ms
            sendCommand(10, 1);
            // On définit l'interval en milisecondes
        }, 500);
    }
}

export function desactivermodeGuide() {
    guidedMode = false;
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
}

// Définit une action a effectuer pendant un certain temps
export function actionObstacleTrouve(reculer, duration) {
    const interval = 100; // Exécute toutes les 100 millisecondes
    let elapsedTime = 0;

    const intervalId = setInterval(() => {
        reculer();
        elapsedTime += interval;

        if (elapsedTime >= duration) {
            clearInterval(intervalId); // Arrête après la durée spécifiée
        }
    }, interval);
}


export async function obstacleTrouve() {
    // On récupere les valeurs du sonar pendant tout le trajet
    try {
        const response = await fetch("http://172.20.10.3/track");
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des données du sonar");
        }
        const data = await response.json();
        // valeur du sonar
        const distance = data.distance;

        // Création de la fonction qui permet à la voiture de reculer
        function reculer() {
            sendCommand(1, [-1000, -1000, -1000, -1000]); 
        }

        // On effectue une action quand la valeur de la distance du sonar est inférieur ou égale a 10 (centimètres)
        if (distance <= 10) {
            // On recule pendant 500ms (0,5s)
            actionObstacleTrouve(reculer, 500);

            // Si on veut que l'alarme s'active quand il y a un obstacle devant
            // sendCommand(7, 1);
        }
        // else {
        //     sendCommand(7,0);
        // }
        
        // On vérifie qu'il n'y a pas d'erreur
    } catch (error) {
        console.error("Erreur lors de la détection des obstacles:", error);
    }
}

export function activerModeGuide() {
    guidedMode = true;
    modeGuide();
}