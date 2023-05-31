//localStorage.removeItem("QuestionsArray");

const questions=JSON.parse(localStorage.getItem("QuestionsArray"));
if(questions===undefined){
    questions=[];
}
console.log(questions);

function getValue(params) {
    var input = document.getElementById("question");
    var qstn= input.value;
    console.log(qstn);

    var op1=document.getElementById("opt1").value;
    var c1=document.getElementById("cr1").value;

    var op2=document.getElementById("opt2").value;
    var c2=document.getElementById("cr2").value;

    var op3=document.getElementById("opt3").value;
    var c3=document.getElementById("cr3").value;

    var op4=document.getElementById("opt4").value;
    var c4=document.getElementById("cr4").value;

    const que={
        question:qstn,
        answers: [
            {text: op1, correct:c1},
            {text: op2, correct:c2},
            {text: op3, correct:c3},
            {text: op4, correct:c4},     
        ]
    }
    questions.push(que);
    var stringifiedArray= JSON.stringify(questions);
    localStorage.setItem("QuestionsArray",stringifiedArray);

    const form = document.getElementById('myForm');

      form.addEventListener('submit', (event) => {
        event.preventDefault(); 
        form.reset();
      });
}

const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");
let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML = "Next";
    showQuestion();
}


function showQuestion(params) {
    resetState();
    console.log(questions);
    
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+". "+currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button = document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct ==="true";
    if(isCorrect){
        score++;
        selectedBtn.classList.add("correct");
        
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display ="block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length} !`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
    
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();