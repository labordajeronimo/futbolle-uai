'use strict';

function createAttributeBox(value, isCorrect, arrowSymbol) {
    var box = document.createElement('div');
    var textNode = document.createTextNode(value + (arrowSymbol ? ' ' + arrowSymbol : ''));
    
    box.className = 'attribute-box ' + (isCorrect ? 'bg-correct' : 'bg-incorrect');
    box.appendChild(textNode);
    return box;
}

function renderAttemptRow(container, guessPlayer, secretPlayer) {
    var row = document.createElement('div');
    row.className = 'attempt-row';

    row.appendChild(createAttributeBox(guessPlayer.nationality, guessPlayer.nationality === secretPlayer.nationality, ''));

    row.appendChild(createAttributeBox(guessPlayer.club, guessPlayer.club === secretPlayer.club, ''));

    row.appendChild(createAttributeBox(guessPlayer.position, guessPlayer.position === secretPlayer.position, ''));

    var ageArrow = '';
    if (guessPlayer.age < secretPlayer.age) {
        ageArrow = '↑';
    } else if (guessPlayer.age > secretPlayer.age) {
        ageArrow = '↓';
    }
    row.appendChild(createAttributeBox(guessPlayer.age + ' años', guessPlayer.age === secretPlayer.age, ageArrow));

    var overallArrow = '';
    if (guessPlayer.overall < secretPlayer.overall) {
        overallArrow = '↑';
    } else if (guessPlayer.overall > secretPlayer.overall) {
        overallArrow = '↓';
    }
    row.appendChild(createAttributeBox(guessPlayer.overall, guessPlayer.overall === secretPlayer.overall, overallArrow));

    var heightArrow = '';
    if (guessPlayer.heightCm < secretPlayer.heightCm) {
        heightArrow = '↑';
    } else if (guessPlayer.heightCm > secretPlayer.heightCm) {
        heightArrow = '↓';
    }
    row.appendChild(createAttributeBox(guessPlayer.heightCm + ' cm', guessPlayer.heightCm === secretPlayer.heightCm, heightArrow));

    container.appendChild(row);
}