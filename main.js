/* Vad ska köras onload?:
welcome()
startbutton

*/
var spaDiv = document.getElementById("root")
const quizBankEndpoint = "ordQuiz.json"
const elementBox = document.createElement("section");
elementBox.id = "question-block";

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
        showQuestionBlock();
    })
}


//hämtar frågebank från JSON-filen
const getQuizBank = async () => {
    const quizBank = await fetch(quizBankEndpoint);
if (quizBank.status !== 200) {
    throw new Error( "Kan inte hitta datan. Kolla att du har rätt endpoint i anropet.")
}
const quizData = await quizBank.json();
return quizData;
};
    /* .then(response => response.json())

    .then(quizData => runQuiz(quizData)); */


function showQuestionBlock() {
    spaDiv.append(elementBox);
   /*  for (i = 1; i < 5; i++) {
        const answerButton = document.createElement("button");
        answerButton.className = "button"
        answerButton.id = `answer${i}`;
    
    } */
}
function clearDiv() {
    elementBox.remove();
}



function runQuiz(q) {
    const index = Math.floor(q.length * Math.random());
    console.log(q[index].question)


};

welcome(spaDiv);