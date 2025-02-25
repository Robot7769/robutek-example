import { LED_WS2812, SmartLed } from "smartled"
import { Pins } from "./libs/robutek.js"
import * as gpio from "gpio";

const ledStrip = new SmartLed(Pins.ILED, 1, LED_WS2812);

ledStrip.clear(); // Zhasne LEDku na Robůtkovi, jenom pro jistotu, kdyby už předtím svítila
ledStrip.set(0, { r: 255, g: 0, b: 0 }); // Nastaví první LEDku na červenou barvu, LEDky začínají na indexu 0
ledStrip.show(); // Rozsvítí LEDku s červenou, kterou jsme si nastavili

setInterval(() => { // pravidelně vyvolává událost
  console.log("Ukázkovný projekt pro robůtka"); // vypíše text: Ukázkovný projekt pro robůtka
}, 1000); // čas opakování se udává v milisekundách (1000 ms je 1 sekunda)


gpio.on("falling", Pins.ButtonRight, () => { // pokud se stiskne tlačítko na pravé straně robůtka
  console.log("Stisknuto tlačítko na pravé straně"); // vypíše text: Stisknuto tlačítko na pravé straně robůtka
});

gpio.on("falling", Pins.ButtonLeft, () => { // pokud se stiskne tlačítko na levé straně robůtka
  console.log("Stisknuto tlačítko na levé straně"); // vypíše text: Stisknuto tlačítko na levé straně robůtka
});
