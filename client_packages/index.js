"use strict";

mp.events.add("playerCommand", (cmdtext) => {
  const cmd = cmdtext.split(" ");
  if (cmd[0] === "drawables") {
    const params = cmd.slice(1);
    if (!params || !params[0]) {
      requestComponentDrawableVariations();
    } else if (params[0] === "male") {
      requestComponentDrawableVariations(true);
    } else if (params[0] === "female") {
      requestComponentDrawableVariations(false);
    }
  }
  if (cmd[0] === "props") {
    const params = cmd.slice(1);
    if (!params || !params[0]) {
      requestComponentDrawableVariations(undefined, true);
    } else if (params[0] === "male") {
      requestComponentDrawableVariations(true, true);
    } else if (params[0] === "female") {
      requestComponentDrawableVariations(false, true);
    }
  }
});

function requestComponentDrawableVariations(male, prop = false) {
  const gender =
    male !== null && male !== void 0 ? male : mp.players.local.isMale();
  mp.players.local.model = mp.game.joaat(
    `mp_${gender ? "m" : "f"}_freemode_01`
  );
  const drawableVariations = [];
  for (let x = 1; x < 12; x++) {
    if (!prop) {
      drawableVariations.push(
        mp.players.local.getNumberOfDrawableVariations(x)
      );
    } else {
      drawableVariations.push(
        mp.players.local.getNumberOfPropDrawableVariations(x)
      );
    }
  }
  const data = drawableVariations.map((v, idx) => {
    return {
      componentId: idx + 1,
      maxDrawable: v - 1,
    };
  });
  mp.gui.chat.push(JSON.stringify(data));
}
