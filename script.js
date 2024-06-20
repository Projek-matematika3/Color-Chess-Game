document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('playerForm');
    const gameArea = document.getElementById('gameArea');
    const displayName = document.getElementById('displayName');
    const chessboard = document.getElementById('chessboard');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const playerName = document.getElementById('playerName').value;
        localStorage.setItem('playerName', playerName);

        displayName.textContent = playerName;
        form.style.display = 'none';
        gameArea.style.display = 'block';

        createChessBoard();
    });

    function createChessBoard() {
        chessboard.innerHTML = ''; // Clear previous chessboard if any
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement('div');
                square.classList.add('chess-square');
                if ((row + col) % 2 === 0) {
                    square.classList.add('white');
                } else {
                    square.classList.add('black');
                }
                chessboard.appendChild(square);
            }
        }
    }

    // Menampilkan nama pemain jika sudah tersimpan di localStorage
    const savedPlayerName = localStorage.getItem('playerName');
    if (savedPlayerName) {
        displayName.textContent = savedPlayerName;
        form.style.display = 'none';
        gameArea.style.display = 'block';
        createChessBoard();
    }
});
