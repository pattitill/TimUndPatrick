function navigateTo(page) {
    switch(page) {
        case 'game':
            window.location.href = 'game/game.html';
            break;
        case 'highscore':
            window.location.href = 'highscore/highscore.html';
            break;
        case 'instruction':
            console.log("Hello from restart2!");
            window.location.href = 'instruction/instruction.html';
            break;
        default:
            console.error('Unbekannte Seite: ' + page);
    }
}