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
    document.getElementById('next-round').classList.add('hidden');
    displayCountries();
}

function displayCountries() {
    const country1 = countries[country1Index];
    const country2 = countries[country2Index];
    document.getElementById('country1-name').innerText = country1.name;
    document.getElementById('country1-score').innerText = country1.score;
    document.getElementById('country2-name').innerText = country2.name;
    document.getElementById('country2-score').innerText = country2.score;
    document.getElementById('country1-score').classList.add('hidden');
    document.getElementById('country2-score').classList.add('hidden');
}

function makeGuess(selectedCountry) {
    const country1 = countries[country1Index];
    const country2 = countries[country2Index];
    const correctCountry = country1.score > country2.score ? 'country1' : 'country2';

    document.getElementById('country1-score').classList.remove('hidden');
    document.getElementById('country2-score').classList.remove('hidden');

    if (selectedCountry === correctCountry) {
        score++;
        document.getElementById('result-message').innerText = 'Correct! Your score is: ' + score;
    } else {
        document.getElementById('result-message').innerText = 'Wrong! Game Over. Your score was: ' + score;
        disableButtons();
    }

    document.getElementById('result-message').classList.remove('hidden');
    document.getElementById('next-round').classList.remove('hidden');
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

    document.getElementById('next-round').classList.add('hidden');
    document.querySelectorAll('.game-button').forEach(button => {
        button.disabled = false;
    });

    displayCountries();
}

function goToMenu() {
    window.location.href = '../menu/menu.html'; // Replace 'index.html' with your actual menu page
}

window.onload = startGame;
