# Futbolle - Proyecto Final Individual (DAW 2026)

**Universidad Abierta Interamericana (UAI)**  
**Materia:** Desarrollo y Arquitecturas Web  
**Estudiante:** Jerónimo Laborda  

---

## 📌 Descripción del Proyecto
**Futbolle** es un juego interactivo de adivinanza estilo *Wordle* enfocado en jugadores de fútbol. El sistema selecciona un jugador secreto aleatorio consumiendo la API de la cátedra, y el usuario debe adivinar de quién se trata dentro de un límite de 8 intentos. 

Por cada intento realizado, la aplicación proporciona retroalimentación visual comparando los atributos del jugador ingresado contra el jugador secreto (Nacionalidad, Club, Posición, Edad, Overall y Altura).

---

## 🚀 Links del Proyecto
* **Juego en Vivo (GitHub Pages):** [https://labordajeronimo.github.io/futbolle-uai/](https://labordajeronimo.github.io/futbolle-uai/)
* **Repositorio de Código Fuente:** [https://github.com/labordajeronimo/futbolle-uai](https://github.com/labordajeronimo/futbolle-uai)

---

## 🛠️ Tecnologías Utilizadas y Estándares de Código
- **HTML5 & CSS3:** Maquetación semántica y diseño responsivo implementado exclusivamente con **Flexbox**.
- **ES5 Estricto (`'use strict'`):** Desarrollo JavaScript bajo norma estricta ES5 (uso exclusivo de `var`, funciones tradicionales y sin inyección directa de HTML).
- **Consumo de API REST:** Peticiones asíncronas con `fetch` hacia los endpoints del backend de la cátedra para búsqueda con autocompletado y selección de jugador aleatorio.
- **Normalización Estilística:** Integración de `normalize.css` para consistencia cross-browser.
- **Persistencia de Datos:** Almacenamiento de historial de partidas jugadas mediante `LocalStorage`.

---

## 🎮 Características del Juego
- **Selector de Dificultad:** 
  - *Fácil:* Muestra la foto del jugador secreto con desenfoque progresivo (blur) tras cada intento.
  - *Medio/Difícil:* Pistas limitadas y ocultamiento de imagen.
- **Modo Claro / Oscuro:** Alternancia dinámica de temas visuales mediante manipulación de clases en el DOM.
- **Formulario de Contacto:** Validación cliente con JavaScript nativo y redirección predeterminada `mailto:`.
- **Modales Customizados:** Manejo de avisos, victoria/derrota e historial sin uso de alertas bloqueantes (`alert()`).