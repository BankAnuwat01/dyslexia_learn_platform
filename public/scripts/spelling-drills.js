const words = ['banana', 'apple', 'grape', 'orange', 'melon', 'kiwi', 'peach', 'pear', 'plum', 'mango', 'cherry', 'strawberry', 'blueberry', 'raspberry', 'blackberry', 'pineapple', 'pomegranate', 'watermelon', 'cantaloupe', 'honeydew', 'apricot', 'fig', 'date', 'coconut', 'guava', 'lychee', 'kiwifruit', 'papaya', 'passionfruit', 'dragonfruit', 'starfruit', 'persimmon', 'tamarind', 'jackfruit', 'durian', 'rambutan', 'mangosteen', 'breadfruit', 'longan', 'lychee', 'quince', 'loquat', 'kumquat', 'carambola', 'ugli', 'soursop', 'cherimoya', 'custard apple', 'pawpaw'];
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
document.getElementById("arrow").addEventListener("click", function() {
    window.location.href = "../html/homepage.html";
});
