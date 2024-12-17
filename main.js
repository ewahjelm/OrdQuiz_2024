

const spaDiv = document.getElementById("root")
const quizBankEndpoint = "ordQuiz.json"

const elementBox = document.createElement("div");
elementBox.className = "element-box";

const welcomeMessage = document.createElement("p");
const startQuizButton = document.createElement("button");
const questionParagraph = document.createElement("p");
const feedbackField = document.createElement("div");
const reStartButton = document.createElement("button");
const countDownVisual = document.createElement("div");


var quizData = [];
var questionArrayIndex = 0;
var points = 0;
// OBS gör räknaren global iaf!!
var timeLeft = 10;
var questionAnswered = false;


// Fisher-Yates shuffle metod blandar ordningen på frågorna
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
//  #############     START   asyncront  hämtar och omvandlar data från API medan html-strukturen byggs  #######################

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
        addEventListenerToStartButton();
    })
    .catch(error => {
        console.error('Failed to fetch the JSON file.', error);
    });


//  #############     START asyncront  html-strukturen byggs medan data hämtas och omvandlas från API ovan   #######################

welcome();


function welcome() {
    spaDiv.append(elementBox);

    welcomeMessage.innerHTML = `Välkommen till mitt quiz <br> 
    som på ett lekfullt sätt testar dig <br>
    på 8 kluriga svenska ord. <br><br>
    Tryck på knappen för att starta quizet. <br>
    Lycka till!`;

    startQuizButton.className = "button"
    startQuizButton.innerText = "Start the quiz"


    elementBox.append(welcomeMessage, startQuizButton);

}


//  ###########     EFTER KLICK       ###############

function clickStart() {
    //  console.log("start klick - QuizData:", quizData)  // ny ordning efter restart
    clearDiv()  // börja från tom container

    // Bygger html struktur för quiz-block i elementBox : timer, <p>, 4 val-<button> och 1 nästa-<button> 
    buildAndAppendQuestionBlockHTML();

    // lägg till eventlyssnare efter att knappen skapats men före första frågan renderas
    // (vid restart gör vi clearDiv)
    addEventListenersToOptionButtons();

    //visar första frågan . Körs från questionArrayIndex = 0 satt och deklarerat högst upp i main.js
    renderNewQuestion();

}

// ny setup/HTML-struktur - ett fråge-block
function buildAndAppendQuestionBlockHTML() {
    console.log("Bygger fråge-blocket")

    countDownSetup(); // lägger till timer

    elementBox.append(questionParagraph); // lägger till <p>

    createAndAppendOptionButtons(); // 4 knappar för svarsalternativ skapas
    createAndAppendFeedbackField();
    createAndAppendNextButton();

}

//från början

function addEventListenerToStartButton() {
    console.log("datat hämtat")
    // lägg till listener efter att data hämtats men innan rendering")
    startQuizButton.addEventListener("click", clickStart);
}

/* function addEventListenersToOptionButtons() {
    for (let i = 0; i < 4; i++) {
        const chosenButton = document.getElementById(`opt-${i}`);
        chosenButton.addEventListener("click", function (event) {
            event.preventDefault();
            const choice = event.target;
            console.log("valt alternativ ! ", choice)
            questionAnswered = true;
            validateOptionClick(choice);
        });
    }
}
    */


// OBS att det behövs en anonym funktion för att hantera data utan att köra funktionen selectingAnswer direkt
/* function addEventListenersToOptionButtons() {
    for (let i = 0; i < 4; i++) {
        const chosenButton = document.getElementById(`opt-${i}`);
        chosenButton.addEventListener("click", selectingAnswer(chosenButton));
    }
}

function selectingAnswer(chosenButton) {
    questionAnswered = true;
    compareOptionToAnswer(chosenButton);
}

OBS Här har jag bakat ihop dessa två funktioner i den anonyma nedan ->
*/
/* 
function addEventListenersToOptionButtons() {
    for (let i = 0; i < 4; i++) {
        const chosenButton = document.getElementById(`opt-${i}`);
        chosenButton.addEventListener("click", function (event) {
            questionAnswered = true;
            // OBS HITTADE FELET NEDAN
            runCountDown();
            const clickedButton = event.target;
            compareOptionToAnswer(clickedButton);
        });
    }
} */

function addEventListenersToOptionButtons() {
    for (let i = 0; i < 4; i++) {
        const chosenButton = document.getElementById(`opt-${i}`);
        chosenButton.addEventListener("click", function (event) {
            event.preventDefault();
            questionAnswered = true;
            // OBS HITTADE FELET NEDAN  ELLER funkar det med global variabel??
            //  runCountDown();
            const clickedButton = event.target;
            compareOptionToAnswer(clickedButton);
        });
    }
}



function clearDiv() {
    elementBox.innerHTML = '';
}
// OBS KALLAS DENNA?
function showQuestionBlock() {
    spaDiv.append(elementBox);
}
// OBS sök Körs Och Kallas =



/* skapar varje frågas innehåll utifrån questionArrayIndex      
Körs     
1. En gång av clickStart när Quizet börjar   och
2. när användaren klickat på ett svarsalternativ (något option)
via rättning i compareOptionToAnswer 

3. för att starta nästa fråga.
se addEventListenersToOptionButtons -> (anonymfunktion lagrar vilken knapp)

*/
function renderNewQuestion() {   //  NÄR KÖRS  ?????????????????????????????????????????? 
    timeLeft = 10;
    feedbackField.innerText = "";
    questionAnswered = false;
    // renderar fråga till <p> utifrån questionArrayIndex
    questionParagraph.innerText = quizData[questionArrayIndex].question;


    // svarsalternativen renderas
    for (let i = 0; i < 4; i++) {
        // OBS Här under var det fel - Alternativen funkar nu
        const svarsknapp = document.getElementById(`opt-${i}`);
        svarsknapp.innerText = quizData[questionArrayIndex].options[i];
        svarsknapp.disabled = false;
    }
    runCountDown();  //  Körs endast härifrån  
}




function createAndAppendOptionButtons() {
    for (let i = 0; i < 4; i++) {
        const button = document.createElement("button");
        button.classList = "button options"
        button.id = `opt-${i}`;
        elementBox.append(button);
    }
    console.log("createAnswerButtons körd",)
}

function createAndAppendFeedbackField() {
    console.log("creating FeedbackField");
    feedbackField.id = "feedback-field";
    feedbackField.classList = "feedback";
    feedbackField.innerText = "";
    elementBox.append(feedbackField);
}

function createAndAppendNextButton() {
    const nextButton = document.createElement("button");
    nextButton.id = "next-button"
    nextButton.className = "button"
    nextButton.innerText = "Nästa fråga"
    // När knappen trycks kollas om något alternativ valts
    nextButton.addEventListener("click", validateAnOptionIsClicked)
    elementBox.append(nextButton)
}




/*Körs efter att användaren klickat på något av svarsalternativen:
Se anonym funktion i addEventListenersToOptionButtons som skickar valet vidare */
function compareOptionToAnswer(choice) {
    console.log("Jämför ditt svar med rätt svar")
    const selectedAnswer = choice.innerText;
    // console.log("Valt svar = ", selectedAnswer)
    const correctAnswer = quizData[questionArrayIndex].answer
    // console.log("Rätt svar = ", correctAnswer)

    // ge feedback för rätt resp fel svar
    giveFeedBack(selectedAnswer == correctAnswer);
    console.log(questionArrayIndex, "fråga index")
    console.log("OBS kontroll av questionAnswered: ", questionAnswered)

    //   OBS  clearInterval "blockscopad" -> gör om till global variabel.


    // efter 8 frågor är quizet slut
    if (questionArrayIndex >= 7) {
        disableOptions();
        endQuiz();
    } else {
        // efter rättning av fråga 1-7 körs nästa fråga
        questionArrayIndex++;
        enableOptions();
        renderNewQuestion();  ///  SKA nOG inte köras här  ??????????????????????????????????
    }
}

function giveFeedBack(wasCorrect) {
    if (wasCorrect) {
        console.log("giveFeedBack säger: Rätt!")
        points++;
        feedbackField.innerText = `Rätt!
        Du har nu ${points} poäng av 8`;

    } else {
        (console.log("giveFeedBack säger: Fel!"))
        feedbackField.innerText = `Fel, tyvärr.
        Du har nu ${points} poäng av 8`;
    }
}

// OBS  HUR KOMMER MAN FRÅN NEXT KNAPP om mna svarat fel

//    Körs endast  på klick från "Nästa fråga-knappen" - alltså om man inte valt något alternativ.
function validateAnOptionIsClicked() {
    console.log("validerar att du valt en knapp")
    // Om tiden gått ut får man ingen uppmaning att svara utan hamnar i ranOutOfTime istället.
    if (timeLeft <= 0) {
        ranOutOfTime(); // fortsätter att avsluta timer-session och vänta på klick nästa

        //eftersom man inte behöver trycka på nästa-knappen om man klickat på ett alternativ
    } else if (questionAnswered != true) {  ///FUNGERAR??
        console.log("du har inte tryckt på något alternativ")
        feedbackField.innerText = "Chansa, vetja! Hälften vunnet..."
        // tiden har inte gått ut &   jag har svarat -> körs svar från optionbutton med questionAnswered true-> compare  OBS
    } else return;
}





function disableOptions() {
    const optionButtons = document.getElementsByClassName("options");
    for (let i = 0; i < optionButtons.length; i++) {
        optionButtons[i].disabled = true;
    }
}
function enableOptions() {
    const optionButtons = document.getElementsByClassName("options");
    for (let i = 0; i < optionButtons.length; i++) {
        optionButtons[i].enabled = true;
    }
}

// Quizzet avslutas parametrar nollställs
function endQuiz() {

    clearDiv();
    //  console.log("quiz klart")

    reStartButton.className = "button"
    reStartButton.innerText = "Restart the quiz"

    elementBox.append(questionParagraph, reStartButton);
    // lägger till <p>
    questionParagraph.innerHTML = `Nu är quizet slut. <br> Du fick ${points} poäng av 8 möjliga. <br> Vill du ta testet igen?`
    points = 0;
    randomizeArray(quizData);
    questionArrayIndex = 0;

    // lyssnar efter signal att starta om
    reStartButton.addEventListener("click", clickStart)


}


function countDownSetup() {
    countDownVisual.id = "interval-timer";
    elementBox.append(countDownVisual);
    console.log("countDownSetup - nedräknare tillagd")
}

// OBS GEMINIS KOD:
// OBS NÄR i koden ska timern tas bort med clearInterval?

// Kör en global nedräknare
function runCountDown() {
    let countDown = setInterval(() => {
        // Körs när frågan besvarats- alltså via validateAnOptionIsClicked
        if (questionAnswered === true) {
            resetTimer(countDown);
            disableOptions();
            countDownVisual.innerText = "Du svarade innan tiden gick ut!";  // OBS ta bort
            return; // Avslutar denna funktionen när ett val gjorts -> fortsätter visa feedback i väntan på nytt klick på nästa 
        }
        // Om frågan inte är besvarad och count är större än 0, fortsätt nedräkningen
        if (timeLeft > 0) {
            countDownVisual.innerText = `${timeLeft} sekunder kvar`;
            console.log("count: ", timeLeft);
            timeLeft--;
        } else { // Om inget svar valts & tiden tar slut
            ranOutOfTime(countDown);
            // fortsätter med klick på nästa-knappen med validateAnOptionIsClicked
        }
    }, 1000);
}

function resetTimer(countDown) {
    clearInterval(countDown);
    timeLeft = 10;  // starta tid vid ny fråga istället
}

/* Körs OBS  & åtkomst till countDown    ???????????????????????????????????
1. Om tiden tar slut utan att något val gjorts
2. 
*/
function ranOutOfTime(countDown) {
    disableOptions();
    countDownVisual.innerText = "Ajdå! Du hann visst inte svara.";
    feedbackField.innerText = "Du har 10 sekunder på dig på varje fråga.";
    resetTimer(countDown);
    // fortsätter vid knapptryck på nästa
}

/* // Skapar en nedräknare     FUNKAR INTE HELLER
function runCountDown() {
    let count = 10;

    // setInterval() skapar en loop som körs med jämna mellanrum. I detta fall varje sekund. 
    const countDown = setInterval(() => {
        console.log("svarat på frågan? : ", questionAnswered)
        if (questionAnswered == true) {  // Avbryter intervallet när det inte längre behövs för att undvika oändliga loopar.           
            clearInterval(countDown);
            disableOptions();
            return;
        } else
            if (count > 0) {
                countDownVisual.innerText = `${count} sekunder kvar`;
                console.log("count: ", count);

            } else {     // Avbryter intervallet med time-out efter 10 s.
                clearInterval(countDown);
                disableOptions();
                countDownVisual.innerText = "Ajdå! Du hann visst inte svara."
                feedbackField.innerText = "Du har 10 sekunder på dig på varje fråga."
            }
        count--;
    }, 1000); //setInterval slut  feedback varje sekund (1000 ms)
} 

OBS FEL nedan pga oändlig fortsättning om count > 0 !!  Behövs return på RÄTT ställe - Bra försök Ewa ;)

// Skapar en nedräknare 
function runCountDown() {
    let count = 10;

    // setInterval() skapar en loop som körs med jämna mellanrum. I detta fall varje sekund. 
    const countDown = setInterval(() => {
        if (questionAnswered == true) {  // Avbryter intervallet när det inte längre behövs för att undvika oändliga loopar.           
            clearInterval(countDown);
        } else
            if (count > 0) {
                countDownVisual.innerText = `${count} sekunder kvar`;
                console.log("count: ", count);

            } else {     // Avbryter intervallet med time-out efter 10 s.
                clearInterval(countDown);
                disableOptions();
                countDownVisual.innerText = "Ajdå! Du hann visst inte svara."
                feedbackField.innerText = "Du har 10 sekunder på dig på varje fråga."
            }
        count--;
    }, 1000); //setInterval slut  feedback varje sekund (1000 ms)
}

// function stopCountDown(){} // OBS finns redan inbyggt clearInterval(id)
*/