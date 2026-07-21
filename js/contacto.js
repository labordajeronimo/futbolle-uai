'use strict';

var formContact = document.getElementById('form-contact');
var inputName = document.getElementById('input-contact-name');
var inputEmail = document.getElementById('input-contact-email');
var inputMessage = document.getElementById('input-contact-message');
var errorBox = document.getElementById('contact-error-box');

function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateAlphanumeric(str) {
    var re = /^[a-zA-Z0-9\s]+$/;
    return re.test(str);
}

formContact.addEventListener('submit', function (e) {
    e.preventDefault();
    
    var nameVal = inputName.value.trim();
    var emailVal = inputEmail.value.trim();
    var msgVal = inputMessage.value.trim();
    var errors = [];

    if (!nameVal || !validateAlphanumeric(nameVal)) {
        errors.push('El nombre debe ser alfanumérico.');
    }

    if (!emailVal || !validateEmail(emailVal)) {
        errors.push('Ingrese un correo electrónico válido.');
    }

    if (msgVal.length <= 5) {
        errors.push('El mensaje debe tener más de 5 caracteres.');
    }

    if (errors.length > 0) {
        errorBox.textContent = errors.join(' ');
        errorBox.classList.remove('is-hidden');
        return;
    }

    errorBox.classList.add('is-hidden');
    // Abrir cliente de email predeterminado
    var mailtoUrl = 'mailto:Tomas.ariaskarle@uai.edu.ar?subject=Contacto Futbolle - ' + encodeURIComponent(nameVal) + '&body=' + encodeURIComponent(msgVal);
    window.location.href = mailtoUrl;
});