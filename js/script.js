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