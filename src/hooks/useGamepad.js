import { useEffect } from "react";
const BUTTON_MAP = {
    0: { action: "ADD_POINT", color: "blue", points: 1 }, // Botón A
    1: { action: "ADD_POINT", color: "red", points: 1 },  // Botón B
    2: { action: "ADD_POINT", color: "blue", points: 2 }, // Botón X
    3: { action: "ADD_POINT", color: "red", points: 2 },  // Botón Y
    // Agrega más botones según sea necesario
  };

export const useGamepad = (onButtonPress) => {
  useEffect(() => {
    const handleGamepadInput = () => {
      const gamepads = navigator.getGamepads();

      for (let i = 0; i < gamepads.length; i++) {
        const gamepad = gamepads[i];
        if (gamepad) {
          gamepad.buttons.forEach((button, index) => {
            if (button.pressed && BUTTON_MAP[index]) {
              console.log(`Botón detectado: ${index}`, BUTTON_MAP[index]);
              onButtonPress(BUTTON_MAP[index]); // Llama con la acción mapeada
            }
          });
        }
      }
    };

    const interval = setInterval(handleGamepadInput, 100);
    return () => clearInterval(interval);
  }, [onButtonPress]);
};