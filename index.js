function scrollCarousel(direction) {
    const container = document.getElementById('carousel1');
    const scrollAmount = container.offsetWidth * 0.8; 
    container.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

function scrollCarousel2(direction) {
    const container = document.getElementById('carousel2');
    const scrollAmount = container.offsetWidth * 0.8; 
    container.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

function scrollCarousel3(direction) {
    const container = document.getElementById('carousel3');
    const scrollAmount = container.offsetWidth * 0.8; 
    container.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

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