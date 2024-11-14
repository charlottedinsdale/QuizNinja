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

 // Update button text
const playAgain = document.getElementById('end-button'); // No need for # in getElementById

// Set up button functionality
playAgain.addEventListener('click', clickPlayAgain); // Use 'click' event, not 'onclick'

function clickPlayAgain(e) {
    console.log('Button clicked!');
    const topic = localStorage.getItem('currentTopic'); // Retrieve the topic before clearing localStorage
    localStorage.clear(); // Clear localStorage after getting the topic
    window.location.href = `quizpage.html?topic=${topic}`; // Redirect with the topic
};
    

};

function getBeltImageSrc(percentage) {
    if (percentage >= 75) return 'assets/images/black-belt.png';
    if (percentage >= 50) return 'assets/images/red-belt.png';
    if (percentage >= 25) return 'assets/images/green-belt.png';
    else { return 'assets/images/white-belt.png';
};
}

function getBeltColour(percentage) {
    if (percentage >= 75) return 'BLACK';
    if (percentage >= 50) return 'RED';
    if (percentage >= 25) return 'GREEN';
    else { return 'WHITE';
};
}

