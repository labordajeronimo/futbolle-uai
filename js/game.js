'use strict';

var userName = '';
var secretPlayer = null;
var attemptsLeft = 8;
var attemptsHistory = [];
var timerInterval = null;
var secondsElapsed = 0;
var difficultyLevel = 'easy';

// Referencias al DOM
var secUserInit = document.getElementById('sec-user-init');
var secGameBoard = document.getElementById('sec-game-board');
var formUserName = document.getElementById('form-user-name');
var inputUserName = document.getElementById('input-user-name');
var selectDifficulty = document.getElementById('select-difficulty');
var displayPlayerName = document.getElementById('display-player-name');
var displayAttempts = document.getElementById('display-attempts');
var displayTimer = document.getElementById('display-timer');
var inputSearchPlayer = document.getElementById('input-search-player');
var listAutocomplete = document.getElementById('list-autocomplete');
var containerAttempts = document.getElementById('container-attempts');
var modalGameOver = document.getElementById('modal-game-over');
var modalTitle = document.getElementById('modal-title');
var modalMessage = document.getElementById('modal-message');
var btnModalClose = document.getElementById('btn-modal-close');
var btnRestart = document.getElementById('btn-restart');
var imgSecretPlayer = document.getElementById('img-secret-player');

function showModal(title, message) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modalGameOver.classList.remove('is-hidden');
}

function startTimer() {
    clearInterval(timerInterval);
    secondsElapsed = 0;
    timerInterval = setInterval(function () {
        secondsElapsed++;
        var mins = Math.floor(secondsElapsed / 60);
        var secs = secondsElapsed % 60;
        displayTimer.textContent = (mins < 10 ? '0' : '') + mins + ':' + (secs < 10 ? '0' : '') + secs;
    }, 1000);
}

function initGame() {
    attemptsLeft = 8;
    attemptsHistory = [];
    containerAttempts.innerHTML = '';
    displayAttempts.textContent = attemptsLeft;
    inputSearchPlayer.value = '';
    
    getRandomPlayer(
        function (player) {
            secretPlayer = player;
            imgSecretPlayer.src = secretPlayer.photo;
            startTimer();
        },
        function (err) {
            showModal('Error de Red', err);
        }
    );
}

function handleGuess(guessPlayer) {
    // Validar duplicados
    for (var i = 0; i < attemptsHistory.length; i++) {
        if (attemptsHistory[i].id === guessPlayer.id) {
            showModal('Intento Duplicado', 'Ya ingresaste a este jugador en esta partida.');
            return;
        }
    }

    attemptsHistory.push(guessPlayer);
    renderAttemptRow(containerAttempts, guessPlayer, secretPlayer);
    attemptsLeft--;
    displayAttempts.textContent = attemptsLeft;

    // Acierto
    if (guessPlayer.id === secretPlayer.id) {
        clearInterval(timerInterval);
        showModal('¡Ganaste!', 'Adivinaste el jugador en ' + (8 - attemptsLeft) + ' intentos.');
        return;
    }

    // Derrota
    if (attemptsLeft === 0) {
        clearInterval(timerInterval);
        showModal('¡Perdiste!', 'El jugador secreto era: ' + secretPlayer.name);
    }
}

// Event Listeners con sintaxis ES5 pura
formUserName.addEventListener('submit', function (e) {
    e.preventDefault();
    var nameVal = inputUserName.value.trim();
    if (nameVal.length < 3) {
        showModal('Nombre Inválido', 'El nombre debe tener al menos 3 caracteres.');
        return;
    }
    userName = nameVal;
    difficultyLevel = selectDifficulty.value;
    displayPlayerName.textContent = userName;
    
    secUserInit.classList.add('is-hidden');
    secGameBoard.classList.remove('is-hidden');
    initGame();
});

inputSearchPlayer.addEventListener('input', function () {
    var q = inputSearchPlayer.value.trim();
    if (q.length < 2) {
        listAutocomplete.classList.add('is-hidden');
        return;
    }

    searchPlayers(q, function (players) {
        listAutocomplete.innerHTML = '';
        if (players.length === 0) {
            listAutocomplete.classList.add('is-hidden');
            return;
        }

        for (var i = 0; i < players.length; i++) {
            (function (player) {
                var li = document.createElement('li');
                li.className = 'autocomplete-item';
                li.textContent = player.name + ' (' + player.club + ')';
                li.addEventListener('click', function () {
                    inputSearchPlayer.value = '';
                    listAutocomplete.classList.add('is-hidden');
                    handleGuess(player);
                });
                listAutocomplete.appendChild(li);
            })(players[i]);
        }
        listAutocomplete.classList.remove('is-hidden');
    }, function () {});
});

btnModalClose.addEventListener('click', function () {
    modalGameOver.classList.add('is-hidden');
});

btnRestart.addEventListener('click', function () {
    initGame();
});