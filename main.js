/* Vad ska köras hur?:
onload
welcome() display text & startbutton
  startbutton, onclick:
  remove welcome-block
  create & append questionblock

*/
const spaDiv = document.getElementById("root")
const quizBankEndpoint = "ordQuiz.json"
const elementBox = document.createElement("section");
elementBox.id = "question-block";
const quizData = [];

//hämtar frågebank i bakgrunden från JSON-filen
const getQuizBank = async () => {
    const quizBank = await fetch(quizBankEndpoint);
    if (quizBank.status !== 200) {
        throw new Error("Kan inte hitta datan. Kolla att du har rätt endpoint i anropet.")
    }
    quizData = await quizBank.json();
    return quizData;
};
/* .then(response => response.json())

.then(quizData => runQuiz(quizData)); */



function welcome(spaDiv) {
    spaDiv.append(elementBox);

    const welcomeMessage = document.createElement("p");
    welcomeMessage.innerHTML = `Välkommen till mitt quiz <br> 
    som på ett lekfullt sätt testar dig <br>
    på kluriga svenska ord. <br><br>
    Tryck på knappen för att starta quizet. <br>
    Lycka till!`;
    const startQuizButton = document.createElement("button");
    startQuizButton.className = "button"
    startQuizButton.innerText = "Start the quiz"


    elementBox.append(welcomeMessage, startQuizButton);

    startQuizButton.addEventListener("click", function (e) {
        e.preventDefault();
        console.log("du har klickat")
        clearDiv();
        showQuestionBlock(quizData); //funkar inte än
        return quizData;
    })
}



function createAnswerButtons() {
    const answerButtons = [];
    for (let i = 1; i < 5; i++) {
        const button = document.createElement("button");
        button.className = "button"
        button.id = `answer${i}`;
        answerButtons.push(button);
    }

}

function showQuestionBlock(quizData) {
    spaDiv.append(elementBox);

    const questionText = "";
    console.log(quizData);

    // questionText = runQuiz(quizData);

    elementBox.append();
}

function clearDiv() {
    spaDiv.remove(elementBox);
}



function runQuiz(q) {
    const index = Math.floor(q.length * Math.random());
    console.log(q[index].question)



};

welcome(spaDiv);
createAnswerButtons();