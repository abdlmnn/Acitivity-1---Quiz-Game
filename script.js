const data = [
    {
        question: 'Which of the following best describes you?',
        options: ['Human', 'Robot', 'Alien'],
        correct: 0
    },{
        question: 'Where are you currently located?',
        options: ['Home', 'School', 'Gym'],
        correct: 1
    },{
        question: 'What are you currently doing?',
        options: ['Sleeping', 'Eating', 'Presenting'],
        correct: 2
    },{
        question: 'What is your gender?',
        options: ['Male', 'Female', 'Transformer'],
        correct: 0
    },{
        question: 'Which program are you enrolled in?',
        options: ['BSIS', 'BSIT', 'BSCS'],
        correct: 1
    },{
        question: 'What is your current year level?',
        options: ['1st year', '2nd year', '3rd year', '4th year'],
        correct: 2
    },{
        question: 'Are you alive?',
        options: ['Yes', 'No'],
        correct: 0
    }
];
const question = document.getElementById('question');
const answerButtons = document.getElementById('answerButtons');
const nextButton = document.getElementById('nextButton');
const showScore = document.getElementById('showScore');

let my_Score = 0;
let question_Index = 0;

function start(){
    my_Score = 0;
    question_Index = 0;
    
    nextButton.innerHTML = "Next";
    nextButton.style.display = "none";

    showScore.innerHTML = `Score: ${my_Score}`;

    display();
} 

function display(){
    reset();

    let my_Question = data[question_Index];

    question.innerHTML = my_Question.question;

    my_Question.options.forEach((answer, index) => {
        const button = document.createElement('button');

        button.className = "option-button";

        button.innerHTML = answer;

        button.addEventListener('click', () => select(index));

        answerButtons.appendChild(button);
    });
}

function reset(){
    nextButton.style.display = "none";
    answerButtons.innerHTML = "";
}

function select(your_Answer){
    const correct_Answer = data[question_Index].correct;

    if(your_Answer === correct_Answer){
        my_Score = my_Score + 1;

        showScore.innerHTML = `Score: ${my_Score}`;

        document.querySelectorAll('.option-button')[your_Answer].classList.add('correct');
    }
    else{
        document.querySelectorAll('.option-button')[your_Answer].classList.add('incorrect');
    }

    document.querySelectorAll('.option-button').forEach((button, index) => {
        button.disabled = true;

        if(index === correct_Answer){
            button.classList.add('correct');
        }
    });

    nextButton.style.display = "block";
}

function next(){
    question_Index = question_Index + 1;

    if(question_Index < data.length){
        display();
    }
    else{
        final();
    }
}

function final(){
    reset();

    showScore.innerHTML = `Final score: ${my_Score} / ${data.length}`;

    if(my_Score == data.length){
        question.innerHTML = "Great Job!"
    }
    else{
        question.innerHTML = "You can do better!"
    }
    
    nextButton.innerHTML = "Play Again";

    nextButton.style.display = "block";
}

nextButton.addEventListener('click', () => {
    if(question_Index < data.length){
        next();
    }
    else{
        start();
    }
});

start();