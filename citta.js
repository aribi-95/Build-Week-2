document.addEventListener("DOMContentLoaded", function () {
    // Prendo gli elementi HTML con gli appartamenti
    const copiaAppartamento = (n) => {
        const el = document.getElementById(`appartamento${n}`);
        if (!el) return "";
        const card = el.closest(".cardAppartamentoCitta");
        if (!card) return "";
        return card.innerHTML.replaceAll(`appartamento${n}`, `appart${n}`);
    };

    const appartamenti = [
        { id: 1, coord: [45.602, 8.925], prezzo: "84 €" },
        { id: 2, coord: [45.449, 9.17], prezzo: "198 €" },
        { id: 3, coord: [45.45, 9.21], prezzo: "152 €" },
        { id: 4, coord: [45.471, 9.186], prezzo: "220 €" },
        { id: 5, coord: [45.476, 9.153], prezzo: "320 €" },
        { id: 6, coord: [45.487, 9.193], prezzo: "165 €" },
    ].map((ap) => ({
        ...ap,
        popup: copiaAppartamento(ap.id),
    }));

    // Mappa Desktop
    const mapDesktop = L.map("mapDesktop").setView([45.533, 9.07], 10);
    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        attribution: "&copy; OpenStreetMap contributors",
    }).addTo(mapDesktop);

    appartamenti.forEach((ap) => {
        const icona = L.divIcon({
            className: "iconaPrezzo",
            html: `<div class='contenutoIcona'>${ap.prezzo}</div>`,
            iconAnchor: [25, 0],
        });
        L.marker(ap.coord, { icon: icona }).addTo(mapDesktop).bindPopup(ap.popup);
    });

    // Mappa Mobile
    let mapMobile = null;
    const openMapBtn = document.getElementById("openMapButton");
    const closeMapBtn = document.getElementById("closeMapButton");
    const hiddenMap = document.getElementById("hiddenMap");

    openMapBtn.addEventListener("click", () => {
        hiddenMap.classList.remove("d-none");
        setTimeout(() => {
            if (!mapMobile) {
                mapMobile = L.map("mapMobile").setView([45.533, 9.07], 10);
                L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
                    attribution: "&copy; OpenStreetMap contributors",
                }).addTo(mapMobile);

                appartamenti.forEach((ap) => {
                    const icona = L.divIcon({
                        className: "iconaPrezzo",
                        html: `<div class='contenutoIcona'>${ap.prezzo}</div>`,
                        iconAnchor: [25, 0],
                    });
                    L.marker(ap.coord, { icon: icona }).addTo(mapMobile).bindPopup(ap.popup);
                });
            } else {
                mapMobile.invalidateSize();
            }
        }, 100);
    });

    closeMapBtn.addEventListener("click", () => {
        hiddenMap.classList.add("d-none");
    });
});
