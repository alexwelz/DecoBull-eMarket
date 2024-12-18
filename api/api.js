

const contenedorPersonajes = document.querySelector('.swiper-wrapper'); 
const estrellasPorTestimonio = [5, 4, 5, 4, 5]; 

fetch("https://rickandmortyapi.com/api/character")
    .then(response => response.json())
    .then(datos => {
        datos.results.forEach((elementos, index) => {
            const contenedorCreado = document.createElement('div');
            contenedorCreado.classList.add('swiper-slide', 'testimonials-item');
      
            const rating = estrellasPorTestimonio[index % estrellasPorTestimonio.length]; 
            const estrellas = Array.from({ length: 5 }, (_, i) => {
                return i < rating ? '<i class="fa fa-star"></i>' : '<i class="fa fa-star-o"></i>'; 
            }).join('');

            contenedorCreado.innerHTML = `
                <div class="info">
                    <img src="${elementos.image}" alt="img">
                    <div class="text-box">
                        <h3 class="name">${elementos.name}</h3>
                    </div>
                </div>
                <p>Muy buenos productos! Me encantaron y voy a seguir comprando para sorprender a mis compañeros de trabajo de rick and morty</p> 
                <div class="rating">
                    ${estrellas} 
                </div>
            `;

            contenedorPersonajes.append(contenedorCreado);
        });
    })
    .catch(error => console.error('Error al cargar los datos:', error));


const swiper = new Swiper('.js-testimonials-slider', {
    grabCursor: true,
    spaceBetween: 30,
    pagination: {
        el: '.js-testimonials-pagination', 
        clickable: true
    },
    breakpoints: { 
        767: {
            slidesPerView: 2 
        }
    }
});