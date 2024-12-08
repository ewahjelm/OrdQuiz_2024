/* Vad ska köras onload?:
Welcome message
startbutton

*/
var spaDiv = document.getElementById("root")
const quizBank = "ordQuiz.json"
const elementBox = document.createElement("section");

//hämtar frågebank från JSON-filen
fetch(quizBank)
    .then(response => response.json())

    .then(quizData => runQuiz(quizData)

    );

// function showQuestionBlock() {
//     const questionBlock = 
// }
function clearDiv(spaDiv) {
    spaDiv.children.remove();
}

function welcome(spaDiv) {
    const welcomeMessage = document.createElement("p");
    welcomeMessage.innerHTML = `Välkommen till mitt quiz <br> 
    som på ett lekfullt sätt testar dig <br>
    på kluriga svenska ord. <br><br>
    Tryck på knappen för att starta quizet. <br>
    Lycka till!`;
    const startQuizButton = document.createElement("button");
    startQuizButton.className = "button"
    startQuizButton.innerText = "Start the quiz"

    /* spaDiv.append(elementBox);
    elementBox.append(welcomeMessage, startQuizButton); */

    startQuizButton.addEventListener("click", function (e) {
         e.preventDefault(); 
        console.log("du har klickat")
        clearDiv(spaDiv);
    })
}
// welcome(spaDiv);

function runQuiz(q) {
    const index = Math.floor(q.length * Math.random());
    console.log(q[index].question)

};