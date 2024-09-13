import { sendCommand} from "./websocket";
let intervalId = null; // Variable pour stocker l'identifiant d'intervalle
export let guidedMode = false;

export function modeGuide() {
    if (guidedMode && !intervalId) {
        intervalId = setInterval(() => {
            sendCommand(10, 1);
            console.log("Mode suivi de ligne actualisé");
        }, 500);
    }
}

export function activerModeGuide() {
    guidedMode = true;
    modeGuide();
}

export function desactivermodeGuide() {
    guidedMode = false;
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
}
