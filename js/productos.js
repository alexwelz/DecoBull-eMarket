const products = [
    {
        id: "product-taza-destacado",
        link: "pages/taza-chica.html",
        imgSrc: "assets/img/tazas/taza5.jpg",
        alt: "Taza",
        title: "Taza",
        price: "$8.500"
    },
    {
        id: "product-juegos-destacado",
        link: "pages/juegos.html",
        imgSrc: "assets/img/juegos/juego.jpg",
        alt: "Juegos bowls y tazas",
        title: "Juegos bowls y tazas",
        price: "$25.000"
    },
    {
        id: "product-bandeja-destacado",
        link: "pages/budinera.html",
        imgSrc: "assets/img/budinera/Budinera.jpg",
        alt: "Bandeja",
        title: "Bandeja",
        price: "$10.000"
    },
    {
        id: "product-budinera-horno-destacado",
        link: "pages/budinera-horno.html",
        imgSrc: "assets/img/budinera/budinera4.jpg",
        alt: "Budinera",
        title: "Budinera",
        price: "$10.000"
    },
    {
        id: "product-jarra-destacado",
        link: "pages/jarra.html",
        imgSrc: "assets/img/jarras/jarra.jpg",
        alt: "Jarra",
        title: "Jarra",
        price: "$15.000"
    }
];

const cardsContainer = document.getElementById('cards-container');

products.forEach(product => {
    const article = document.createElement('article');
    article.className = 'article-card';
    article.id = product.id;

    article.innerHTML = `
        <div>
            <a href="${product.link}"><img src="${product.imgSrc}" alt="${product.alt}" class="article-img"></a>
            <button class="add-cart">
                <i class="fa-solid fa-cart-plus"></i>
            </button>
        </div>
        <h3 class="item-title">${product.title}</h3>
        <p class="item-price">${product.price}</p>
    `;

    cardsContainer.appendChild(article);
});