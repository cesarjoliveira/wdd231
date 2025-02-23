const currentyear = document.querySelector(".currentyear");
const lastModified = document.querySelector(".lastModified");

if (currentyear) {
    currentyear.textContent = new Date().getFullYear();
}

if (lastModified) {
    lastModified.textContent = `Last Modified: ${document.lastModified}`;
}
const nav = document.querySelector('#navigation')
const button = document.querySelector('#menu');

button.addEventListener('click', () => {
    nav.classList.toggle('show');
    button.classList.toggle('show');
});

const cardsContainer = document.querySelector('.cards-container');
const visitMessage = document.querySelector(".visit-message");


fetch('data/items.json')
    .then(response => response.json())
    .then(items => {
        items.forEach((item, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.style.gridArea = `card${index + 1}`; 

            
            card.innerHTML = `
                <h2>${item.name}</h2>
                <figure>
                    <img src="${item.image}" alt="${item.name}">
                </figure>
                <address>${item.address}</address>
                <p>${item.description}</p>
                <button>Learn More</button>
            `;
            
            cardsContainer.appendChild(card);
        });
    })
    .catch(error => console.log('Erro ao carregar itens:', error));


const lastVisit = localStorage.getItem("lastVisit");

const now = Date.now();
localStorage.setItem("lastVisit", now);

if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const diffInMs = now - parseInt(lastVisit);
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
        visitMessage.textContent = `Back so soon! you last visit was ${diffInDays} days ago!`;
    } else if (diffInDays === 1) {
        visitMessage.textContent = `You last visited 1 day ago.`;
    } else {
        visitMessage.textContent = `You last visited ${diffInDays} days ago.`;
    }
}