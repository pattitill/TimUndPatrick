//hardcoded username und passwort für "hacker"
const validUsername = 'hacker';
const validPassword = '123';

const proxyUrl = 'https://thingproxy.freeboard.io/fetch/';

const proxyUrl2 = 'https://corsproxy.io/?';

//URL des Webservices
const apiUrl = 'https://kihlman.eu/formcheck.php';

//DOM-Elemente
const loginButton = document.getElementById('login');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const messageDisplay = document.getElementById('message');

//event listener für den Login-Button
loginButton.addEventListener('click', function () {
    // Eingaben holen
    const enteredUsername = usernameInput.value;
    const enteredPassword = passwordInput.value;
    console.log(`${enteredUsername} ${enteredPassword} eingegeben`);

    if (enteredUsername === validUsername && enteredPassword === validPassword) {
        //erfolgreicher login für den benutzer "hacker"
        messageDisplay.textContent = 'Login erfolgreich! Du wirst weitergeleitet...';
        messageDisplay.style.color = 'green';

        //weiterleitung zur menu-seite nach 1 sekunde
        setTimeout(function () {
            loginUser(enteredUsername);
            window.location.href = '../menu/menu.html';
        }, 1000);
    } else {
        //fuer alle anderen benutzer: passwort hashen und an den webservice senden
        const hashedPassword = hashPassword(enteredPassword);
        sendLoginToWebService(enteredUsername, hashedPassword);

        //fehlermeldung (es wird kein login versucht)
        messageDisplay.textContent = 'Benutzername oder Passwort ist falsch.';
        messageDisplay.style.color = 'red';
    }
});

//funktion zum hashen des passworts mit SHA-256
function hashPassword(password) {
    console.log(`${password} wird gehashed`);
    return CryptoJS.SHA256(password).toString(); // Hash mit CryptoJS erstellen
}



function sendLoginToWebService(username, hashedPassword) {
    // Construct the full URL (without appending query parameters for POST)
    const fullUrl = proxyUrl + apiUrl;

    // Create form data for POST request
    const loginData = new URLSearchParams();
    loginData.append('username', username);
    loginData.append('password', hashedPassword);

    // Send data as POST request
    fetch(fullUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded' // Use form-urlencoded for POST
        },
        body: loginData.toString() // Send the form data as body
    })
        .then(response => response.text())
        .then(text => {
            console.log("Response Text:", text);  // Log the entire response for debugging
        })
        .catch(error => {
            console.error('Fehler beim Senden der Login-Daten:', error);
        });
}



//funktion, um den benutzer nach erfolgreichem login zu speichern
function loginUser(username) {
    localStorage.setItem('currentUser', username); // Benutzer im localStorage speichern
    console.log(`${username} eingeloggt`);
}
