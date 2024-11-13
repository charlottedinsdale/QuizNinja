    // Array of questions for the song lyrics quiz
    const questions = [
        {
            question: "What is the opening line to the song 'Wonderwall' by Oasis?",
            answers: [
                { text: "Today is gonna be the day", correct: true },
                { text: "Maybe", correct: false },
                { text: "I don't believe that anybody", correct: false },
                { text: "Backbeat, the word is on the street", correct: false }
            ]
        },
        {
            question: "Which song by The Police features the lyric: 'Every breath you take, and every move you make'?",
            answers: [
                { text: "Message in a Bottle", correct: false },
                { text: "Every Breath You Take", correct: true },
                { text: "Roxanne", correct: false },
                { text: "Don't Stand So Close to Me", correct: false }
            ]
        },
        {
            question: "Complete the Queen lyrics: 'Is this the real life...'",
            answers: [
                { text: "Is this just fantasy?", correct: true },
                { text: "Or is this just a dream?", correct: false },
                { text: "Is this the final scene?", correct: false },
                { text: "What's the reality?", correct: false }
            ]
        },
        {
            question: "Which song by The Smiths features the lyric: 'There is a light that never goes out'?",
            answers: [
                { text: "How Soon Is Now?", correct: false },
                { text: "This Charming Man", correct: false },
                { text: "There Is a Light That Never Goes Out", correct: true },
                { text: "Heaven Knows I'm Miserable Now", correct: false }
            ]
        },
        {
            question: "What is the opening line to the song 'Sweet Dreams (Are Made of This)' by Eurythmics?",
            answers: [
                { text: "Sweet dreams are made of this", correct: true },
                { text: "I travel the world and the seven seas", correct: false },
                { text: "Everybody's looking for something", correct: false },
                { text: "Hold your head up, keep your head up", correct: false }
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