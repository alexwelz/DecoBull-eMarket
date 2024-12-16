const review = [
    {
        name: "Lucia",
        comment1: "Excelente atención!",
        comment2: "Los productos llegaron en tiempo y forma."
    },
    {
        name: "Vigo",
        comment1: "Compre para reglar!",
        comment2: "Super contentos estaban, muy buena compra."
    },
    {
        name: "Paula",
        comment1: "Amo los productos!",
        comment2: "Son bellísimos, ya compre varios."
    },
    {
        name: "Belen",
        comment1: "Todo perfecto! super recomendables.",
        comment2: "Ya vengo comprandole hace tiempo."
    }
];

const reviewContainer = document.querySelector('.reseñas-container');
review.forEach(review => {
    const reviewCard = document.createElement('div');
    reviewCard.className = 'reseñas-card';

    reviewCard.innerHTML = `
        <h3>${review.name}</h3>
        <p>${review.comment1}</p>
        <p>${review.comment2}</p>
    `;

    reviewContainer.appendChild(reviewCard);
});

