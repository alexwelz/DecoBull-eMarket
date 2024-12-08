var cont;
if (localStorage.getItem('cartCount')) {
    cont = parseInt(localStorage.getItem('cartCount'));

} else {
    cont = 0;
}
document.querySelector('.count_cart').textContent = cont;

function count_cart() {
    cont++;
    var countCart = document.querySelector('.count_cart');
    countCart.textContent = cont;

    localStorage.setItem('cartCount', cont);
}