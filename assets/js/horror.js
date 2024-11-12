document.addEventListener('DOMContentLoaded', function() {
    // Array of questions for the horror movies quiz
    const horrorQuestions = [
        {
            question: "What is the name of the killer in the 'A Nightmare on Elm Street' series?",
            answers: [
                { text: "Michael Myers", correct: false },
                { text: "Freddy Krueger", correct: true },
                { text: "Jason Voorhees", correct: false },
                { text: "Ghostface", correct: false }
            ]
        },
        {
            question: "Which 1980s horror movie features a group of teenagers being stalked by a killer at a summer camp?",
            answers: [
                { text: "The Shining", correct: false },
                { text: "The Texas Chainsaw Massacre", correct: false },
                { text: "Friday the 13th", correct: true },
                { text: "The Exorcist", correct: false }
            ]
        },
        {
            question: "What is the name of the haunted hotel in 'The Shining'?",
            answers: [
                { text: "The Overlook Hotel", correct: true },
                { text: "The Bates Motel", correct: false },
                { text: "The Briarcliff Manor", correct: false },
                { text: "The Colehaven Hotel", correct: false }
            ]
        },
        {
            question: "Which 1980s horror movie features a killer doll?",
            answers: [
                { text: "Poltergeist", correct: false },
                { text: "The Thing", correct: false },
                { text: "Child's Play", correct: true },
                { text: "Hellraiser", correct: false }
            ]
        },
        {
            question: "What is the name of the killer doll in the 'Child's Play' series?",
            answers: [
                { text: "Pennywise", correct: false },
                { text: "Chucky", correct: true },
                { text: "Annabelle", correct: false },
                { text: "Slappy", correct: false }
            ]
        }
    ];

    let currentQuestion = 0;
    let score = 0;

    // Get DOM elements
    const startButton3 = document.getElementById("start-button3");
    const quizContainer = document.getElementById("quiz-container");
    const heroContainer = document.getElementById("hero-container");
    const questionText = document.getElementById("question-text");
    const answerButtonsElement = document.getElementById("answer-buttons");
    const feedbackElement = document.getElementById("feedback");
    const scoreElement = document.getElementById("score");

    // Add click event to start button
    console.log("Horror Quiz initialized");
    if (startButton3) {
        startButton3.addEventListener("click", function() {
            console.log("Horror Quiz Button Clicked");
            startQuiz();
        });
    }

    function startQuiz() {
        // Hide hero section and show quiz
        heroContainer.style.display = 'none';
        quizContainer.style.display = 'block';
        
        // Reset quiz state
        currentQuestion = 0;
        score = 0;
        scoreElement.textContent = `Score: ${score}/${horrorQuestions.length}`;
        loadQuestion();
    }

    function loadQuestion() {
        feedbackElement.textContent = '';
        answerButtonsElement.innerHTML = '';
        questionText.textContent = horrorQuestions[currentQuestion].question;
        
        horrorQuestions[currentQuestion].answers.forEach(answer => {
            const button = document.createElement("button");
            button.textContent = answer.text;
            button.classList.add("btn", "btn-warning", "orange-button", "m-2");
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

        if (isCorrect) {
            score++;
            feedbackElement.textContent = "Correct!";
            feedbackElement.className = "text-success mt-3";
        } else {
            feedbackElement.textContent = "Incorrect!";
            feedbackElement.className = "text-danger mt-3";
        }

        scoreElement.textContent = `Score: ${score}/${horrorQuestions.length}`;
        
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

        setTimeout(() => {
            currentQuestion++;
            if (currentQuestion < horrorQuestions.length) {
                loadQuestion();
            } else {
                endQuiz();
            }
        }, 1500);
    }

    function endQuiz() {
        answerButtonsElement.innerHTML = '';
        questionText.textContent = "Quiz Complete!";
        feedbackElement.textContent = `Final Score: ${score}/${horrorQuestions.length}`;
        feedbackElement.className = "mt-3";
        
        const restartButton = document.createElement("button");
        restartButton.textContent = "Restart Quiz";
        restartButton.classList.add("btn", "btn-primary", "mt-3");
        restartButton.addEventListener("click", startQuiz);
        answerButtonsElement.appendChild(restartButton);
        
        const menuButton = document.createElement("button");
        menuButton.textContent = "Return to Menu";
        menuButton.classList.add("btn", "btn-secondary", "mt-3", "ms-2");
        menuButton.addEventListener("click", () => {
            quizContainer.style.display = 'none';
            heroContainer.style.display = 'block';
        });
        answerButtonsElement.appendChild(menuButton);
    }
});