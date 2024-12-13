const spaDiv = document.getElementById("root");
const quizBankEndpoint = "ordQuiz.json";

// Create DOM elements
const elementBox = document.createElement("div");
const quizBox = document.createElement("div");
const welcomeMessage = document.createElement("p");
const startQuizButton = document.createElement("button");
const questionParagraph = document.createElement("p");

// Initialize variables
let quizData = [];
let currentQuestionIndex = 0;



// Fetch and shuffle quiz data
async function fetchAndShuffleQuizData() {
    const response = await fetch(quizBankEndpoint);
    const quizBank = await response.json();

    // Create a copy to avoid modifying the original
    const shuffledQuizBank = [...quizBank];
    randomizeArray(shuffledQuizBank);

    return shuffledQuizBank;
}

// Fisher-Yates shuffle method
function randomizeArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Build the welcome screen
function welcome() {
    elementBox.id = "welcome";
    elementBox.classList.add("elementBox". "visible");
    welcomeMessage.innerHTML = `Välkommen till mitt quiz <br>
    som på ett lekfullt sätt testar dig <br>
    på kluriga svenska ord. <br><br>
    Tryck på knappen för att starta quizet. <br>
    Lycka till!`;
    startQuizButton.className = "button";
    startQuizButton.innerText = "Start the quiz";
    elementBox.append(welcomeMessage, startQuizButton);
    spaDiv.appendChild(elementBox);


}

// Build the question block
function buildQuestionBlock() {
    quizBox.id = "quiz";
    quizBox.classList = "elementBox, hidden";
    createAnswerButtons();
    createNextButton();
}

// welcome osynligt & quiz synlig
function showQuestionBlock() {
    elementBox.classList.remove("visible");
    elementBox.classList.add("hidden");
    quizBox.classList.add("visible");

    quizBox.appendChild(questionParagraph);
    spaDiv.appendChild(quizBox);
}

// Display the current question
function renderNewQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionParagraph.textContent = currentQuestion.question;
    // ... code to populate answer choices ...
}

// Create answer buttons
function createAnswerButtons() {
    for (let i = 0; i < 4; i++) {
        const button = document.createElement("button");
        button.classList = "button"
        button.id = `opt-${i}`;
        button.addEventListener("click", function (e) {
            e.preventDefault();
            clickAnswer(button.id);
        });
        quizBox.append(button);
    }
    console.log("svarsknappar skapas",)
}

// Create the next button
function createNextButton() {
    const nextButton = document.createElement("button");
    nextButton.id = "next-button"
    nextButton.classList = "button"
    nextButton.innerText = "Nästa fråga"
    nextButton.addEventListener("click", function (e) {
        e.preventDefault();
    })
    quizBox.append(nextButton)
    console.log("knapp för nästa fråga skapas",)
}


// Handle the start button click
async function clickStart() {
    const shuffledQuizData = await fetchAndShuffleQuizData();
    quizData = shuffledQuizData;
    renderNewQuestion(quizData);
    showQuestionBlock(quizData);
}



// Initialize the application
fetchAndShuffleQuizData().then     // lägger till eventListener när datat finns
startQuizButton.addEventListener("click", clickStart(quizData));
welcome();
// buildQuestionBlock();