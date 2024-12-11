/* Vad ska köras hur?:
onload
fetch json async
    welcome() : add elementBox. display text & startbutton

startbutton, onclick:
getRandomQuestion() -> quizData.question[i]
runQuiz() : starta timer på 10 sek

  showQuestionBlock():  remove elementBox (containing welcome-block)
                add elementBox (question-block)
                create pQuestion with data from fetched quizData
                create 4 buttons  - ta bort  o skapa igen . eller byt ut innehållet

*/
const spaDiv = document.getElementById("root")
const quizBankEndpoint = "ordQuiz.json"
const elementBox1 = document.createElement("section");

const elementBox2 = document.createElement("section");

elementBox1.classList = "question-block";
elementBox2.classList = "question-block";

var quizData = [];

//hämtar frågebank i bakgrunden från JSON-filen
const getQuizBank = async () => {
    const quizBankPromise = await fetch(quizBankEndpoint);
    if (quizBankPromise.status !== 200) {
        throw new Error("Kan inte hitta datan. Kolla att du har rätt endpoint i anropet.")
    }
    const data = await quizBankPromise.json();
    return data;
};
/* .then(response => response.json())

.then(quizData => runQuiz(quizData)); */

// vi hämtar all data i hela JSON objektet och sparar i quizData
getQuizBank().then(data => quizData = data);
welcome();

function welcome() {
    spaDiv.append(elementBox1);

    const welcomeMessage = document.createElement("p");
    welcomeMessage.innerHTML = `Välkommen till mitt quiz <br> 
    som på ett lekfullt sätt testar dig <br>
    på kluriga svenska ord. <br><br>
    Tryck på knappen för att starta quizet. <br>
    Lycka till!`;
    const startQuizButton = document.createElement("button");
    startQuizButton.className = "button"
    startQuizButton.innerText = "Start the quiz"


    elementBox1.append(welcomeMessage, startQuizButton);

    startQuizButton.addEventListener("click", function (e) {
        e.preventDefault();
        console.log("du har klickat")
        clearDiv(); // funkar
        const randomQuestion = getRandomQuestion(quizData); // funkar. MEN hur ska jag förhindra att det blir samma fråga två ggr.
        showQuestionBlock(randomQuestion); //funkar 
        // return ?;
    })
}

/* function clickStart() {

} */

function clearDiv() {
    console.log("elementBox1", elementBox1)
    elementBox1.remove();
    console.log("elementBox1 efter remove", elementBox1)
}

// OBS kommer att behöva säkerställa att inte en fråga kommer fleras ggr
function getRandomQuestion(q) {
    const index = Math.floor(q.length * Math.random());
    console.log(q[index].question)
    return q[index];  //indexedQuestion
};


function showQuestionBlock(indexedQuestion) {
    spaDiv.append(elementBox2);

    const pQuestionText = document.createElement("p");
    pQuestionText.innerText = indexedQuestion.question;
    elementBox2.append(pQuestionText);

    console.log("showQuestionBlock", indexedQuestion);

    // questionText = runQuiz(quizData);
    createAnswerButtons(indexedQuestion);

}

function clickAnswer(selectedAnswer) {
    // const selectedAnswer = ;
    if (selectedAnswer === )
}

function createAnswerButtons(indexedQuestion) {
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








