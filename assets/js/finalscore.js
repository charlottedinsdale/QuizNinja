window.onload = function() {
    const score = parseInt(localStorage.getItem('quizScore')) || 0;
    const totalQuestions = parseInt(localStorage.getItem('totalQuestions')) || 0;
    const percentage = Math.round((score / totalQuestions) * 100);
    
    // Display score with percentage
    const scoreDisplay = document.getElementById('final-score');
    scoreDisplay.textContent = ` ${score}/${totalQuestions} (${percentage}%)`;
    const beltColour = document.getElementById('belt-colour');
    beltColour.textContent = getBeltColour(percentage);
    
    // Display belt based on percentage
    const beltDisplay = document.getElementById('belt-display');
    const beltImage = document.createElement('img');
    beltImage.src = getBeltImageSrc(percentage);
    beltImage.alt = 'Belt Rank';
    beltImage.className = 'belt-image';
    beltDisplay.appendChild(beltImage);

    // Display sensei quote
    const quoteDisplay = document.getElementById('quote-display');
    quoteDisplay.textContent = "Keep your focus young one, the path to becoming a true warrior is long.";

    // Clear existing buttons
    const buttonContainer = document.querySelector('.button-container');
    buttonContainer.innerHTML = '';

    // Create "Restart Quiz" button (changed from Play Again)
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Play Again';
    restartButton.className = 'btn btn-warning orange-button';
    restartButton.onclick = function() {
        const topic = localStorage.getItem('currentTopic');
        localStorage.clear();
        window.location.href = `quizpage.html?topic=${topic}`;
    };
    buttonContainer.appendChild(restartButton);
    
    // Create "Return to Home" button (changed from Choose Another Quiz)
    const homeButton = document.createElement('button');
    homeButton.textContent = 'Choose another quiz';
    homeButton.className = 'btn btn-warning orange-button';
    homeButton.onclick = function() {
        localStorage.clear();
        window.location.href = 'index.html';
    };
    buttonContainer.appendChild(homeButton);
};

function getBeltImageSrc(percentage) {
    if (percentage >= 75) return 'assets/images/black-belt.png';
    if (percentage >= 50) return 'assets/images/green-belt.png';
    if (percentage >= 25) return 'assets/images/red-belt.png';
    else { return 'assets/images/white-belt.png';
}
}

function getBeltColour(percentage) {
    if (percentage >= 75) return 'BLACK';
    if (percentage >= 50) return 'RED';
    if (percentage >= 25) return 'GREEN';
    else { return 'WHITE';
}
}