document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('#signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.querySelector('#name').value;
            const email = document.querySelector('#email').value;
            const password = document.querySelector('#password').value;

            const Users = JSON.parse(localStorage.getItem('users')) || [];
            const isUsersRegistered = Users.find(user => user.email === email);
            if (isUsersRegistered) {
                return alert('El mail ya se encuentra registrado!');
            }

            Users.push({ name: name, email: email, password: password });
            localStorage.setItem('users', JSON.stringify(Users));
            alert('Registro Exitoso!');
            window.location.href = '../pages/login.html';
        });
    }
});