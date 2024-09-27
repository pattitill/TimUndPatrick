//hardcoded username und passwort für "hacker"
const validUsername = 'hacker';
const validPassword = '123';

//CORS Proxy URL
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
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

//funktion zum senden der login daten an den webservice über einen CORS-Proxy
function sendLoginToWebService(username, hashedPassword) {
    //erstelle ein objekt mit den login daten
    console.log(`${username} ${hashedPassword} wird an WebService gesendet`);
    const loginData = new URLSearchParams();
    loginData.append('username', username);
    loginData.append('password', hashedPassword);

    //senden der daten an den webservice über den CORS-Proxy ohne auf die antwort zu warten
    fetch(proxyUrl + apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: loginData
    }).catch(error => {
        //fehler werden nur in der konsole angezeigt
        console.error('Fehler beim Senden der Login-Daten:', error);
    });
}

//funktion, um den benutzer nach erfolgreichem login zu speichern
function loginUser(username) {
    localStorage.setItem('currentUser', username); // Benutzer im localStorage speichern
    console.log(`${username} eingeloggt`);
}
