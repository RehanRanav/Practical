let currentIndex = 0;

function showSlide(index) {
    const carousel = document.querySelector('.container-cards');
    const cardWidth = document.querySelector('.card').offsetWidth + 10; // Include margin-right
    const cardsPerPage = 4;
    const newPosition = -index * cardWidth * cardsPerPage;
    carousel.style.transform = `translateX(${newPosition}px)`;
    currentIndex = index;
}

function nextSlide() {
    const totalCards = document.querySelectorAll('.card').length;
    const cardsPerPage = 4;
    currentIndex = (currentIndex + 1) % Math.ceil(totalCards / cardsPerPage);
    showSlide(currentIndex);
    document.querySelector('.nextbtn').style.display = 'none';
    document.querySelector('.prevbtn').style.display = 'block';

}

function prevSlide() {
    const totalCards = document.querySelectorAll('.card').length;
    const cardsPerPage = 4;
    currentIndex = (currentIndex - 1 + Math.ceil(totalCards / cardsPerPage)) % Math.ceil(totalCards / cardsPerPage);
    showSlide(currentIndex);
    document.querySelector('.prevbtn').style.display = 'none';
    document.querySelector('.nextbtn').style.display = 'block';
}

