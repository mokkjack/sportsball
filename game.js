let score = 0;
let gameActive = false;
let athleteList = ["Jack Morice", "Abby Hartzog", "John Berry"];
let enteredNames = new Set(); // To track duplicates

const pointsElement = document.getElementById('points');
const athleteInput = document.getElementById('athleteInput');
const feedbackElement = document.getElementById('feedback');
const startButton = document.getElementById('startButton');
const enteredAthletesElement = document.getElementById('enteredAthletes');

function startGame() {
    score = 0;
    gameActive = true;
    enteredNames.clear();
    pointsElement.textContent = score;
    feedbackElement.textContent = '';
    athleteInput.value = '';
    athleteInput.disabled = false;
    athleteInput.focus();
    startButton.disabled = true;
    enteredAthletesElement.innerHTML = '';
}

function handleInput(event) {
    if (!gameActive) return;
    const input = athleteInput.value.trim();
    if (event.key === 'Enter' && input !== '') {
        const matchedName = athleteList.find(name => name.toLowerCase() === input.toLowerCase());
        if (enteredNames.has(input)) {
            feedbackElement.textContent = 'Name already entered';
        } else if (matchedName) {
            score++;
            pointsElement.textContent = score;
            feedbackElement.textContent = 'Correct!';
            enteredNames.add(input);
            addAthleteToBox(matchedName);
        } else {
            feedbackElement.textContent = 'Invalid name!';
        }
        athleteInput.value = '';
    }
}
function addAthleteToBox(name) {
    const athleteItem = document.createElement('div');
    athleteItem.textContent = name;
    enteredAthletesElement.appendChild(athleteItem);
    enteredAthletesElement.scrollTop = enteredAthletesElement.scrollHeight; // Auto-scroll to the bottom
}

startButton.addEventListener('click', startGame);
athleteInput.addEventListener('keydown', handleInput);