var questiontAPI = 'http://localhost:3000/patient/test';

// fetch all data patient
function fetchDataQuestion() {
    fetch(questiontAPI)
    .then(result => {
        return result.json();
    }).then(data =>{
        console.log(data);
        const html = data.map(questions =>{
            return `Question: ${questions.question} ?<br>`;
        }).join();
        document.querySelector("#getQuestion").insertAdjacentHTML("afterbegin", html);
    }).catch((err) => {
        console.log('message error :'+ err)
    });
}
fetchDataQuestion();