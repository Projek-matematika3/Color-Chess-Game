document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('playerForm');
    const gameArea = document.getElementById('gameArea');
    const displayName = document.getElementById('displayName');
    const chessboard = document.getElementById('chessboard');
    const playerScoreElement = document.getElementById('playerScore');
    const opponentScoreElement = document.getElementById('opponentScore');
    const resetButton = document.getElementById('resetButton');

    let playerName;
    let mode;
    let playerTurn = true; // True if player's turn, false if opponent's turn
    let playerScore = 0;
    let opponentScore = 0;

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        playerName = document.getElementById('playerName').value;
        mode = document.getElementById('mode').value;
        localStorage.setItem('playerName', playerName);

        displayName.textContent = playerName;
        form.classList.add('hidden');
        gameArea.classList.remove('hidden');

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
                square.addEventListener('click', handleSquareClick);
                chessboard.appendChild(square);
            }
        }
    }

    function handleSquareClick(event) {
        if (event.target.style.backgroundColor) return; // Ignore already clicked squares

        if (playerTurn) {
            event.target.style.backgroundColor = '#ffeb3b'; // Player color
            playerTurn = false;
            checkWinner();
            if (mode === 'computer' && !playerTurn) {
                setTimeout(computerMove, 500); // Delay for computer move
            }
        } else {
            if (mode === 'friend') {
                event.target.style.backgroundColor = '#00e676'; // Opponent color for friend mode
                playerTurn = true;
                checkWinner();
            }
        }
    }

    function computerMove() {
        const squares = Array.from(document.querySelectorAll('.chess-square'));
        const emptySquares = squares.filter(square => !square.style.backgroundColor);
        if (emptySquares.length > 0) {
            const randomSquare = emptySquares[Math.floor(Math.random() * emptySquares.length)];
            randomSquare.style.backgroundColor = '#00e676'; // Computer color
            playerTurn = true;
            checkWinner();
        }
    }

    function checkWinner() {
        const squares = Array.from(document.querySelectorAll('.chess-square'));
        if (squares.some(square => !square.style.backgroundColor)) return; // Not a winning condition

        const playerWins = squares.every(square => square.style.backgroundColor === '#ffeb3b');
        if (playerWins) {
            playerScore++;
            updateScores();
            showWinMessage('Player');
            resetBoard();
            return;
        }

        const opponentWins = squares.every(square => square.style.backgroundColor === '#00e676');
        if (opponentWins) {
            opponentScore++;
            updateScores();
            showWinMessage('Opponent');
            resetBoard();
            return;
        }
    }

    function updateScores() {
        playerScoreElement.textContent = playerScore;
        opponentScoreElement.textContent = opponentScore;
    }

    function resetBoard() {
        createChessBoard();
        playerTurn = true;
    }

    resetButton.addEventListener('click', function() {
        resetBoard();
        gameArea.classList.add('hidden');
        form.classList.remove('hidden');
        playerScore = 0;
        opponentScore = 0;
        updateScores();
    });

    // Function to display win message
    function showWinMessage(winner) {
        const message = `${winner} wins!`;
        alert(message);
    }

    // Retrieve player name from localStorage if available
    const savedPlayerName = localStorage.getItem('playerName');
    if (savedPlayerName) {
        playerName = savedPlayerName;
        displayName.textContent = savedPlayerName;
        form.classList.add('hidden');
        gameArea.classList.remove('hidden');
        createChessBoard();
    }
});
