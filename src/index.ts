import { LED_WS2812, SmartLed } from "smartled"
import { move, Pins, stop } from "./libs/robutek.js"
import * as gpio from "gpio";

const ledStrip = new SmartLed(Pins.ILED, 1, LED_WS2812);

ledStrip.clear(); // Zhasne LEDku na Robůtkovi, jenom pro jistotu, kdyby už předtím svítila
ledStrip.set(0, { r: 255, g: 0, b: 0 }); // Nastaví první LEDku na červenou barvu, LEDky začínají na indexu 0
ledStrip.show(); // Rozsvítí LEDku s červenou, kterou jsme si nastavili

setInterval(() => { // pravidelně vyvolává událost
  console.log("Ukázkovný projekt pro robůtka"); // vypíše text: Ukázkovný projekt pro robůtka
}, 1000); // čas opakování se udává v milisekundách (1000 ms je 1 sekunda)

let stav = 0;

gpio.on("falling", Pins.ButtonRight, () => { // pokud se stiskne tlačítko na pravé straně robůtka
  console.log("Stisknuto tlačítko na pravé straně"); // vypíše text: Stisknuto tlačítko na pravé straně robůtka
});

gpio.on("falling", Pins.ButtonLeft, () => { // pokud se stiskne tlačítko na levé straně robůtka
  console.log("Stisknuto tlačítko na levé straně"); // vypíše text: Stisknuto tlačítko na levé straně robůtka
  if (stav === 0) {
    stav = 1;
  }
});


async function main() {
  while(1) {
    //provádím  věci
    switch(stav) {
      case 0: // start stav
        ledStrip.set(0, {r:20, g:10, b:0});
        ledStrip.show();
        break;
      case 1: //jedu provádím program
        ledStrip.clear();
        ledStrip.show();
        await move(0,{distance: 100});
        stav = 2;
        break;
      case 2: //zastavuji
        stop(true);
        stav = -1;
        break;
      default:
        console.error("neznámý stav");
        exit();
        break;
    }
  }

}

main();
