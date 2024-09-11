function navigateTo(page) {
    switch(page) {
        case 'game':
            window.location.href = 'game.html';
            break;
        case 'highscore':
            window.location.href = 'highscore.html';
            break;
        case 'instruction':
            window.location.href = '../instruction/instruction.html';
            break;
        default:
            console.error('Unbekannte Seite: ' + page);
    }
}
