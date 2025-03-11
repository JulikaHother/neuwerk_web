document.addEventListener("DOMContentLoaded", function () {
  const fontSlider = document.getElementById("font-slider");
  const lines = document.querySelectorAll(".line");

  // Zerlege die Wörter in Buchstaben, damit jeder einzeln verändert werden kann
  lines.forEach(line => {
    const text = line.innerText;
    line.innerHTML = text.split("").map(letter => `<span>${letter}</span>`).join("");
  });

  const letters = document.querySelectorAll(".line span");

  // Jeder Buchstabe erhält zufällig eine Hauptachse, die er stärker beeinflusst
  const letterSettings = Array.from(letters).map(() => {
    const randomParam = ["wght", "srff", "ital"][Math.floor(Math.random() * 3)];
    return {
      param: randomParam,
      baseWght: getRandom(20, 80), // Startwerte für Weight
      baseSrff: getRandom(20, 80), // Startwerte für Serif
      baseItal: getRandom(-50, 50) // Startwerte für Italic
    };
  });

  function applyInitialStyles() {
    letters.forEach((letter, index) => {
      const { baseWght, baseSrff, baseItal } = letterSettings[index];
      letter.style.fontVariationSettings = `"wght" ${baseWght}, "srff" ${baseSrff}, "ital" ${baseItal}`;
    });
  }

  function updateFontVariation() {
    letters.forEach((letter, index) => {
      const { param, baseWght, baseSrff, baseItal } = letterSettings[index];
      const variation = (parseInt(fontSlider.value) - 50) * getRandomFactor(); // Wertebereich -50 bis +50

      let newWght = baseWght;
      let newSrff = baseSrff;
      let newItal = baseItal;

      // Die Werte beeinflussen nun stärker die jeweiligen Achsen
      if (param === "wght") newWght = clamp(baseWght + variation * 2, 0, 100);
      if (param === "srff") newSrff = clamp(baseSrff + variation * 2, 0, 100);
      if (param === "ital") newItal = clamp(baseItal + variation * 4, -100, 100);

      letter.style.fontVariationSettings = `"wght" ${newWght}, "srff" ${newSrff}, "ital" ${newItal}`;
    });
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomFactor() {
    return Math.random() * 2 - 1; // Zufällige Multiplikation zwischen -1 und 1
  }

  applyInitialStyles();
  fontSlider.addEventListener("input", updateFontVariation);
});
