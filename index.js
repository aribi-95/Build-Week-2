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