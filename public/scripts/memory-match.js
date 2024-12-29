const words = ['apple', 'grape', 'banana', 'orange', 'pear', 'apple', 'grape', 'banana', 'orange', 'pear'];
let flippedCards = [];
let matchedCards = [];
let moves = 0;

const gameBoard = document.getElementById('game-board');
const moveCount = document.getElementById('move-count');
const resetButton = document.getElementById('reset-game');

// Shuffle words
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Initialize Game
function initGame() {
    gameBoard.innerHTML = '';
    moves = 0;
    moveCount.textContent = moves;
    flippedCards = [];
    matchedCards = [];
    const shuffledWords = shuffle(words);

    shuffledWords.forEach((word, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.word = word;
        card.dataset.index = index;
        card.textContent = '?';
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

// Flip Card Logic
function flipCard() {
    if (this.classList.contains('flipped') || this.classList.contains('matched')) return;

    this.classList.add('flipped');
    this.textContent = this.dataset.word;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        moves++;
        moveCount.textContent = moves;
        checkMatch();
    }
}

// Check for a Match
function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.word === card2.dataset.word) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card1.textContent = '?';
            card2.classList.remove('flipped');
            card2.textContent = '?';
        }, 1000);
    }

    flippedCards = [];
    checkWin();
}

// Check Win Condition
function checkWin() {
    if (matchedCards.length === words.length) {
        setTimeout(() => {
            alert('Congratulations! You matched all words!');
        }, 500);
    }
}

// Reset Game
resetButton.addEventListener('click', initGame);

document.getElementById("arrow").addEventListener("click", function() {
    window.location.href = "../html/homepage.html";
});

initGame();
