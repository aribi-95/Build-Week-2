//funzione per far in modo che al caricamento della pagina i form check-in e check-out siano già valorizzati
window.onload = function() {
    intervalloDate();
}; 

////////////////CAROSELLO 1//////////////////////////////////
function scrollCarousel(direction) {
    const container = document.getElementById('carousel1');
    const scrollAmount = container.offsetWidth * 0.8; 
    container.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

////////////////CAROSELLO 2//////////////////////////////////
function scrollCarousel2(direction) {
    const container = document.getElementById('carousel2');
    const scrollAmount = container.offsetWidth * 0.8; 
    container.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

////////////////CAROSELLO 3//////////////////////////////////
function scrollCarousel3(direction) {
    const container = document.getElementById('carousel3');
    const scrollAmount = container.offsetWidth * 0.8; 
    container.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

////////////////CAROSELLO 4//////////////////////////////////
function scrollCarousel4(direction) {
    const container = document.getElementById('carousel4');
    const scrollAmount = container.offsetWidth * 0.8; 
    container.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

const inputFields = document.querySelectorAll('.input-field');
const searchBtn = document.getElementById('searchBtn');
const searchIcon = document.getElementById('searchIcon');

inputFields.forEach(field => {
  field.addEventListener('focus', () => {
    searchBtn.classList.add('expanded');
    searchBtn.innerHTML = '<ion-icon name="search-outline"></ion-icon> <span>Cerca</span>';
  });

  field.addEventListener('blur', () => {
    setTimeout(() => {
      if (![...inputFields].some(f => f === document.activeElement)) {
        searchBtn.classList.remove('expanded');
        searchBtn.innerHTML = '<ion-icon name="search-outline"></ion-icon>';
      }
    }, 100);
  });
});

////////////////CALCOLO DATA PERMANENZA//////////////////////////////////
function intervalloDate() {
    const checkInValue = document.getElementById("checkIn").value;
    const checkOutValue = document.getElementById("checkOut").value;

    if (checkInValue && checkOutValue) {
        const checkInDate = new Date(checkInValue);
        const checkOutDate = new Date(checkOutValue);

        const giornoIn = checkInDate.getDate();
        const giornoOut = checkOutDate.getDate();

        const meseIn = checkInDate.toLocaleString('it-IT', { month: 'short' }).toLowerCase();
        const meseOut = checkOutDate.toLocaleString('it-IT', { month: 'short' }).toLowerCase();

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


        document.querySelectorAll(".permanenza").forEach(el => el.textContent = risultato);
        document.querySelectorAll(".costo").forEach(el => el.textContent = `${prezzoTotale} €`);
        document.querySelectorAll(".notti").forEach(el => el.textContent = `${notti} ${notti === 1 ? "notte" : "notti"}`); //appare notti se è più di una, altrimenti notte
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////

//funzione per colorare di rosso il cuore quando viene premuto (appartamento nei preferiti)
document.querySelectorAll('.heart').forEach(heart => {
    heart.addEventListener('click', () => {
      heart.classList.toggle('active');
    });
  });
///////////////////////////////////////////////////////////////////////////////////////////////