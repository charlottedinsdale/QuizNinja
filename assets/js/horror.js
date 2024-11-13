//     // Array of questions for the horror movies quiz
    const questions = [
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

    // DOM elements
    const quizContainer = document.getElementById("quiz-container");
    const heroContainer = document.getElementById("hero-container");
    const questionText = document.getElementById("question-text");
    const answerButtonsElement = document.getElementById("answer-buttons");
    const feedbackElement = document.getElementById("feedback");
    const scoreElement = document.getElementById("score");

    // Start quiz automatically when page loads
    window.onload = function () {
        startQuiz();
    };

    function startQuiz() {
        // Show quiz (no need to hide hero section as it's a new page)
        quizContainer.style.display = 'block';
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

        //Home Button
        const homeButton = document.createElement("button");
        homeButton.textContent = "Return to Home";
        homeButton.classList.add("btn", "btn-secondary", "mt-3", "ms-2");
        homeButton.addEventListener("click", () => {
            window.location.href = 'index.html';
        });
        answerButtonsElement.appendChild(homeButton);
    }