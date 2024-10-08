//hardcoded username und passwort für "hacker"
const validUsername = 'hacker';
const validPassword = '123';

const proxyUrl = 'https://thingproxy.freeboard.io/fetch/';
//alternative proxy url
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

        //weiterleitung zur menu-seite nach 1 sekunde wegen console log
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
    //vollständige url mit proxy und api
    const fullUrl = proxyUrl + apiUrl;

    //form data für request
    const loginData = new URLSearchParams();
    loginData.append('username', username);
    loginData.append('password', hashedPassword);

    //data wird gesendet als post mit content type url encoded
    fetch(fullUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded' //url encoded format
        },
        body: loginData.toString() //form data wird in body gepackt
    })
        .then(response => response.text())
        .then(text => {
            console.log("Response Text:", text);  //logging :(
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
