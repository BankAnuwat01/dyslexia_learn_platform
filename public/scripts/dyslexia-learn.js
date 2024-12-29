const words = ["banana", "apple", "grape", "orange", "melon", "kiwi", "peach"];
let currentWord = "";
let scrambledWord = "";

// Function to generate a new word and scramble it
function generateNewWord() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    scrambledWord = scrambleWord(currentWord);
    document.getElementById("scrambled-word").textContent = scrambledWord.split("").join(" ");
    document.getElementById("feedback").textContent = ""; // Clear feedback
    document.getElementById("rearrange-input").value = ""; // Clear input
}

// Function to scramble a word
function scrambleWord(word) {
    return word
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");
}

// Function to check the user's answer
function checkWord() {
    const userInput = document.getElementById("rearrange-input").value.trim().toLowerCase();
    if (userInput === currentWord) {
        document.getElementById("feedback").textContent = "🎉 Correct! Well done!";
        document.getElementById("feedback").style.color = "green";
    } else {
        document.getElementById("feedback").textContent = "❌ Try Again!";
        document.getElementById("feedback").style.color = "red";
    }
}

// Function to display a hint
function showHint() {
    document.getElementById("feedback").textContent = `Hint: The word starts with "${currentWord[0]}"`;
    document.getElementById("feedback").style.color = "#6366f1";
}

// Event Listeners
document.getElementById("check-btn").addEventListener("click", checkWord);
document.getElementById("new-word-btn").addEventListener("click", generateNewWord);
document.getElementById("hint-btn").addEventListener("click", showHint);

document.getElementById("arrow").addEventListener("click", function() {
    window.location.href = "../html/homepage.html";
});

// Initialize the first word
generateNewWord();
