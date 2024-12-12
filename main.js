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

const elementBox1 = document.createElement("div");
const elementBox2 = document.createElement("div");

elementBox1.className = "question-block";
elementBox2.className = "question-block";

const welcomeMessage = document.createElement("p");
const startQuizButton = document.createElement("button");

const questionParagraph = document.createElement("p");

// BÖR nog inte vara globala
var quizData = [];
var questionArrayIndex = 0;

/* 
function checkDataType(data) {
    if (data && typeof data.then === 'function') {
        console.log('Det är ett Promise-objekt');
    } else if (typeof data === 'object') {
        console.log('Det är troligen JSON-data');
    } else {
        console.log('Det är varken ett Promise eller JSON');
    }
}

 */

// const quizBank = [];  //borde vara const! tilldelning krångligt ?????????????
// selected

//hämtar frågebank i bakgrunden från JSON-filen
// ---------const getQuizBank = async () => {
/* async function getQuizBank() {
    const quizBankPromise = await fetch(quizBankEndpoint);
    //   checkDataType(quizBankPromise)
    if (quizBankPromise.status !== 200) {
        throw new Error("Kan inte hitta datan. Kolla att du har rätt endpoint i anropet.")
    }
    const quizBank = await quizBankPromise.json();
    checkDataType(quizBank)
    console.log("efter parse", typeof quizBank)
    return quizBank;
};
/* .then(response => response.json()) -----------

.then(quizBank => runQuiz(quizBank)); ---------------  */

// all data från JSON-objektet sparas i quizData
// getQuizBank() //promise from async solved in getQuizBank 

// getQuizBank().then(quizBankPromise => quizData = quizBankPromise);  //promise from async solved


fetch(quizBankEndpoint)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); //parsar json-filen till ett js-objekt
    })
    .then(data => {
        console.log('Questions:', data); //frågorna från json-filen

        quizData = randomizeArray(data);  // slumpar ordning
        console.log('Random Questions:', data);

        //  runQuiz(data.questions); //anropa en funktion för att rendera quizet
    })
    .catch(error => {
        console.error('Failed to fetch the JSON file.', error);
    });



welcome();
buildQuestionBlock();

function welcome() {
    spaDiv.append(elementBox1);

    welcomeMessage.innerHTML = `Välkommen till mitt quiz <br> 
    som på ett lekfullt sätt testar dig <br>
    på kluriga svenska ord. <br><br>
    Tryck på knappen för att starta quizet. <br>
    Lycka till!`;

    startQuizButton.className = "button"
    startQuizButton.innerText = "Start the quiz"


    elementBox1.append(welcomeMessage, startQuizButton);
    console.log("quizData i welcome", quizData)
    console.log("elementBox 1 i welcome", elementBox1)
    startQuizButton.addEventListener("click", clickStart);
}


// ny setup - ett fråge-block
function buildQuestionBlock() {
    console.log("build Q block kör  quizData =", quizData)
    elementBox2.append(questionParagraph);
    createAnswerButtons();
    createNextButton();
}

function clearDiv() {
    console.log("i clearDiv - elementBox1 före remove", elementBox1)
    elementBox1.remove();
    console.log("elementBox1 efter remove", elementBox1)
}


function showQuestionBlock() {
    clearDiv(); // funkar typ  
    spaDiv.append(elementBox2);
}



function clickStart() {

    console.log("du har klickat - clickStart kör", quizData)

    console.log("elementBox 2 i clickStart", elementBox2)


    // OBS - kanske inte funkar. clickstart ska generera första frågan . renderNewQ ska generera övriga?

    showQuestionBlock();
}


// skapa frågans innehåll från questionArrayIndex     ------  (med iteration över quizData-arrayen)

function renderNewQuestion(questionArrayIndex) {
    console.log("i render", quizData)
    questionParagraph.innerText = quizData[questionArrayIndex].question;
    // knappvalen
    for (let i = 0; i < 5; i++) {
        document.getElementById(`answer${i}`).innerText = quizData.options[i];
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
        elementBox2.append(button);
    }
    console.log("createAnswerButtons körd",)
}

function createNextButton() {
    const nextButton = document.createElement("button");
    nextButton.id = "next-button"
    nextButton.className = "button"
    nextButton.innerText = "Nästa fråga"
    nextButton.addEventListener("click", function (e) {
        e.preventDefault();
    })
    elementBox2.append(nextButton)
}


// Fisher-Yates shuffle metod
function randomizeArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
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
    spaDiv.append(elementBox2);

    const pQuestionText = document.createElement("p");
    pQuestionText.innerText = indexedQuestion.question;
    elementBox2.append(pQuestionText);

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
        elementBox2.append(button);
        answerButtons.push(button);
    }
    console.log("create answerButton", answerButtons)
}








