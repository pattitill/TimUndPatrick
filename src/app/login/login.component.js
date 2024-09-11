// Hardcoded username and password
const validUsername = 'user123';
const validPassword = 'password123';

// Get the elements from the DOM
const loginButton = document.getElementById('login');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const messageDisplay = document.getElementById('message');

// Add click event listener to the login button
loginButton.addEventListener('click', function () {
    // Get user input values
    const enteredUsername = usernameInput.value;
    const enteredPassword = passwordInput.value;

    // Check if the username and password match the hardcoded values
    if (enteredUsername === validUsername && enteredPassword === validPassword) {
        // Success: redirect to the game or show a success message
        messageDisplay.textContent = 'Login erfolgreich! Du wirst weitergeleitet...';
        messageDisplay.style.color = 'green';

        // Redirect to the game page (replace 'game.html' with your game URL if necessary)
        setTimeout(function () {
            window.location.href = 'game.html'; // Adjust this URL to point to your game page
        }, 2000);
    } else {
        // Failure: show an error message
        messageDisplay.textContent = 'Benutzername oder Passwort ist falsch.';
        messageDisplay.style.color = 'red';
    }
});
// Enable/disable login button based on input fields
function toggleLoginButton() {
    if (usernameInput.value && passwordInput.value) {
        loginButton.disabled = false;
    } else {
        loginButton.disabled = true;
    }
}

usernameInput.addEventListener('input', toggleLoginButton);
passwordInput.addEventListener('input', toggleLoginButton);

// Initially disable the login button
toggleLoginButton();
