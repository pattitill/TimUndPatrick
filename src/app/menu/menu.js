function navigateTo(page) {
    switch(page) {
        case 'game':
            window.location.href = 'game.html';
            break;
        case 'highscore':
            window.location.href = 'highscore.html';
            break;
        case 'instructions':
            window.location.href = 'instructions.html';
            break;
        default:
            console.error('Unbekannte Seite: ' + page);
    }
}
