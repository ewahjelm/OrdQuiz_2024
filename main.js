/* Vad ska köras hur?:
onload
welcome() display text & startbutton
  startbutton, onclick:
  remove welcome-block
  create & append questionblock

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
    const quizBank = await fetch(quizBankEndpoint);
    if (quizBank.status !== 200) {
        throw new Error("Kan inte hitta datan. Kolla att du har rätt endpoint i anropet.")
    }
    const data = await quizBank.json();
    return data;
};
/* .then(response => response.json())

.then(quizData => runQuiz(quizData)); */

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
        const randomQuestion = getRandomQuestion(quizData); // funkar
        showQuestionBlock(randomQuestion); //funkar inte än
        // return ?;
    })
}

function clearDiv() {
    console.log("elementBox1", elementBox1)
    elementBox1.remove();
    console.log("elementBox1 efter remove", elementBox1)
}

function getRandomQuestion(q) {
    const index = Math.floor(q.length * Math.random());
    console.log(q[index].question)
    return q[index];
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

function createAnswerButtons(indexedQuestion) {
    const answerButtons = [];
    for (let i = 0; i < indexedQuestion.options.length; i++) {
        const button = document.createElement("button");
        button.className = "button"
        button.id = `answer${i}`;
        button.innerText = `${indexedQuestion.options[i]}`
        elementBox2.append(button);
        // answerButtons.push(button);
    }
    console.log("create AB", answerButtons)
}








