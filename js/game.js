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
var containerSecretPhoto = document.getElementById('container-secret-photo');

// Botones del Header e Historial
var btnThemeToggle = document.getElementById('btn-theme-toggle');
var btnHistory = document.getElementById('btn-history');
var modalHistory = document.getElementById('modal-history');
var btnCloseHistory = document.getElementById('btn-close-history');
var listHistory = document.getElementById('list-history');
var btnSortDate = document.getElementById('btn-sort-date');
var btnSortAttempts = document.getElementById('btn-sort-attempts');

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

function saveGameToHistory(won) {
    var historyData = JSON.parse(localStorage.getItem('futbolle_history') || '[]');
    var newRecord = {
        player: userName,
        result: won ? 'Ganó' : 'Perdió',
        attempts: 8 - attemptsLeft,
        duration: displayTimer.textContent,
        date: new Date().toLocaleString()
    };
    historyData.push(newRecord);
    localStorage.setItem('futbolle_history', JSON.stringify(historyData));
}

function renderHistory(sortBy) {
    var historyData = JSON.parse(localStorage.getItem('futbolle_history') || '[]');
    listHistory.innerHTML = '';

    if (historyData.length === 0) {
        listHistory.innerHTML = '<li>No hay partidas registradas aún.</li>';
        return;
    }

    if (sortBy === 'attempts') {
        historyData.sort(function (a, b) {
            return a.attempts - b.attempts;
        });
    }

    for (var i = 0; i < historyData.length; i++) {
        var item = historyData[i];
        var li = document.createElement('li');
        li.textContent = item.date + ' - ' + item.player + ' (' + item.result + ') | Intentos: ' + item.attempts + ' | Tiempo: ' + item.duration;
        listHistory.appendChild(li);
    }
}

function updatePhotoBlur() {
    if (difficultyLevel === 'easy') {
        containerSecretPhoto.classList.remove('is-hidden');
        imgSecretPlayer.className = 'secret-photo blur-level-' + (attemptsLeft * 2);
    } else {
        containerSecretPhoto.classList.add('is-hidden');
    }
}

function initGame() {
    attemptsLeft = 8;
    attemptsHistory = [];
    containerAttempts.innerHTML = '';
    displayAttempts.textContent = attemptsLeft;
    inputSearchPlayer.value = '';
    
    updatePhotoBlur();

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

    updatePhotoBlur();

    if (guessPlayer.id === secretPlayer.id) {
        clearInterval(timerInterval);
        saveGameToHistory(true);
        showModal('¡Ganaste!', 'Adivinaste el jugador en ' + (8 - attemptsLeft) + ' intentos.');
        return;
    }

    if (attemptsLeft === 0) {
        clearInterval(timerInterval);
        saveGameToHistory(false);
        showModal('¡Perdiste!', 'El jugador secreto era: ' + secretPlayer.name);
    }
}

// Event Listeners
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

// Cambiar Modo Claro / Oscuro
btnThemeToggle.addEventListener('click', function () {
    if (document.body.classList.contains('theme-dark')) {
        document.body.classList.remove('theme-dark');
        document.body.classList.add('theme-light');
    } else {
        document.body.classList.remove('theme-light');
        document.body.classList.add('theme-dark');
    }
});

// Mostrar y Cerrar Historial
btnHistory.addEventListener('click', function () {
    renderHistory('date');
    modalHistory.classList.remove('is-hidden');
});

btnCloseHistory.addEventListener('click', function () {
    modalHistory.classList.add('is-hidden');
});

btnSortDate.addEventListener('click', function () {
    renderHistory('date');
});

btnSortAttempts.addEventListener('click', function () {
    renderHistory('attempts');
});

// Reiniciar y volver al menú principal para cambiar Dificultad
btnRestart.addEventListener('click', function () {
    clearInterval(timerInterval);
    secGameBoard.classList.add('is-hidden');
    secUserInit.classList.remove('is-hidden');
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