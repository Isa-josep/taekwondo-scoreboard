import { useEffect } from "react";

const BUTTON_MAP = {
  0: { action: "ADD_POINT", color: "blueScore", points: 1 }, // Botón A
  1: { action: "ADD_POINT", color: "redScore", points: 1 },  // Botón B
};

export const useGamepad = (onButtonPress) => {
  useEffect(() => {
    const handleGamepadInput = () => {
      const gamepads = navigator.getGamepads();
      // console.log("Gamepads detectados:", gamepads);

      for (let i = 0; i < gamepads.length; i++) {
        const gamepad = gamepads[i];
        if (gamepad) {
          // console.log(`Gamepad ${i} detectado:`, gamepad);
          gamepad.buttons.forEach((button, index) => {
            if (button.pressed && BUTTON_MAP[index]) {
              console.log(`Botón presionado: ${index}`, BUTTON_MAP[index]);
              onButtonPress(BUTTON_MAP[index]);
            }
          });
        }
      }
    };

    const interval = setInterval(handleGamepadInput, 100); // Comprueba cada 100ms
    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, [onButtonPress]);
};
