'use strict';

var API_URL = 'https://futbolle-daw-uai-2026.onrender.com/api/players';

function getRandomPlayer(callbackSuccess, callbackError) {
    fetch(API_URL + '/random')
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Error al obtener jugador secreto.');
            }
            return response.json();
        })
        .then(function (data) {
            callbackSuccess(data);
        })
        .catch(function (error) {
            callbackError(error.message);
        });
}

function searchPlayers(query, callbackSuccess, callbackError) {
    fetch(API_URL + '/search?q=' + encodeURIComponent(query) + '&limit=8')
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Error en la búsqueda de jugadores.');
            }
            return response.json();
        })
        .then(function (data) {
            callbackSuccess(data);
        })
        .catch(function (error) {
            callbackError(error.message);
        });
}