window.onload = function () {
    intervalloDate();
};

/*PER OTTENERE I VALORI INSERITI NEI FORM DELL'ALTRA SCHEDA*/ //
// Recupera parametri dalla query string
const params = new URLSearchParams(window.location.search);
const checkIn = params.get("checkin");
const checkOut = params.get("checkout");

//INPUT CHECK-IN
flatpickr(".datepicker", {
    altInput: true,
    altFormat: "j M", // quello che l'utente vede (es: 1 giu)
    dateFormat: "Y-m-d", // valore interno compatibile con new Date() (altrimenti la funzione javascript per calcolare i giorni non funziona)
    minDate: "today" || checkIn, // Opzionale: disabilita le date passate
    defaultDate: checkIn || "today", // mostra la data di check-in inserita nella home
    //maxDate per data di checkout massima
    locale: "it", // per avere il calendario in lingua italiana
});

//per calcolare il giorno successivo a quello inserito nel check-in
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

//INPUT CHECK-OUT
flatpickr(".datepickerOut", {
    altInput: true,
    altFormat: "j M", // quello che l'utente vede (es: 1 giu)
    dateFormat: "Y-m-d", // valore interno compatibile con new Date() (altrimenti la funzione javascript per calcolare i giorni non funziona)
    minDate: tomorrow || checkOut, // Opzionale: disabilita le date passate
    defaultDate: checkOut || tomorrow, // mostra la data di check-out inserita nella home
    //maxDate per data di checkout massima
    locale: "it", // per avere il calendario in lingua italiana
});

function intervalloDate() {
    document.getElementById("checkIn").addEventListener("change", intervalloDate);
    document.getElementById("checkOut").addEventListener("change", intervalloDate);
    const checkInValue = document.getElementById("checkIn").value;
    const checkOutValue = document.getElementById("checkOut").value;

    if (checkInValue && checkOutValue) {
        const checkInDate = new Date(checkInValue);
        const checkOutDate = new Date(checkOutValue);

        if (checkOutValue < checkInValue) {
            alert("🕰️ Check-out prima del check-in? Ti serve un TARDIS, non un B&B.");
            return;
        }

        if (checkOutValue == checkInValue) {
            alert("La data di check-in e quella di check-out non possono coincidere. Seleziona una data valida.");
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
        document.getElementById("costoTasse").textContent = `${costoTasseTotale}€`;
        document.getElementById("costoTotale").textContent = `${costoTotale}€`;
    }
}

////////////////Gestione OSPITI//////////////////////////////////
const outputInput = document.getElementById("dropdownForm");
const nomeRows = document.querySelectorAll(".nomeRow");

nomeRows.forEach((row) => {
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
        let adulti = 0,
            bambini = 0,
            neonati = 0,
            animali = 0;

        nomeRows.forEach((r) => {
            const tipo = r.getAttribute("data-type");
            const numSpan = r.closest("li").querySelector(".num");
            const val = parseInt(numSpan.textContent, 10);

            if (tipo === "adulti") adulti = val;
            if (tipo === "bambini") bambini = val;
            if (tipo === "neonati") neonati = val;
            if (tipo === "animali") animali = val;
        });

        let parts = [];
        const totalePersone = adulti + bambini;

        if (totalePersone > 0) parts.push(`${totalePersone} ${totalePersone === 1 ? "ospite" : "ospiti"}`);
        if (animali > 0) parts.push(`${animali} ${animali === 1 ? "animale" : "animali"}`);
        if (neonati > 0) parts.push(`${neonati} ${neonati === 1 ? "neonato" : "neonati"}`);

        const testoFinale = parts.length > 0 ? parts.join(", ") : "Aggiungi ospiti";

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

///////////// MAPPA /////////////
document.addEventListener("DOMContentLoaded", function () {
    const map = L.map("map").setView([45.449, 9.17], 15);
    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    const iconaPosizioneVerificata = L.icon({
        iconUrl: "assets/posizione-verificata.png",
        iconSize: [175.824, 105.312],
        iconAnchor: [87, 40],
    });

    L.marker([45.449, 9.17], { icon: iconaPosizioneVerificata }).addTo(map);
});

////Funzione per pop up "Altri servizi"///////////
let serviziButton = document.getElementById("altri-servizi");
console.log(serviziButton);
let modal = document.getElementById("modal");
console.log(modal);
let closeButton = document.getElementById("close-button");
console.log(closeButton);

serviziButton.addEventListener("click", () => {
    modal.classList.remove("hidden");
});
closeButton.addEventListener("click", () => {
    modal.classList.add("hidden");
});

//Chiudi cliccando fuori dal contenuto
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.add("hidden");
    }
});

////Funzione per pop up "PAGAMENTO"///////////
let pagamentoButton = document.getElementById("buttonPrenota");
let modalPagamento = document.getElementById("creditCard");
let chiudiPagamento = document.getElementById("closeButtonCard");

pagamentoButton.addEventListener("click", () => {
    modalPagamento.classList.remove("hidden");
});
chiudiPagamento.addEventListener("click", () => {
    modalPagamento.classList.add("hidden");
});

//Chiudi cliccando fuori dal contenuto
window.addEventListener("click", (e) => {
    if (e.target === modalPagamento) {
        modalPagamento.classList.add("hidden");
    }
});
