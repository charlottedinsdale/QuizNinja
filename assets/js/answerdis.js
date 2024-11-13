const successQuotes = [
    "Well done, young one. Your focus is sharp, like a blade in the wind.",
    "You've found your path, now walk it with honor.",
    "The strength was in your heart, not your hands.",
    "You've taken the first step; now keep your footing steady.",
    "Like the moon in the sky, your skill is rising high.",
    "Your mind is clear, your spirit strong—keep that balance.",
    "The shadow you cast is brighter than the sun today."
];

const failureQuotes = [
    "The path is long, but the stones beneath your feet are your lessons.",
    "A leaf falls not because it is weak, but because it knows the wind.",
    "Do not fear the fall, for it teaches you how to rise.",
    "Failure is not the end, but the beginning of growth.",
    "The bamboo bends in the storm, yet does not break.",
    "Every mistake is a step toward mastery.",
    "To stumble is human; to rise again, a true warrior's way."
];

function getRandomQuote(quotes) {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

window.onload = function() {
    const isCorrect = localStorage.getItem('isCorrect') === 'true';
    const headingElement = document.querySelector('.heading');
    const heroText = document.querySelector('.hero-section-text');

    if (isCorrect) {
        headingElement.textContent = "Correct Answer!";
        
        const quoteElement = document.createElement('p');
        quoteElement.className = 'sensei-phrase';
        quoteElement.textContent = getRandomQuote(successQuotes);
        heroText.appendChild(quoteElement);
    } else {
        headingElement.textContent = "Incorrect Answer";
        
        const quoteElement = document.createElement('p');
        quoteElement.className = 'sensei-phrase';
        quoteElement.textContent = getRandomQuote(failureQuotes);
        heroText.appendChild(quoteElement);
    }

    // Add continue button
    const continueButton = document.createElement('button');
    continueButton.textContent = 'Next Question';
    continueButton.classList.add('btn', 'btn-warning', 'orange-button', 'mt-3');
    continueButton.onclick = function() {
        const topic = localStorage.getItem('currentTopic');
        window.location.href = `quizpage.html?topic=${topic}`;
    };
    heroText.appendChild(continueButton);
}