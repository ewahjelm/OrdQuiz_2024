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

// BÖR nog inte vara globala - gemini säger ok
var quizData = [];
var questionArrayIndex = 0;



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

        console.log('original Questions:', quizData); //frågorna från json-filen
        // checkDataType(data);

        // Fisher-Yates shuffle metod
        randomizeArray(quizData);  // slumpar ordning - fungerar

        console.log('Random Questions:', quizData);

        //  runQuiz(data.questions); //anropa en funktion för att rendera quizet
        addEventListener();
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
    buildQuestionBlock();
    // spaDiv.append(elementBox)
    renderNewQuestion();
    showQuestionBlock()
    // 
    //  console.log("elementBox 2 i clickStart", elementBox)   
}

// ny setup - ett fråge-block
function buildQuestionBlock() {
    console.log("build Q block kör  quizData =", quizData)
    // lägger till <p>
    elementBox.append(questionParagraph);
    createAnswerButtons();
    createNextButton();
}

//från början

function addEventListener() {
    console.log("datat hämtat")
    // lägg till listener efter att data hämtats men innan rendering")
    startQuizButton.addEventListener("click", clickStart);
}








function clearDiv() {
    elementBox.innerHTML = '';
}
/* function clearDiv1() {
    console.log("i clearDiv - elementBox1 före remove", elementBox1)
    elementBox1.remove();
    console.log("elementBox1 efter remove", elementBox1)
}
 */

function showQuestionBlock() {
    spaDiv.append(elementBox);
}

// skapa frågans innehåll från questionArrayIndex     ------  (med iteration över quizData-arrayen)

function renderNewQuestion() {
    console.log("Rendering new question QuixData =", quizData);
    questionParagraph.value = quizData[questionArrayIndex].question;
    console.log("questionParagraph", questionParagraph)

    // Update answer buttons based on options (modify this based on your data structure)
    for (let i = 0; i < 5; i++) {
        document.getElementById(`answer${i}`).innerText = "quizData[questionArrayIndex].options[i]";
    }
}

// function renderNewQuestion(questionArrayIndex) {
//     console.log("i render", quizData)
//     questionParagraph.innerText = quizData[questionArrayIndex].question;
//     // knappvalen
//     for (let i = 0; i < 5; i++) {
//         document.getElementById(`answer${i}`).innerText = quizData.options[i];
//     }
// }

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
        elementBox.append(button);
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
    elementBox.append(nextButton)
}




/*
function clickAnswer(buttonID) {
    const selectedButton = getElementById(buttonID);
    const selectedAnswer = selectedButton.innerText;
    const correctAnswer = quizData.answer[questionArrayIndex]
    // if (selectedAnswer === quizData.answer)
}

 */







// /* /*

// // OBS behöver säkerställa att inte en fråga kommer fleras ggr
// function selectRandomQuestion1(q) {
//     const index = Math.floor(q.length * Math.random());
//     console.log(q[index].question)
//     return q[index];  //indexedQuestion
// };
// /*  */
//  */
// function showQuestionBlock1(indexedQuestion) {
//     spaDiv.append(elementBox2);

//     const pQuestionText = document.createElement("p");
//     pQuestionText.innerText = indexedQuestion.question;
//     elementBox2.append(pQuestionText);

//     console.log("showQuestionBlock", indexedQuestion);

//     // questionText = runQuiz(quizData);
//     createAnswerButtons(indexedQuestion);

// }


// function createAnswerButtons1(indexedQuestion) {
//     const answerButtons = [];
//     for (let i = 0; i < indexedQuestion.options.length; i++) {
//         const button = document.createElement("button");
//         button.className = "button"
//         button.id = `answer${i}`;
//         button.innerText = `${indexedQuestion.options[i]}`
//         button.addEventListener("click", clickAnswer(button.innerText));
//         elementBox2.append(button);
//         answerButtons.push(button);
//     }
//     console.log("create answerButton", answerButtons)
// }








//  */