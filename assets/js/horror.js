// Array of questions for the quiz
const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Paris", correct: true },
            { text: "London", correct: false },
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false }
        ]
    },
    {
        question: "What is the capital of Japan?",
        answers: [
            { text: "Beijing", correct: false },
            { text: "Seoul", correct: false },
            { text: "Tokyo", correct: true },
            { text: "Bangkok", correct: false }
        ]
    },
    {
        question: "What is the capital of Brazil?",
        answers: [
            { text: "Brasília", correct: true },
            { text: "Rio de Janeiro", correct: false },
            { text: "São Paulo", correct: false },
            { text: "Lima", correct: false }
        ]
    },
    {
        question: "What is the capital of Australia?",
        answers: [
            { text: "Sydney", correct: false },
            { text: "Melbourne", correct: false },
            { text: "Canberra", correct: true },
            { text: "Perth", correct: false }
        ]
    }

    //add three more questions
];

let currentQuestion = 0;
let score = 0;

// Get DOM elements
const startButton = document.getElementById("start-button3");
const quizContainer = document.getElementById("quiz-container");
const heroContainer = document.getElementById("hero-container");
const questionText = document.getElementById("question-text");
const answerButtonsElement = document.getElementById("answer-buttons");
const feedbackElement = document.getElementById("feedback");
const scoreElement = document.getElementById("score");

// Add event listener to start button
startButton.addEventListener("click", startQuiz);

function startQuiz() {
    // Hide hero section and show quiz
    heroContainer.style.display = 'none';
    quizContainer.style.display = 'block';
    
    // Reset quiz state
    currentQuestion = 0;
    score = 0;
    scoreElement.textContent = `Score: ${score}/${questions.length}`;
    loadQuestion();
}

function loadQuestion() {
    // Clear previous feedback
    feedbackElement.textContent = '';
    
    // Clear previous answer buttons
    answerButtonsElement.innerHTML = '';
    
    // Load current question
    questionText.textContent = questions[currentQuestion].question;
    
    // Create answer buttons
    questions[currentQuestion].answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("btn", "btn-warning", "m-2"); // Using Bootstrap classes
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    // Update score and feedback
    if (isCorrect) {
        score++;
        feedbackElement.textContent = "Correct!";
        feedbackElement.className = "text-success mt-3";
    } else {
        feedbackElement.textContent = "Incorrect!";
        feedbackElement.className = "text-danger mt-3";
    }

    // Update score display
    scoreElement.textContent = `Score: ${score}/${questions.length}`;
    
    // Disable all buttons after selection
    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
            button.classList.remove("btn-warning");
            button.classList.add("btn-success");
        } else if (button === selectedButton) {
            button.classList.remove("btn-warning");
            button.classList.add("btn-danger");
        }
    });

    // Wait before moving to next question
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            endQuiz();
        }
    }, 1500);
}

function endQuiz() {
    answerButtonsElement.innerHTML = '';
    questionText.textContent = "Quiz Complete!";
    feedbackElement.textContent = `Final Score: ${score}/${questions.length}`;
    feedbackElement.className = "mt-3";
    
    // Add restart button
    const restartButton = document.createElement("button");
    restartButton.textContent = "Restart Quiz";
    restartButton.classList.add("btn", "btn-primary", "mt-3");
    restartButton.addEventListener("click", () => {
        startQuiz();
    });
    answerButtonsElement.appendChild(restartButton);
    
    // Add return to menu button
    const menuButton = document.createElement("button");
    menuButton.textContent = "Return to Menu";
    menuButton.classList.add("btn", "btn-secondary", "mt-3", "ms-2");
    menuButton.addEventListener("click", () => {
        quizContainer.style.display = 'none';
        heroContainer.style.display = 'block';
    });
    answerButtonsElement.appendChild(menuButton);
}