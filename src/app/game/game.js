let currentUser = 'void';
function getCurrentUser() {
    // currentUser wird ausgelesen
    if(localStorage.getItem('currentUser')) {
        currentUser = (localStorage.getItem('currentUser'));
        console.log(`currentUser: ${currentUser}`);
    }
    else {
        console.log('no currentUser');
    }
}
getCurrentUser();
let country1Index, country2Index;
let score = 0;

function startGame() {
    score = 0;
    document.getElementById('result-message').classList.add('hidden'); // Hide Result message at the start
    document.getElementById('restart-button').classList.add('hidden'); // Hide Restart button at the start
    document.getElementById('game-container').classList.remove('incorrect'); // Remove any incorrect background
    randomizeCountries(); // Randomize starting countries
    displayCountries();
}

function randomizeCountries() {
    // Shuffle the countries array
    const shuffledCountries = countries.sort(() => 0.5 - Math.random());

    // Get random indexes for the first two countries
    country1Index = 0; // Always use the first country in the shuffled array
    country2Index = 1; // Always use the second country in the shuffled array
}

function displayCountries() {
    const country1 = countries[country1Index];
    const country2 = countries[country2Index];

    // Update country names
    document.getElementById('country1-name').innerText = country1.name; // Always show name of Country A
    document.getElementById('country1-score').innerText = country1.score; // Always show score of Country A
    document.getElementById('country2-name').innerText = country2.name; // Always show name of Country B
    document.getElementById('country2-score').innerText = country2.score; // Score of Country B
    document.getElementById('country2-score').classList.add('hidden'); // Hide score of Country B

    // Update the button text to display the country names
    document.querySelector('.game-button.country1').innerHTML = ` ${country1.name} <br>has a higher freedom score`;
    document.querySelector('.game-button.country2').innerHTML = ` ${country2.name} <br>has a higher freedom score`;
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
        document.getElementById('game-container').classList.add('correct'); // Add green background
        setTimeout(nextRound, 2000); // Automatically go to next round after 2 seconds
    } else {
        document.getElementById('result-message').innerText = 'Wrong! Game Over. Your score was: ' + score;
        document.getElementById('result-message').classList.remove('hidden');
        document.getElementById('game-container').classList.remove('correct'); // Remove correct background
        document.getElementById('game-container').classList.add('incorrect'); // Add red background

        hideButtons(); // Hide buttons when the guess is wrong
        disableButtons();
        document.getElementById('restart-button').classList.remove('hidden'); // Show Restart button
        if (localStorage.getItem(currentUser)===undefined || localStorage.getItem(currentUser)<score) {   // Überprüft, ob der User einen Highscore hat und wenn ja ob er kleiner oder größer ist als der neue
            localStorage.setItem(currentUser, score); //überschreibt den aktuellen Highscore des Users mit dem neuen
            console.log('score ueberschrieben:'+score);
        }
    }
}

// Function to hide buttons
function hideButtons() {
    document.querySelectorAll('.game-button').forEach(button => {
        button.classList.add('hidden'); // Add hidden class to hide buttons
    });
}

//Function to disable Buttons
function disableButtons() {
    document.querySelectorAll('.game-button').forEach(button => {
        button.disabled = true;
    });
}

function nextRound() {
    country1Index = country2Index;
    country2Index = (country2Index + 1) % countries.length;

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
