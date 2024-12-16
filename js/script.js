document.addEventListener("DOMContentLoaded", function () {
  
    const loggedInUser  = JSON.parse(localStorage.getItem('login_success'));
    const loginButton = document.querySelector('#loginButton');
    const signupButton = document.querySelector('#signupButton');
    const userNameSpan = document.querySelector('#userNameSpan');
    const logoutButton = document.querySelector('#logoutButton');
    const modal = document.querySelector('#logoutModal');
    const confirmLogout = document.querySelector('#confirmLogout');
    const cancelLogout = document.querySelector('#cancelLogout');

    if (loggedInUser ) {
        if (loginButton) loginButton.style.display = 'none';
        if (signupButton) signupButton.style.display = 'none';
        if (logoutButton) logoutButton.style.display = 'block';
        if (userNameSpan) userNameSpan.textContent = loggedInUser .name;
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
        localStorage.removeItem('cart');
        count = 0; 
        updateCartCount();
        alert("Espero verte pronto!");
        window.location.href = '../index.html';
        modal.style.display = 'none';
    });

    cancelLogout.addEventListener('click', () => {
        modal.style.display = 'none';
    });



    //Cart
    const cartItemsContainer = document.getElementById("cart-items-container");

    if (!cartItemsContainer) {
        console.error("El contenedor de artículos del carrito no se encontró.");
        return; 
    }


    if (window.location.pathname.includes("carrito.html")) {
       
        let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        console.log("Cart items:", cartItems);

        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = "<p>No hay productos seleccionados.</p>";
        } else {
            cartItems.forEach(item => {
                const cartItemElement = document.createElement("div");
                cartItemElement.classList.add("cart-item");

                cartItemElement.innerHTML = `
                    <img src="${item.imageSrc}" alt="${item.title}" width="80px" id="${item.id}">
                    <div class="carrito-item-detalles">
                        <span class="cart-item-title">${item.title}</span>
                        <div class="quantity-selector">
                            <i class="fa-solid fa-minus subtract-quantity"></i>
                            <input type="text" value="${item.amount}" class="cart-item-quantity" disabled>
                            <i class="fa-solid fa-plus add-quantity"></i>
                        </div>
                        <span class="cart-item-price">${item.price}</span>
                    </div>
                    <span class="btn-delete">
                        <i class="fa-solid fa-trash"></i>
                    </span>
                `;

                cartItemsContainer.appendChild(cartItemElement);
            });
            
            updateTotalCart();
        }
    }


    ready();
});


function ready() {
    let buttonDeleteItem = document.getElementsByClassName('btn-delete');
    for (var i = 0; i < buttonDeleteItem.length; i++) {
        let button = buttonDeleteItem[i];
        button.addEventListener('click', deleteItemCart);
    }

    let buttonaddQuantity = document.getElementsByClassName('add-quantity');
    for (var i = 0; i < buttonaddQuantity.length; i++) {
        let button = buttonaddQuantity[i];
        button.addEventListener('click', addQuantity);
    }

    let buttonResetAmount = document.getElementsByClassName('subtract-quantity');
    for (var i = 0; i < buttonResetAmount.length; i++) {
        let button = buttonResetAmount[i];
        button.addEventListener('click', subtractAmount);
    }

}

let count = localStorage.getItem('cartCount') ? parseInt(localStorage.getItem('cartCount')) : 0;
document.querySelector('.count_cart').textContent = count;

function updateCartCount() {
    localStorage.setItem('cartCount', count);
    document.querySelector('.count_cart').textContent = count;
}

function count_cart(command) {
    if (command === 'add') {
        count++;
        updateCartCount();
    }
    if (command === 'remove') {
         if (count > 0) count--;
        updateCartCount();
    }
    if (command === 'show') {
        document.querySelector('.count_cart').textContent = count;
    }
}

window.onload = function() {
    count_cart('show');
};


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


function deleteItemCart(event) {
    let buttonClicked = event.target;
    let itemCart = buttonClicked.closest('.cart-item');
    let itemId = itemCart.querySelector('img').id;
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems = cartItems.filter(item => item.id !== itemId);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    if (itemCart) {
        itemCart.remove();
    }
    count_cart('remove');
    updateTotalCart();
}



function updateTotalCart() {
    let containerCart = document.getElementsByClassName('cart')[0];
    let cartItems = containerCart.getElementsByClassName('cart-item');
    let total = 0;

    for (var i = 0; i < cartItems.length; i++) {
        let item = cartItems[i];
        let elementPrice = item.getElementsByClassName('cart-item-price')[0];
        let price = parseFloat(elementPrice.innerText.replace('$', '').replace('.', ''));
        let amountItem = item.getElementsByClassName('cart-item-quantity')[0];
        let amount = amountItem.value;

        total += price * amount;
    }

    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-price-total')[0].innerText = '$' + total.toLocaleString("es") + ',00';
}

function addQuantity(event) {
    let buttonClicked = event.target;
    let selector = buttonClicked.parentElement;
    let currentAmount = selector.getElementsByClassName('cart-item-quantity')[0].value;
    currentAmount++;
    selector.getElementsByClassName('cart-item-quantity')[0].value = currentAmount;
    updateTotalCart();
}

function subtractAmount(event) {
    let buttonClicked = event.target;
    let selector = buttonClicked.parentElement;
    let currentAmount = selector.getElementsByClassName('cart-item-quantity')[0].value;
    currentAmount--;

    if (currentAmount >= 1) {
        selector.getElementsByClassName('cart-item-quantity')[0].value = currentAmount;
        updateTotalCart();
    }
}



let buttonPay = document.getElementById("pay");
console.log(buttonPay);

buttonPay.addEventListener("click", function() {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    if (cartItems.length === 0) {
    
        Swal.fire({
            icon: "warning",
            title: "Carrito vacío",
            text: "No hay productos en tu carrito.",
            showConfirmButton: false,
            timer: 1500
        });
    } else {
  
        Swal.fire({
            icon: "success",
            title: "Tu compra se ha realizado con éxito!",
            showConfirmButton: false,
            timer: 1500
        });
        
    }
});



