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

elementBox1.classList = "question-block";
elementBox2.classList = "question-block";

const welcomeMessage = document.createElement("p");
const startQuizButton = document.createElement("button");



var quizData = [];
// const quizBank = [];  //borde vara const!  ?????????????
// selected

//hämtar frågebank i bakgrunden från JSON-filen
const getQuizBank = async () => {
    const quizBankPromise = await fetch(quizBankEndpoint);
    if (quizBankPromise.status !== 200) {
        throw new Error("Kan inte hitta datan. Kolla att du har rätt endpoint i anropet.")
    }
    const quizBank = await quizBankPromise.json();
    const quizDataPromise = await randomizeArray(quizBank);
    return quizDataPromise;
};
/* .then(response => response.json()) -----------

.then(quizBank => runQuiz(quizBank)); ---------------  */

// all data från JSON-objektet sparas i quizData
getQuizBank().then(quizDataPromise => quizData = quizDataPromise);  //promise from async solved


welcome();

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

    startQuizButton.addEventListener("click", function (e) {
        e.preventDefault();
        clickStart(quizData);
    })
}

/**** function clickStart() {
clearDiv();
// ----------------selectRandomQuestion(quizBank) -> 
    ---------------- lever vidare under frågeomgången som ? indexedQuestion eller randomQuestion !
--------------Ta bort frågan (objekt[index]) ur quizBank

} *****/


function clickStart(quizData) {
    console.log("du har klickat - clickStart kör", quizData)
    clearDiv(); // funkar
    // skapa setup för frågeblock


    const pQuestionText = document.createElement("p");
    createAnswerButtons();
    createNextButton()

    // skapa frågans innehåll med iteration över quizData-arrayen
    pQuestionText.innerText = "ewa";
    // knappvalen
    /*     for (let i = 0; i < 5; i++) {
            document.getElementById(`answer${i}`).innerText = quizData.options[i];
        }
     */
    //  showQuestionBlock();
    spaDiv.append(elementBox2);
}



function createAnswerButtons() {
    for (let i = 0; i < 4; i++) {
        const button = document.createElement("button");
        button.className = "button"
        button.id = `opt-${i}`;
        button.addEventListener("click", function (e) {
            e.preventDefault();
            //  clickAnswer();
        });
        elementBox2.append(button);
    }
    console.log("createAnswerButtons körd",)
}

function createNextButton() {
    const nextButton = document.createElement("button");
    nextButton.innerText = "Nästa fråga"
    elementBox2.append(nextButton)
}



// Fisher-Yates shuffle metod
function randomizeArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function clearDiv() {
    console.log("elementBox1", elementBox1)
    elementBox1.remove();
    console.log("elementBox1 efter remove", elementBox1)
}


function clickAnswer(selectedAnswer) {
    // const selectedAnswer = ;
    // if (selectedAnswer === quizData.answer)
}











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








