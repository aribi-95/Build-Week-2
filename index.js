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

////////////////si espande il tasto CERCA//////////////////////////////////
const inputFields = document.querySelectorAll(".input-field");
const searchBtn = document.getElementById("searchBtn");
const searchIcon = document.getElementById("searchIcon");
const searchbar = document.querySelector(".search-bar");
const searchsection = document.getElementById("searchSection");
const dropdown = document.getElementById ("dropdown");
const classeInput = document.querySelector(".input")



inputFields.forEach((field) => {
  field.addEventListener("focus", () => {
    searchbar.classList.add("searchBarMod");
    searchsection.classList.add("searchSectionMod");
    dropdown.classList.add("dropdownMod");
    classeInput.style.backgroundColor = "#ebebeb";
    
    searchBtn.classList.add("expanded");
    searchBtn.innerHTML =
      '<ion-icon name="search-outline"></ion-icon> <span>Cerca</span>';
  });

  field.addEventListener("blur", () => {
    setTimeout(() => {
      if (![...inputFields].some((f) => f === document.activeElement)) {
        searchbar.classList.remove("searchBarMod");
        searchsection.classList.remove("searchSectionMod");
        dropdown.classList.remove("dropdownMod");
        classeInput.style.backgroundColor = "";
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

////////////////Gestione OSPITI//////////////////////////////////
const outputInput = document.querySelector(".input");
const nomeRows = document.querySelectorAll('.nomeRow');

nomeRows.forEach(row => {
  const tipo = row.getAttribute("data-type");
  const container = row.closest("li"); 

  const meno = container.querySelector(".meno");
  const piu = container.querySelector(".piu");
  const num = container.querySelector(".num");

  function aggBottMeno() {
    const value = parseInt(num.textContent, 10);
    meno.disabled = value === 0;
  }

  function aggTestoInput() {
    let adulti = 0, bambini = 0, neonati = 0, animali = 0;

    nomeRows.forEach(r => {
      const tipo = r.getAttribute("data-type");
      const numSpan = r.closest("li").querySelector(".num");
      const val = parseInt(numSpan.textContent, 10);

      if (tipo === 'adulti') adulti = val;
      if (tipo === 'bambini') bambini = val;
      if (tipo === 'neonati') neonati = val;
      if (tipo === 'animali') animali = val;
    });

    let parts = [];
    const totalePersone = adulti + bambini;

    if (totalePersone > 0) parts.push(`${totalePersone} ${totalePersone === 1 ? 'Ospite' : 'Ospiti'}`);
    if (animali > 0) parts.push(`${animali} ${animali === 1 ? 'animale' : 'animali'}`);
    if (neonati > 0) parts.push(`${neonati} ${neonati === 1 ? 'neonato' : 'neonati'}`);

    outputInput.value = parts.length > 0 ? parts.join(', ') : 'Aggiungi ospiti';
  }

  piu.addEventListener("click", () => {
    let valore = parseInt(num.textContent, 10);
    valore++;
    num.textContent = valore;
    aggBottMeno();
    aggTestoInput();
  });

  meno.addEventListener("click", () => {
    let valore = parseInt(num.textContent, 10);
    if (valore > 0) {
      valore--;
      num.textContent = valore;
      aggBottMeno();
      aggTestoInput();
    }
  });

  aggBottMeno();
});

//////////////////cambiare sfondo mentre c'è focus su un input ////////////////////
/*const inputFields2 = document.querySelectorAll(".input-field");
console.log(inputFields2);*/


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


// Quando si clicca sull'immagine, vai alla pagina di dettaglio
document.querySelectorAll(".cardPicture img").forEach(img => {
  img.addEventListener("click", () => {
    window.location.href = "dettaglio.html";
  });
});

// Blocca la propagazione del click sui badge
document.querySelectorAll(".badgeCard, .badgeCard *").forEach(el => {
  el.addEventListener("click", e => {
    e.stopPropagation();
  });
});

// funzione per colorare di rosso il cuore quando viene premuto (appartamento nei preferiti)
document.querySelectorAll(".heart").forEach((heart) => {
  heart.addEventListener("click", (e) => {
    e.stopPropagation(); // impedisce il click sull'immagine dietro
    heart.classList.toggle("active");
  });
});

document.querySelectorAll(".heart, .heart *").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.stopPropagation();
    el.closest(".heart").classList.toggle("active");
  });
});
///////////////////////////////////////////////////////////////////////////////////////////////

// Rendi il cuore cliccabile (toggle preferito) e blocca la propagazione
document.querySelectorAll(".heart").forEach(heart => {
  heart.addEventListener("click", (e) => {
    e.stopPropagation(); // ⛔ evita che clicchi anche l'immagine
    heart.classList.toggle("active");
  });
});
