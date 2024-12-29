const words = [
    { word: "apple", arrows: "➡️⬆️ ⬇️ ⬇️ ➡️⬆️" },
    { word: "banana", arrows: "➡️⬆️ ⬇️ ➡️⬆️ ⬇️ ➡️⬆️" },
    { word: "grape", arrows: "➡️⬆️ ⬇️ ➡️⬆️" },
    { word: "orange", arrows: "➡️⬆️ ⬇️ ➡️⬆️ ⬇️ ➡️⬆️" },
    { word: "melon", arrows: "➡️⬆️ ⬇️ ⬇️" },
    { word: "strawberry", arrows: "➡️⬆️ ⬇️ ➡️⬆️ ⬇️ ⬇️ ⬇️ ➡️⬆️" },
    { word: "blueberry", arrows: "➡️⬆️ ⬇️ ⬇️ ➡️⬆️ ➡️⬆️ ⬇️ ⬇️" },
    { word: "kiwi", arrows: "➡️⬆️ ⬇️ ⬇️" },
    { word: "mango", arrows: "➡️⬆️ ⬇️ ➡️⬆️" },
    { word: "pineapple", arrows: "➡️⬆️ ⬇️ ➡️⬆️ ⬇️ ⬇️ ⬇️" },
    { word: "watermelon", arrows: "➡️⬆️ ⬇️ ➡️⬆️ ⬇️ ⬇️ ⬇️ ➡️⬆️" },
    { word: "pear", arrows: "➡️⬆️ ⬇️" },
    { word: "peach", arrows: "➡️⬆️ ⬇️ ➡️⬆️" },
    { word: "cherry", arrows: "➡️⬆️ ⬇️ ⬇️" },
    { word: "plum", arrows: "➡️⬆️ ⬇️" },
    { word: "apricot", arrows: "➡️⬆️ ⬇️ ⬇️ ➡️⬆️" },
    { word: "avocado", arrows: "➡️⬆️ ⬇️ ⬇️ ➡️⬆️ ⬇️" },
    { word: "coconut", arrows: "➡️⬆️ ⬇️ ⬇️ ➡️⬆️" },
    { word: "fig", arrows: "➡️⬆️ ⬇️" },
    { word: "guava", arrows: "➡️⬆️ ⬇️ ➡️⬆️" },
    { word: "lemon", arrows: "➡️⬆️ ⬇️" },
    { word: "lime", arrows: "➡️⬆️ ⬇️" },
    { word: "papaya", arrows: "➡️⬆️ ⬇️ ⬇️ ➡️⬆️" },
    { word: "persimmon", arrows: "➡️⬆️ ⬇️ ⬇️ ⬇️ ➡️⬆️" },
    { word: "pomegranate", arrows: "➡️⬆️ ⬇️ ⬇️ ⬇️ ➡️⬆️" },
    { word: "raspberry", arrows: "➡️⬆️ ⬇️ ⬇️ ➡️⬆️" },
    { word: "tomato", arrows: "➡️⬆️ ⬇️ ⬇️" },
    { word: "vegetable", arrows: "➡️⬆️ ⬇️ ➡️⬆️ ⬇️ ⬇️" },
    { word: "fruit", arrows: "➡️⬆️ ⬇️ ⬇️" },
    { word: "food", arrows: "➡️⬆️ ⬇️ ⬇️" }
];

let currentWord = {};
let correctGuesses = 0;
let totalAttempts = 0;

// Function to generate a new word and display its shape
function newWord() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    document.getElementById("word-shape").innerText = "_ ".repeat(currentWord.word.length);
    document.getElementById("emoji-indicator").innerHTML = currentWord.arrows;
    playWord(); // Play the word sound immediately
    updateProgress();
}

// Function to check the user's guess
function checkWord() {
    const input = document.getElementById("word-input").value.trim().toLowerCase();
    totalAttempts++;
    if (input === currentWord.word) {
        correctGuesses++;
        alert("Correct!");
    } else {
        alert(`Incorrect. The word was "${currentWord.word}".`);
    }
    updateProgress();
    newWord();
}

// Update the progress bar
function updateProgress() {
    const progress = Math.floor((correctGuesses / totalAttempts) * 100) || 0;
    document.getElementById("progress-value").innerText = progress;
    document.getElementById("progress-fill").style.width = `${progress}%`; // Fix: Use progress-fill
}

// Function to play the word sound
function playWord() {
    const utterance = new SpeechSynthesisUtterance(currentWord.word); // Fix: Use currentWord.word
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
}

// Event Listeners
document.getElementById("new-word").addEventListener("click", newWord);
document.getElementById("submit-word").addEventListener("click", checkWord);
document.getElementById("speak-word").addEventListener("click", playWord);
document.getElementById("arrow").addEventListener("click", function() {
    window.location.href = "../html/homepage.html";
});

// Initialize
newWord();