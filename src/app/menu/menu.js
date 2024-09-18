let currentUser = 'void';

function navigateTo(page) {
    switch(page) {
        case 'game':
            window.location.href = '../game/game.html';
            break;
        case 'highscore':
            window.location.href = '../highscore/highscore.html';
            break;
        case 'instruction':
            window.location.href = '../instruction/instruction.html';
            break;
        case 'trivia':
            window.location.href = '../trivia/trivia.html';
            break;
        case 'sources':
            window.location.href = '../quellen/quellen.html';
            break;
        default:
            console.error('Unbekannte Seite: ' + page);
    }
}

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

document.getElementById('user-heading').innerHTML = currentUser ;