document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('login_success'));

    const loginButton = document.querySelector('#loginButton');
    const signupButton = document.querySelector('#signupButton');
    const userNameSpan = document.querySelector('#userNameSpan');
    const logoutButton = document.querySelector('#logoutButton');
    const modal = document.querySelector('#logoutModal');
    const confirmLogout = document.querySelector('#confirmLogout');
    const cancelLogout = document.querySelector('#cancelLogout');

    if (loggedInUser) {
        if (loginButton) loginButton.style.display = 'none';
        if (signupButton) signupButton.style.display = 'none';
        if (logoutButton) logoutButton.style.display = 'block';

        if (userNameSpan) userNameSpan.textContent = loggedInUser.name;
    } else {
        if (loginButton) loginButton.style.display = 'block';
        if (signupButton) signupButton.style.display = 'block';
        if (logoutButton) logoutButton.style.display = 'none';
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            modal.style.display = 'flex';
        });
    }

    confirmLogout.addEventListener('click', () => {
        modal.style.display = 'flex';
        localStorage.removeItem('login_success');
        alert("Espero verte pronto!")
        window.location.href = '../index.html';
    });

    cancelLogout.addEventListener('click', () => {
        modal.style.display = 'none';
    });
});



let count = localStorage.getItem('cartCount') ? parseInt(localStorage.getItem('cartCount')) : 0;
document.querySelector('.count_cart').textContent = count;

function count_cart(command) {
    if (command === 'add') {
        count++;
        document.querySelector('.count_cart').textContent = count;
    }
    if (command === 'remove') {
        localStorage.setItem('cartCount', count);
        localStorage.getItem('cartCount') ? count = parseInt(localStorage.getItem('cartCount')) : 0;
        if (count > 0) count--;
        localStorage.setItem('cartCount', count);
        document.querySelector('.count_cart').textContent = count;
    }
    if (command === 'show') {
        localStorage.getItem('cartCount') ? count = parseInt(localStorage.getItem('cartCount')) : 0;
        document.querySelector('.count_cart').textContent = count;
    }
}



let btnAddtoCart = document.querySelectorAll(".add-cart");

btnAddtoCart.forEach(button => {
    button.addEventListener("click", function(event) {
      
        let item = button.closest('.article-card');
        console.log(item);
        if (!item) return;

        let id = item.id;
        let title = item.querySelector('.item-title').innerText;
        let price = item.querySelector('.item-price').innerText;
        let imageSrc = item.querySelector('.article-img').src;

        addItemToCart(id, title, price, imageSrc);
    });
});

     
function addItemToCart(id, title, price, imageSrc) {
    let amount = 1;
    let item = {id, title, price, imageSrc, amount};
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            alert("El producto ya se encuentra en el carrito");
            return;
        }
    }

    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    count_cart('add');
}


document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.getElementById("cart-items-container");

    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    console.log("Cart items:", cartItems);

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = "<p>No hay productos seleccionados.</p>";
   
    } else {
        cartItems.forEach(item => {
            console.log("item:", item);
            const cartItemElement = document.createElement("div");
            cartItemElement.classList.add("cart-item");

            cartItemElement.innerHTML = `
                <img src="${item.imageSrc}" alt="${item.title}" width="80px" id="${item.id}">
                <div class="carrito-item-detalles">
                    <span class="cart-item-title">${item.title}</span>
                    <div class=".quantity-selector">
                        <i class="fa-solid fa-minus subtract-quantity"></i>
                        <input type="text" value="${item.amount}" class="cart-item-quantity" disabled>
                        <i class="fa-solid fa-plus add-quantity"></i>
                    </div>
                    <span class="cart-item-price">${item.price}</span>
                </div>
                 <span class="btn-delete" onclick="deleteItemCart()">
                    <i class="fa-solid fa-trash"></i>
                </span>
            `;

            cartItemsContainer.appendChild(cartItemElement);
        });

    }
});



