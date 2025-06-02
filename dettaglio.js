window.onload = function () {
    intervalloDate();
};

//INPUT CHECK-IN
flatpickr(".datepicker", {
    altInput: true,
    altFormat: "d-m-Y",      // quello che l'utente vede (es: 1 giu)
    dateFormat: "Y-m-d",   // valore interno compatibile con new Date() (altrimenti la funzione javascript per calcolare i giorni non funziona)
    minDate: "today", // Opzionale: disabilita le date passate
    defaultDate: "today", // Imposta oggi come valore predefinito
    //maxDate per data di checkout massima
    locale: "it",  // per avere il calendario in lingua italiana
});

//per calcolare il giorno successivo a quello inserito nel check-in
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

//INPUT CHECK-OUT
flatpickr(".datepickerOut", {
    altInput: true,
    altFormat: "d-m-Y",      // quello che l'utente vede (es: 1 giu)
    dateFormat: "Y-m-d",   // valore interno compatibile con new Date() (altrimenti la funzione javascript per calcolare i giorni non funziona)
    minDate: tomorrow, // Opzionale: disabilita le date passate
    defaultDate: tomorrow, // Imposta il giorno successivo come valore predefinito
    //maxDate per data di checkout massima
    locale: "it",  // per avere il calendario in lingua italiana
});


/*PER OTTENERE I VALORI INSERITI NEI FORM DELL'ALTRA SCHEDA
//
 // Recupera parametri dalla query string
 const params = new URLSearchParams(window.location.search);
 const checkIn = params.get("checkin");
 const checkOut = params.get("checkout");

 if (checkIn && checkOut) {
   document.getElementById("checkIn").value = checkIn;
   document.getElementById("checkOut").value = checkOut;
 }*/

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
            return;
        }

        if (checkOutValue == checkInValue) {
            alert("La data di check-in e quella di check-out non possono coincidere. Seleziona una data valida.")
            return;
        }

        console.log("checkIn:", checkInValue);
        console.log("checkOut:", checkOutValue);

        // Calcolo notti
        const differenzaMs = checkOutDate - checkInDate;
        const notti = differenzaMs / (1000 * 60 * 60 * 24);

        // Calcolo prezzo
        const prezzoNotte = 87; //87 euro a notte
        const pulizia = 45; //costi di pulizia
        const servizio = 21; //servizio AirBnB
        const tasse = 6; //6 euro a notte

        let costoNottiTotale = prezzoNotte * notti;
        let costoTasseTotale = tasse * notti;
        let costoTotale = costoNottiTotale + costoTasseTotale + pulizia + servizio;

        document.querySelectorAll(".prezzoNotte").forEach((el) => {
            el.textContent = `${prezzoNotte} €`;
        });
        document.getElementById("notti").textContent = ` x ${notti} ${notti === 1 ? "notte" : "notti"}`; //appare notti se è più di una, altrimenti notte
        document.getElementById("costoNottiTotale").textContent = `${costoNottiTotale}€`;
        document.getElementById("costoPulizia").textContent = `${pulizia}€`;
        document.getElementById("costoServizio").textContent = `${servizio}€`;
        document.getElementById("costoTasse").textContent = `${costoTasseTotale}€`
        document.getElementById("costoTotale").textContent = `${costoTotale}€`
        
    }
}

////////////////Gestione OSPITI//////////////////////////////////
const outputInput = document.getElementById("dropdownForm");
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

  if (totalePersone > 0) parts.push(`${totalePersone} ${totalePersone === 1 ? 'ospite' : 'ospiti'}`);
  if (animali > 0) parts.push(`${animali} ${animali === 1 ? 'animale' : 'animali'}`);
  if (neonati > 0) parts.push(`${neonati} ${neonati === 1 ? 'neonato' : 'neonati'}`);

  const testoFinale = parts.length > 0 ? parts.join(', ') : 'Aggiungi ospiti';

  outputInput.value = testoFinale;
  outputInput.placeholder = testoFinale; // 🔹 aggiorna anche il placeholder
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