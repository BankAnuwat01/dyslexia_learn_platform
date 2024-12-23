const words = ['apple', 'banana', 'orange', 'grape', 'pear'];
let currentWord = '';

const speakButton = document.getElementById('speak-word');
const checkButton = document.getElementById('check-word');
const userInput = document.getElementById('user-input');
const feedback = document.getElementById('feedback');

// Speak Word
function speakWord() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    const utterance = new SpeechSynthesisUtterance(currentWord);
    speechSynthesis.speak(utterance);
    feedback.textContent = '';
}

// Check Word
function checkWord() {
    if (userInput.value.trim().toLowerCase() === currentWord) {
        feedback.textContent = 'Correct! 🎉';
        feedback.style.color = 'green';
    } else {
        feedback.textContent = `Incorrect. Try again!`;
        feedback.style.color = 'red';
    }
}

speakButton.addEventListener('click', speakWord);
checkButton.addEventListener('click', checkWord);
