const spaDiv = document.getElementById("root");
const quizBankEndpoint = "ordQuiz.json";

// Elements
const elementBox = document.createElement("div");
const welcomeMessage = document.createElement("p");
const startQuizButton = document.createElement("button");
const quizBox = document.createElement("div");
const questionParagraph = document.createElement("p");

var questionArrayIndex = 0;

async function fetchAndShuffleQuizData() {
    try {
        const response = await fetch(quizBankEndpoint);
        const quizBank = await response.json();

        // Create a copy to avoid modifying original
        const shuffledQuizBank = [...quizBank];
        randomizeArray(shuffledQuizBank);

        return shuffledQuizBank;
    } catch (error) {
        console.error("Error fetching quiz data:", error);
    }
}

function randomizeArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function clickStart(quizData) {
    renderNewQuestion(quizData);
    showQuestionBlock();
}

function renderNewQuestion(quizData) {
    questionParagraph.innerText = quizData[questionArrayIndex].question;
    // Update answer buttons based on options
    for (let n = 0; n < 5; n++) {
        document.getElementById(`answer${n}`).innerText = quizData[questionArrayIndex].options[n];
    }
}

function showQuestionBlock() {
    spaDiv.appendChild(quizBox);
}

function welcome() {
    elementBox.className = "element-box";
    welcomeMessage.innerHTML = `Välkommen till mitt quiz <br> 
  som på ett lekfullt sätt testar dig <br>
  på kluriga svenska ord. <br><br>
  Tryck på knappen för att starta quizet. <br>
  Lycka till!`;

    startQuizButton.className = "button";
    startQuizButton.innerText = "Start the quiz";

    elementBox.append(welcomeMessage, startQuizButton);
    spaDiv.append(elementBox); // Append after content is added
}

function buildQuestionBlock() {
    quizBox.className = "element-box";
    quizBox.append(questionParagraph);
    createAnswerButtons();
    createNextButton();
}

function createAnswerButtons() {
    // ... your code to create answer buttons ...
}

function createNextButton() {
    // ... your code to create next button ...
}

// ... other functions like clickAnswer, selectRandomQuestion1, etc. ...

// Call these functions in the right order
welcome(); // Show welcome screen
fetchAndShuffleQuizData() // Fetch quiz data in background
    .then(quizData => {
        // Quiz data is ready, attach click event listener
        startQuizButton.addEventListener("click", () => clickStart(quizData));
        buildQuestionBlock(); // Prepare quiz block structure
    });