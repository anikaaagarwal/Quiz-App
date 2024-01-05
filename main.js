const questions = [{
        question: "What is the smallest unit of matter?",
        answers: [
            { text: "Atom", correct: true },
            { text: "Molecule", correct: false },
            { text: "Cell", correct: false },
            { text: "Particle", correct: false },
        ]
    },
    {
        question: "Who developed the theory of relativity?",
        answers: [
            { text: "Isaac Newton", correct: false },
            { text: "Galileo Galilei", correct: false },
            { text: "Albert Einstein", correct: true },
            { text: "Niels Bohr", correct: false },
        ]
    },
    {
        question: "What is the powerhouse of the cell?",
        answers: [
            { text: "Nucleus", correct: false },
            { text: "Mitochondria", correct: true },
            { text: "Endoplasmic reticulum", correct: false },
            { text: "Chloroplast", correct: false },
        ]
    },
    {
        question: "Who discovered penicillin?",
        answers: [
            { text: "Alexander Fleming", correct: true },
            { text: "Louis Pasteur", correct: false },
            { text: "Marie Curie", correct: false },
            { text: "Antoine Lavoisier", correct: false },
        ]
    },
    {
        question: "What is the chemical symbol for gold?",
        answers: [
            { text: "Ag", correct: false },
            { text: "Fe", correct: false },
            { text: "Au", correct: true },
            { text: "Cu", correct: false },
        ]
    },
    {
        question: "Who is known as the father of modern physics?",
        answers: [
            { text: "Isaac Newton", correct: false },
            { text: "Albert Einstein", correct: true },
            { text: "Galileo Galilei", correct: false },
            { text: "Niels Bohr", correct: false },
        ]
    },
    {
        question: "What is the chemical formula for water?",
        answers: [
            { text: "CO2", correct: false },
            { text: "O2", correct: false },
            { text: "CH4", correct: false },
            { text: "H2O", correct: true },
        ]
    },
    {
        question: "Who discovered the law of gravity?",
        answers: [
            { text: "Isaac Newton", correct: true },
            { text: "Galileo Galilei", correct: false },
            { text: "Johannes Kepler", correct: false },
            { text: "Albert Einstein", correct: false },
        ]
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: [
            { text: "Mars", correct: false },
            { text: "Saturn", correct: false },
            { text: "Jupiter", correct: true },
            { text: "Neptune", correct: false },
        ]
    },
    {
        question: "Who proposed the heliocentric model of the solar system?",
        answers: [
            { text: "Galileo Galilei", correct: false },
            { text: "Nicolaus Copernicus", correct: true },
            { text: "Johannes Kepler", correct: false },
            { text: "Isaac Newton", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionN0 = currentQuestionIndex + 1;
    questionElement.innerHTML = questionN0 + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Your score: ${score}/${questions.length}`;
    nextButton.innerHTML = " PLAY AGAIN ";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();