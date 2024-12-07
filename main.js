const quizBank = "OrdQuiz.json"

//hämta frågebank från JSON-filen
fetch(quizBank)
    .then(response => response.json())

    .then(quizData => runQuiz(quizData)

    );

// function showQuestionBlock() {
//     const questionBlock = 
// }

function runQuiz(q) {
    const index = Math.floor(q.length * Math.random());
    console.log(q[index].question)

};