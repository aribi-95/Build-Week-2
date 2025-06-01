//funzione per far in modo che al caricamento della pagina i form check-in e check-out siano già valorizzati
window.onload = function () {
  intervalloDate();
};

////////////////CAROSELLO 1//////////////////////////////////
function scrollCarousel(direction) {
  const container = document.getElementById("carousel1");
  const scrollAmount = container.offsetWidth * 0.8;
  container.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth",
  });
}

////////////////CAROSELLO 2//////////////////////////////////
function scrollCarousel2(direction) {
  const container = document.getElementById("carousel2");
  const scrollAmount = container.offsetWidth * 0.8;
  container.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth",
  });
}

////////////////CAROSELLO 3//////////////////////////////////
function scrollCarousel3(direction) {
  const container = document.getElementById("carousel3");
  const scrollAmount = container.offsetWidth * 0.8;
  container.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth",
  });
}

////////////////CAROSELLO 4//////////////////////////////////
function scrollCarousel4(direction) {
  const container = document.getElementById("carousel4");
  const scrollAmount = container.offsetWidth * 0.8;
  container.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth",
  });
}

const inputFields = document.querySelectorAll(".input-field");
const searchBtn = document.getElementById("searchBtn");
const searchIcon = document.getElementById("searchIcon");

inputFields.forEach((field) => {
  field.addEventListener("focus", () => {
    searchBtn.classList.add("expanded");
    searchBtn.innerHTML =
      '<ion-icon name="search-outline"></ion-icon> <span>Cerca</span>';
  });

  field.addEventListener("blur", () => {
    setTimeout(() => {
      if (![...inputFields].some((f) => f === document.activeElement)) {
        searchBtn.classList.remove("expanded");
        searchBtn.innerHTML = '<ion-icon name="search-outline"></ion-icon>';
      }
    }, 100);
  });
});

////////////////CALCOLO DATA PERMANENZA//////////////////////////////////
function intervalloDate() {
  document.getElementById("checkIn").addEventListener("change", intervalloDate);
  document.getElementById("checkOut").addEventListener("change", intervalloDate);
  const checkInValue = document.getElementById("checkIn").value;
  const checkOutValue = document.getElementById("checkOut").value;

  if (checkInValue && checkOutValue) {
    const checkInDate = new Date(checkInValue);
    const checkOutDate = new Date(checkOutValue);

    if (checkOutValue < checkInValue) {
      alert("🕰️ Check-out prima del check-in? Ti serve un TARDIS, non un B&B.")
    } else {
      const giornoIn = checkInDate.getDate();
      const giornoOut = checkOutDate.getDate();

      console.log("checkIn:", checkInValue);
      console.log("checkOut:", checkOutValue);

      const meseIn = checkInDate
        .toLocaleString("it-IT", { month: "short" })
        .toLowerCase();
      const meseOut = checkOutDate
        .toLocaleString("it-IT", { month: "short" })
        .toLowerCase();

      let risultato = "";

      if (meseIn === meseOut) {
        risultato = `${giornoIn}-${giornoOut} ${meseIn}`;
      } else {
        risultato = `${giornoIn} ${meseIn}-${giornoOut} ${meseOut}`;
      }

      // Calcolo notti
      const differenzaMs = checkOutDate - checkInDate;
      const notti = differenzaMs / (1000 * 60 * 60 * 24);

      // Calcolo prezzo
      const prezzoNotte = 87;
      let prezzoTotale = prezzoNotte * notti;

      document.querySelectorAll(".permanenza").forEach((el) => (el.textContent = risultato));
      document.querySelectorAll(".costo").forEach((el) => (el.textContent = `${prezzoTotale} €`));
      document.querySelectorAll(".notti").forEach((el) => (el.textContent = `${notti} ${notti === 1 ? "notte" : "notti"}`)
      ); //appare notti se è più di una, altrimenti notte
    }

  }


}
///////////////////////////////////////////////////////////////////////////////////////////////

//funzione per colorare di rosso il cuore quando viene premuto (appartamento nei preferiti)
document.querySelectorAll(".heart").forEach((heart) => {
  heart.addEventListener("click", () => {
    heart.classList.toggle("active");
  });
});
///////////////////////////////////////////////////////////////////////////////////////////////

const meno = document.querySelectorAll(".meno");
const piu = document.querySelectorAll(".piu");
const num = document.querySelectorAll(".num");
const outputInput = document.querySelector(".input");
console.log(meno, piu, num, outputInput);

function aggiornaInput(value) {
  num.textContent = value;
  outputInput.value = value;
  meno.disabled = value === 0;
}

piu.addEventListener("click", () => {
  let valore = parseInt(num.textContent, 10);
  console.log(valore);
  valore++;
  aggiornaInput(valore);
});
meno.addEventListener("click", () => {
  let valore = parseInt(num.textContent, 10);
  if (valore > 0) {
    valore--;
    aggiornaInput(valore);
  }
}); /*da sistemare deve gestire un array */

/*funzione per trasferire i valori dei form in un'altra pagina (da rivedere)
  function vaiADettaglio() {
    const checkIn = document.getElementById("checkIn").value;
    const checkOut = document.getElementById("checkOut").value;

    if (!checkIn || !checkOut) {
      alert("Seleziona entrambe le date!");
      return;
    }

    // Redireziona verso dettaglio.html con le date nella query string
    window.location.href = `dettaglio.html?checkin=${checkIn}&checkout=${checkOut}`;
  }
*/
