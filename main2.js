

const spaDiv = document.getElementById("root")
const quizBankEndpoint = "ordQuiz.json"


// måste komma på hur jag ska tömma containern istället
const elementBox = document.createElement("div");
const quizBox = document.createElement("div");

elementBox.className = "element-box";
quizBox.className = "element-box";

const welcomeMessage = document.createElement("p");
const startQuizButton = document.createElement("button");

const questionParagraph = document.createElement("p");
var questionArrayIndex = 0;



async function fetchAndShuffleQuizData() {
    const response = await fetch(quizBankEndpoint);
    // console.log("async i fetch&shuffle", response)  // tydligt Response
    const quizBank = await response.json();
    console.log("async quizBank - original", quizBank)

    // Create a copy of the array to avoid modifying the original
    const shuffledQuizBank = [...quizBank];
    // console.log("async shuffledQuizBank = quizBank BORDE VARA id-copy", shuffledQuizBank);
    randomizeArray(shuffledQuizBank);

    //console.log("async EJ randomized quizBank", quizBank)
    //console.log("async randomized shuffledQuizBank", shuffledQuizBank)

    return shuffledQuizBank;
} catch (error) {
    console.error("Error fetching quiz data:", error);
}




// Fisher-Yates shuffle metod
function randomizeArray(array) {
    const randomizedArray = array;
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

}


function clickStart(quizData) {

    console.log("quizData i clickstart", quizData)  //BRA
    renderNewQuestion(quizData); // Now we have the data, render the first question
    showQuestionBlock();

}

//  _###########  KÖR   #############

fetchAndShuffleQuizData()
    .then(shuffledQuizBank => {
        quizData = shuffledQuizBank;
        //  startQuizButton.addEventListener("click", clickStart); får inte fästas efter att knappen renderats i DOM  
        //  console.log("quizData innan retur till clickStart", quizData)  //OK!
        // console.log("returned QuizData:", quizData)
        return quizData
        // Now you can start displaying the first question
    })
    .catch(error => {
        console.error('Error fetching quiz data:', error);
    });

function showQuestion(question) {
    // ... code to update the DOM with the current question ...
}


welcome();
buildQuestionBlock();

function welcome() {
    spaDiv.append(elementBox);

    welcomeMessage.innerHTML = `Välkommen till mitt quiz <br> 
    som på ett lekfullt sätt testar dig <br>
    på kluriga svenska ord. <br><br>
    Tryck på knappen för att starta quizet. <br>
    Lycka till!`;

    startQuizButton.className = "button"
    startQuizButton.innerText = "Start the quiz"
    startQuizButton.addEventListener("click", clickStart);


    elementBox.append(welcomeMessage, startQuizButton);
    //console.log("quizData i welcome", quizData) // japp ingendata finns!
    //  OBS LÄGG INTE TILL DENNA HÄR
}


// ny struktur - ett quiz-block
function buildQuestionBlock() {
    //  console.log("build Q block kör quizData =", quizData) // japp ingendata finns!
    console.log("building question block structure")

    quizBox.append(questionParagraph);
    createAnswerButtons();
    createNextButton();
}

function clearDiv() {
    console.log("i clearDiv - elementBox1 före remove", elementBox)
    elementBox.remove();
    console.log("elementBox1 efter remove", elementBox)
}


function showQuestionBlock() {
    clearDiv(); // funkar typ  
    spaDiv.append(quizBox);
}






// skapa frågans innehåll från questionArrayIndex     ------  (med iteration över quizData-arrayen)

function renderNewQuestion(quizData) {
    console.log("i render", quizData)
    questionParagraph.innerText = quizData[questionArrayIndex].question;
    //questionParagraph.innerText = "bajskorv";
    // knappvalen
    for (let n = 0; n < 5; n++) {
        document.getElementById(`answer${n}`).innerText = quizData[questionArrayIndex].options[n];
    }
}

// function renderNewQuestion() {}

// elementBox2.append(questionParagraph);


function createAnswerButtons() {
    for (let i = 0; i < 4; i++) {
        const button = document.createElement("button");
        button.className = "button"
        button.id = `opt-${i}`;
        button.addEventListener("click", function (e) {
            e.preventDefault();
            clickAnswer(button.id);
        });
        quizBox.append(button);
    }
    console.log("svarsknappar skapas",)
}

function createNextButton() {
    const nextButton = document.createElement("button");
    nextButton.id = "next-button"
    nextButton.className = "button"
    nextButton.innerText = "Nästa fråga"
    nextButton.addEventListener("click", function (e) {
        e.preventDefault();
    })
    quizBox.append(nextButton)
    console.log("knapp för nästa fråga skapas",)
}




/* 
function clickAnswer(buttonID) {
    const selectedButton = getElementById(buttonID);
    const selectedAnswer = selectedButton.innerText;
    const correctAnswer = quizData.answer[questionArrayIndex]
    // if (selectedAnswer === quizData.answer)
}

 */









// OBS behöver säkerställa att inte en fråga kommer fleras ggr
function selectRandomQuestion1(q) {
    const index = Math.floor(q.length * Math.random());
    console.log(q[index].question)
    return q[index];  //indexedQuestion
};


function showQuestionBlock1(indexedQuestion) {
    spaDiv.append(quizBox);

    const pQuestionText = document.createElement("p");
    pQuestionText.innerText = indexedQuestion.question;
    quizBox.append(pQuestionText);

    console.log("showQuestionBlock", indexedQuestion);

    // questionText = runQuiz(quizData);
    createAnswerButtons(indexedQuestion);

}


function createAnswerButtons1(indexedQuestion) {
    const answerButtons = [];
    for (let i = 0; i < indexedQuestion.options.length; i++) {
        const button = document.createElement("button");
        button.className = "button"
        button.id = `answer${i}`;
        button.innerText = `${indexedQuestion.options[i]}`
        button.addEventListener("click", clickAnswer(button.innerText));
        quizBox.append(button);
        answerButtons.push(button);
    }
    console.log("create answerButton", answerButtons)
}








