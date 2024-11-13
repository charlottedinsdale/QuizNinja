window.onload = function() {
    const score = parseInt(localStorage.getItem('quizScore')) || 0;
    const totalQuestions = parseInt(localStorage.getItem('totalQuestions')) || 0;
    const percentage = Math.round((score / totalQuestions) * 100);
    
    // Display score with percentage
    const scoreDisplay = document.getElementById('score-display');
    scoreDisplay.innerHTML = `Score: ${score}/${totalQuestions} (${percentage}%)<br>`;
    
    // Determine belt and add text and image directly to score display
    let beltColor = getBeltColor(percentage);
    let beltImage = getBeltImageSrc(percentage);
    
    scoreDisplay.innerHTML += `
        <div style="display: flex; justify-content: center; align-items: center; gap: 10px; margin-top: 20px;">
            <span style="color: white;">You have been awarded a ${beltColor}</span>
            <img src="${beltImage}" alt="${beltColor}" style="width: 50px; height: auto;">
        </div>
    `;

    // Display sensei quote
    const quoteDisplay = document.getElementById('quote-display');
    quoteDisplay.textContent = "Keep your focus young one, the path to becoming a true warrior is long.";

    // Update button text
    const bottomButtons = document.querySelectorAll('.hero-section-text .orange-button');
    
    // Set up button functionality
    bottomButtons[0].textContent = 'Play Again';
    bottomButtons[0].onclick = function() {
        const topic = localStorage.getItem('currentTopic');
        localStorage.clear();
        window.location.href = `quizpage.html?topic=${topic}`;
    };
    
    bottomButtons[1].textContent = 'Choose another quiz';
    bottomButtons[1].onclick = function() {
        localStorage.clear();
        window.location.href = 'index.html';
    };
};

function getBeltImageSrc(percentage) {
    if (percentage >= 75) return 'assets/images/black-belt.png';
    if (percentage >= 50) return 'assets/images/green-belt.png';
    if (percentage >= 25) return 'assets/images/red-belt-draft.png';
    return 'assets/images/white-belt.png';
}

function getBeltColor(percentage) {
    if (percentage >= 75) return 'Black Belt';
    if (percentage >= 50) return 'Green Belt';
    if (percentage >= 25) return 'Red Belt';
    return 'White Belt';
}