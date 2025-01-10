import { useEffect, useRef } from "react";

const BUTTON_MAP = {
  0: { action: "ADD_JUDGE_ACTION", color: "blueScore", points: 1 }, // Botón A: 1 punto azul
  1: { action: "ADD_JUDGE_ACTION", color: "blueScore", points: 2 }, // Botón B: 2 puntos azul
  2: { action: "ADD_JUDGE_ACTION", color: "redScore", points: 1 },  // Botón X: 1 punto rojo
  3: { action: "ADD_JUDGE_ACTION", color: "redScore", points: 2 },  // Botón Y: 2 puntos rojo
  4: { action: "ADD_JUDGE_ACTION", color: "redScore", points: 5 }, // Botón LB: 5 puntos rojo
  5: { action: "ADD_JUDGE_ACTION", color: "blueScore", points: 5 }, // Botón RB: 5 puntos azul
  6: { action: "ADD_JUDGE_ACTION", color: "redScore", points: 3 },  // Botón LT: 3 puntos rojo
  7: { action: "ADD_JUDGE_ACTION", color: "blueScore", points: 3 }, // Botón RT: 3 puntos azul
};

export const useGamepad = (onButtonPress) => {
  const buttonState = useRef({}); 

  useEffect(() => {
    const handleGamepadInput = () => {
      const gamepads = navigator.getGamepads();

      for (let i = 0; i < gamepads.length; i++) {
        const gamepad = gamepads[i];
        if (gamepad) {
          gamepad.buttons.forEach((button, index) => {
            if (button.pressed && BUTTON_MAP[index]) {
              if (!buttonState.current[`${i}-${index}`]) {
                // Solo procesa si el botón no estaba presionado antes
                console.log(`Botón presionado: ${index} por el juez ${i}`);
                onButtonPress({ ...BUTTON_MAP[index], judgeId: i });
              }
              buttonState.current[`${i}-${index}`] = true; // Marca el botón como presionado
            } else {
              buttonState.current[`${i}-${index}`] = false; // Resetea el estado del botón
            }
          });
        }
      }
    };

    const interval = setInterval(handleGamepadInput, 100); // Comprueba cada 100ms
    return () => clearInterval(interval);
  }, [onButtonPress]);
};
