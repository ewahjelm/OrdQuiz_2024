/* Vad ska köras hur?:
onload
getQuizBank() fetch json async -> sparar data i arrayen quizBank (som blir samma varje gång)
OBS att data bara borde tilldelas här 1 gång men const funkar inte

Blanda ordningen på frågorna med Fisher Yates och spara till 
en array med omgångens fråge-objekt - quizData
    welcome() : add elementBox. display text & startbutton



startbutton, onclick:
  //ÄNDRA getRandomQuestion() -> quizBank.question[i] -------------
  -->  iterera istället genom quizData
    runQuiz() : starta timer på 10 sek
    clearDiv() remove elementBox (containing welcome-block)
    showQuestionBlock():  
                add elementBox (question-block)
                create pQuestion with data from quizData
                create 4 buttons  - ta bort  o skapa igen . eller byt ut innehållet

*/





const spaDiv = document.getElementById("root")
const quizBankEndpoint = "ordQuiz.json"

const elementBox = document.createElement("div");
elementBox.className = "element-box";

const welcomeMessage = document.createElement("p");
const startQuizButton = document.createElement("button");
const questionParagraph = document.createElement("p");
const feedbackField = document.createElement("div");
const reStartButton = document.createElement("button");

// BÖR nog inte vara globala - gemini säger ok
var quizData = [];
var questionArrayIndex = 0;
var points = 0;



// Fisher-Yates shuffle metod
function randomizeArray(array) {
    const randomizedArray = array;
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return randomizedArray;
}




// getQuizBank() //promise from async solved in getQuizBank 

// getQuizBank().then(quizBankPromise => quizData = quizBankPromise);  //promise from async solved
//  #############     START   asyncron  #######################

fetch(quizBankEndpoint)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); //parsar json-filen till ett js-objekt
    })
    .then(data => {
        // gör en kopia på hämtad array
        quizData = [...data];


        // Fisher-Yates shuffle metod
        randomizeArray(quizData);  // slumpar ordning - fungerar


        //  runQuiz(data.questions); //anropa en funktion för att rendera quizet
        addListenerToStartButton();
    })
    .catch(error => {
        console.error('Failed to fetch the JSON file.', error);
    });



welcome();




function welcome() {
    spaDiv.append(elementBox);

    welcomeMessage.innerHTML = `Välkommen till mitt quiz <br> 
    som på ett lekfullt sätt testar dig <br>
    på kluriga svenska ord. <br><br>
    Tryck på knappen för att starta quizet. <br>
    Lycka till!`;

    startQuizButton.className = "button"
    startQuizButton.innerText = "Start the quiz"


    elementBox.append(welcomeMessage, startQuizButton);
    // OBS EJ HÄR
    // startQuizButton.addEventListener("click", clickStart);
}

//  ######     EFTER KLICK  ###############

function clickStart() {
    console.log("start klick - QuizData:", quizData)
    clearDiv()
    questionArrayIndex = 0;
    // Bygger html struktur för quiz-block i elementBox :  <p>, 4 val-<button> och 1 nästa-<button> 
    buildAndAppendQuestionBlockHTML();
    // spaDiv.append(elementBox)

    renderNewQuestion();
    addEventListenerToOptionButtons();
    // showQuestionBlock()
    // 
    //  console.log("elementBox 2 i clickStart", elementBox)   
}

// ny setup - ett fråge-block
function buildAndAppendQuestionBlockHTML() {
    console.log("build Q block kör  quizData =", quizData)
    // lägger till <p>
    elementBox.append(questionParagraph);
    createOptionButtons();
    createFeedback();
    createNextButton();
}

//från början

function addListenerToStartButton() {
    console.log("datat hämtat")
    // lägg till listener efter att data hämtats men innan rendering")
    startQuizButton.addEventListener("click", clickStart);
}

function addEventListenerToOptionButtons() {

    for (let i = 0; i < 4; i++) {
        // OBS Här under var det fel - Alternativen funkar nu
        const svarsknapp = document.getElementById(`opt-${i}`);
        svarsknapp.addEventListener("click", function (event) {
            event.preventDefault();
            clickAnswer(event.target);
        });

    }
}







function clearDiv() {
    elementBox.innerHTML = '';
}


function showQuestionBlock() {
    spaDiv.append(elementBox);
}

// skapa frågans innehåll utifrån questionArrayIndex     ------  (med iteration över quizData-arrayen)

function renderNewQuestion() {
    feedbackField.innerHTML = "";

    // console.log("Kör renderNewQuestion   BOX =", elementBox);
    // console.log("fråga nr :", questionArrayIndex)
    // console.log("fråga ", quizData[questionArrayIndex].question)
    // renderar fråga till <p> utifrån questionArrayIndex
    questionParagraph.innerText = quizData[questionArrayIndex].question;
    console.log("questionParagraph", questionParagraph)

    // svarsalternativen renderas
    for (let i = 0; i < 4; i++) {
        // OBS Här under var det fel - Alternativen funkar nu
        const svarsknapp = document.getElementById(`opt-${i}`);
        svarsknapp.innerText = quizData[questionArrayIndex].options[i];
        svarsknapp.disabled = false;
    }

}




// elementBox2.append(questionParagraph);


function createOptionButtons() {
    for (let i = 0; i < 4; i++) {
        const button = document.createElement("button");
        button.classList = "button options"
        button.id = `opt-${i}`;
        elementBox.append(button);
    }
    console.log("createAnswerButtons körd",)
}

function createFeedback() {
    console.log("creating FeedbackField");
    feedbackField.id = "feedback-field";
    feedbackField.classList = "feedback";
    feedbackField.innerText = "";
    elementBox.append(feedbackField);
}



function createNextButton() {
    const nextButton = document.createElement("button");
    nextButton.id = "next-button"
    nextButton.className = "button"
    nextButton.innerText = "Nästa fråga"
    nextButton.addEventListener("click", function (e) {
        e.preventDefault();
        questionArrayIndex++;
        renderNewQuestion();
    })
    elementBox.append(nextButton)
}


function clickAnswer(svarsknapp) {
    //  const selectedButton = getElementById(buttonID);
    const selectedAnswer = svarsknapp.innerText;
    console.log("Valt svar = ", selectedAnswer)
    const correctAnswer = quizData[questionArrayIndex].answer
    console.log("Rätt svar = ", correctAnswer)
    giveFeedBack(selectedAnswer == correctAnswer);
    console.log(questionArrayIndex, "index")
    if (questionArrayIndex >= 7) {
        disableOptions();
        endQuiz();
    }
}

function giveFeedBack(wasCorrect) {
    if (wasCorrect) {

        console.log("Rätt!")
        points++;
        feedbackField.innerHTML = `Rätt!
        Du har nu ${points} poäng av 8`;

    } else {
        (console.log("Fel!"))
        feedbackField.innerHTML = `Fel, tyvärr.<br>
        Du har nu ${points} poäng av 8`;
    }
    disableOptions();

}



function disableOptions() {
    const optionButtons = document.getElementsByClassName("options");
    for (let i = 0; i < optionButtons.length; i++) {
        optionButtons[i].disabled = true;
    }
}

function endQuiz() {
    clearDiv();
    // ny setup - ett fråge-block

    console.log("quiz klart")

    reStartButton.className = "button"
    reStartButton.innerText = "Restart the quiz"

    elementBox.append(questionParagraph, reStartButton);
    // lägger till <p>
    questionParagraph.innerHTML = `Nu är quizet slut. <br> Du fick ${points} poäng av 8 möjliga. <br> Vill du ta testet igen?`

    reStartButton.addEventListener("click", clickStart)

}

