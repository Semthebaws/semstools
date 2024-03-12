document.addEventListener("DOMContentLoaded", function () {
  const verkoopprijsInput = document.getElementById("verkoopprijs");
  const inkoopprijsInput = document.getElementById("inkoopprijs");
  const lvbTariefSelect = document.getElementById("lvb-tarief");
  const btwOutput = document.getElementById("btw-output");
  const commissieOutput = document.getElementById("commissie-output");
  const winstOutput = document.getElementById("winst-output");
  const winstmargeOutput = document.getElementById("winstmarge-output");

  function parseInputValue(inputValue) {
    // Vervang komma's door punten en probeer het getal te parseren
    return parseFloat(inputValue.replace(",", "."));
  }

  function berekenBTWBedrag(verkoopprijs) {
    return (verkoopprijs / 121) * 21;
  }

  function berekenCommissie(verkoopprijs) {
    if (verkoopprijs <= 10) {
      return verkoopprijs * 0.124 + 0.2;
    } else if (verkoopprijs > 10 && verkoopprijs <= 20) {
      return verkoopprijs * 0.124 + 0.4;
    } else {
      return verkoopprijs * 0.124 + 0.85;
    }
  }

  function berekenLvBKosten(verkoopprijs, lvbTarief) {
    const tarieven = {
      "3XS": verkoopprijs < 16 ? 2.35 : 2.55,
      XXS: verkoopprijs < 16 ? 3.06 : 3.26,
      XS: verkoopprijs < 16 ? 3.95 : 4.7,
      S: verkoopprijs < 16 ? 4.85 : 5.6,
      M: verkoopprijs < 16 ? 5.01 : 5.76,
      L: verkoopprijs < 16 ? 6.07 : 6.82,
    };
    return tarieven[lvbTarief] || 0;
  }

  function updateUI() {
    const verkoopprijs = parseInputValue(verkoopprijsInput.value) || 0;
    const inkoopprijs = parseInputValue(inkoopprijsInput.value) || 0;
    const lvbTarief = lvbTariefSelect.value;
    const btwBedrag = berekenBTWBedrag(verkoopprijs);
    const commissie = berekenCommissie(verkoopprijs);
    const lvbKosten = berekenLvBKosten(verkoopprijs, lvbTarief);
    const winstPerVerkoop =
      verkoopprijs - btwBedrag - commissie - lvbKosten - inkoopprijs;
    const winstmarge = (winstPerVerkoop / verkoopprijs) * 100;

    btwOutput.textContent = `€${btwBedrag.toFixed(2)}`;
    commissieOutput.textContent = `€${commissie.toFixed(2)}`;
    if (!isNaN(winstPerVerkoop) && winstPerVerkoop !== 0) {
      winstOutput.textContent = `€${winstPerVerkoop.toFixed(2)}`;
      winstmargeOutput.textContent = `${winstmarge.toFixed(2)}%`;
    } else {
      winstOutput.textContent = "Ongeldige invoer";
      winstmargeOutput.textContent = "Ongeldige invoer";
    }
  }

  verkoopprijsInput.addEventListener("input", updateUI);
  inkoopprijsInput.addEventListener("input", updateUI);
  lvbTariefSelect.addEventListener("change", updateUI);
});
