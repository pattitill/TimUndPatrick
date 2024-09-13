// Hardcoded username sowie password
const validUsername = 'hacker';
const validPassword = '123';

// elemente von DOM
const loginButton = document.getElementById('login');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const messageDisplay = document.getElementById('message');

// click event listener
loginButton.addEventListener('click', function () {
    // Get user input values
    const enteredUsername = usernameInput.value;
    const enteredPassword = passwordInput.value;

    // ueberprueft username, momentan noch hardcoded
    if (enteredUsername === validUsername && enteredPassword === validPassword) {
        //messag bei erfolgreichem login
        messageDisplay.textContent = 'Login erfolgreich! Du wirst weitergeleitet...';
        messageDisplay.style.color = 'green';

        // weiterleitung zur menu page mit 1 sekunde wartezeit
        setTimeout(function () {
            loginUser(enteredUsername);
            window.location.href = '../menu/menu.html';
        }, 1000);
    } else {
        //errormessage für falsche eingabe
        messageDisplay.textContent = 'Benutzername oder Passwort ist falsch.';
        messageDisplay.style.color = 'red';
    }
});

//anmeldebutton wird aktiviert/deaktiviert je nach ausgefuelltheit der eingabefelder
function toggleLoginButton() {
    if (usernameInput.value && passwordInput.value) {
        loginButton.disabled = false;
    } else {
        loginButton.disabled = true;
    }
}

function loginUser(username) {
    // user wird in lcoal storage geparkt
    localStorage.setItem('currentUser', username);

    // user wird in konsole geloggt
    console.log(`${username} eingeloggt`);
}

usernameInput.addEventListener('input', toggleLoginButton);
passwordInput.addEventListener('input', toggleLoginButton);

// login button deaktivieren und storage raeumen
localStorage.clear();
console.log('localStorage geleert');
toggleLoginButton();
