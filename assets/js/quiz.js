//Quiz Ninja Image Loop
document.addEventListener("DOMContentLoaded", function(){

    // Array of 4 ninja images
    const ninjaImages = [
        'assets/images/ninja-with-nunchucks.png',
        'assets/images/ninja-with-sword.png',
        'assets/images/ninja-throwing-star.png',
        'assets/images/ninja-holding-stars.png'
    ];

    // Get the current image index from localStorage, or default to 0 if not found
    let currentImageIndex = parseInt(localStorage.getItem('ninjaImageIndex')) || 0;

    // Update the image element with the ID 'quiz-ninja'
    const ninjaImageElement = document.getElementById('quiz-ninja');
    if (ninjaImageElement) {
        ninjaImageElement.src = ninjaImages[currentImageIndex];

        // Increment the index for the next page load and loop back to 0 if necessary
        currentImageIndex = (currentImageIndex + 1) % ninjaImages.length;

        // Save the updated index in localStorage
        localStorage.setItem('ninjaImageIndex', currentImageIndex.toString());
    } else {
        console.error('Ninja Image Element with ID "quiz-ninja" not found.');
    }
});
