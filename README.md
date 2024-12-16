# OrdQuiz_2024
SPA Quix på temat Ord med dynamiska flervalsfrågor


/* Vad ska köras hur?:
onload:
getQuizBank() fetch json async -> sparar data i quizData
OBS att data bara borde tilldelas här 1 gång men const funkar inte
    welcome() : add elementBox. display text & startbutton



startbutton, onclick:
    getRandomQuestion() -> quizData.question[i]
    runQuiz() : starta timer på 10 sek
    clearDiv() remove elementBox (containing welcome-block)
    showQuestionBlock():  
                add elementBox (question-block)
                create pQuestion with data from fetched quizData
                create 4 buttons  - ta bort  o skapa igen . eller byt ut innehållet

*/

mer pseudokod, påbörjat refaktorering. En variabel för mycket