const countries = [
    { name: 'Norway', score: 99 },
    { name: 'Sweden', score: 98 },
    { name: 'Finland', score: 97 },
    { name: 'Denmark', score: 96 },
    { name: 'Netherlands', score: 95 },
    { name: 'Canada', score: 94 },
    { name: 'New Zealand', score: 93 },
    { name: 'Jamaica', score: 92 },
    { name: 'Costa Rica', score: 91 },
    { name: 'Switzerland', score: 90 }
];

let country1Index = 0;
let country2Index = 1;
let score = 0;

function startGame() {
    score = 0;
    document.getElementById('result-message').classList.add('hidden');
    document.getElementById('restart-button').classList.add('hidden'); // Hide Restart button at the start
    document.getElementById('game-container').classList.remove('incorrect'); // Remove any incorrect background
    displayCountries();
}

function displayCountries() {
    const country1 = countries[country1Index];
    const country2 = countries[country2Index];
    document.getElementById('country1-name').innerText = country1.name;
    document.getElementById('country1-score').innerText = country1.score; // Always show score of Country A
    document.getElementById('country2-name').innerText = country2.name;
    document.getElementById('country2-score').innerText = country2.score;
    document.getElementById('country2-score').classList.add('hidden'); // Hide score of Country B
}

function makeGuess(selectedCountry) {
    const country1 = countries[country1Index];
    const country2 = countries[country2Index];
    const correctCountry = country1.score > country2.score ? 'country1' : 'country2';

    document.getElementById('country2-score').classList.remove('hidden'); // Reveal Country B's score after guess

    if (selectedCountry === correctCountry) {
        score++;
        document.getElementById('result-message').innerText = 'Correct! Your score is: ' + score;
        document.getElementById('result-message').classList.remove('hidden');
        setTimeout(nextRound, 1000); // Automatically go to next round after 1 second
    } else {
        document.getElementById('result-message').innerText = 'Wrong! Game Over. Your score was: ' + score;
        document.getElementById('result-message').classList.remove('hidden');
        document.getElementById('game-container').classList.add('incorrect'); // Add red background
        disableButtons();
        document.getElementById('restart-button').classList.remove('hidden'); // Show Restart button
    }
}

function disableButtons() {
    document.querySelectorAll('.game-button').forEach(button => {
        button.disabled = true;
    });
}

function nextRound() {
    country1Index = country2Index;
    country2Index = (country2Index + 1) % countries.length;

    if (country1Index === country2Index) {
        document.getElementById('result-message').innerText = 'You have reached the end! Final score: ' + score;
        disableButtons();
        return;
    }

    document.querySelectorAll('.game-button').forEach(button => {
        button.disabled = false;
    });

    displayCountries();
}

function restartGame() {
    window.location.href = 'game.html'; // Go back to the menu
}

function goToMenu() {
    window.location.href = '../menu/menu.html'; // Go back to the menu
}

window.onload = startGame;
