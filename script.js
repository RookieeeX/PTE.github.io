// script.js

let words = [];
let currentWord = '';

function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

function speakWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
}

function hideWord() {
    document.getElementById('word').style.display = 'none';
}

function displayWord() {
    document.getElementById('word').style.display = 'block';
}

function nextWord() {
    if (words.length === 0) {
        alert('Word list is empty. Please check if words.txt is loaded correctly.');
        return;
    }
    currentWord = getRandomWord();
    document.getElementById('word').textContent = currentWord;
    hideWord();
    speakWord(currentWord);
}

function startTraining() {
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('controls').style.display = 'block';
    nextWord();
}

// Load words from a local file
fetch('words.txt')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(text => {
        words = text.split('\n').map(word => word.trim()).filter(word => word.length > 0);
        console.log('Words loaded:', words);
        document.getElementById('startButton').disabled = false;  // Enable the start button once words are loaded
    })
    .catch(error => {
        console.error('Error loading words:', error);
        alert('Failed to load words.txt. Please check the console for more details.');
    });
