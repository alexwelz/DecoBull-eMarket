const form = document.querySelector('form');

form.addEventListener('submit', function(event) {

    event.preventDefault();

    const name = form.querySelector('input[name="name"]');
    const email = form.querySelector('input[name="email"]');
    const number = form.querySelector('input[name="number"]');
    const comments = form.querySelector('textarea[name="comments"]');

    if (name.value.trim() === '' || email.value.trim() === '' || comments.value.trim() === '') {
        console.log('Por favor, completa todos los campos requeridos.');
    } else {
        console.log('Se envió el formulario con éxito!');
        form.submit();
    }
});