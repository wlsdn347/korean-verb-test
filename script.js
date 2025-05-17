// Global variables
let currentQuestionIndex = 0;
let score = 0;
let selectedQuestions = [];
let currentCategory = '';

// Category selection function
function selectCategory(category) {
    currentCategory = category;
    document.getElementById('category-container').style.display = 'none';
    document.getElementById('start-container').style.display = 'block';
}

// Return to category selection screen
function showCategorySelection() {
    document.getElementById('category-container').style.display = 'block';
    document.getElementById('start-container').style.display = 'none';
    document.getElementById('test-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'none';
}

// Get questions for selected category
function getQuestionsForCategory() {
    switch(currentCategory) {
        case 'basic':
            return basicQuestions;
        case 'complex':
            return complexQuestions;
        case 'emotion':
            return emotionQuestions;
        case 'daily':
            return dailyQuestions;
        default:
            return [];
    }
}

// Random question selection function
function selectRandomQuestions() {
    const categoryQuestions = getQuestionsForCategory();
    
    // Fisher-Yates shuffle algorithm
    for (let i = categoryQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [categoryQuestions[i], categoryQuestions[j]] = [categoryQuestions[j], categoryQuestions[i]];
    }

    return categoryQuestions;
}

// Start test function
function startTest() {
    // Initialize questions and score
    selectedQuestions = selectRandomQuestions();
    currentQuestionIndex = 0;
    score = 0;
    
    // Display first question
    displayQuestion();
    
    // Hide start screen and show test screen
    document.getElementById('start-container').style.display = 'none';
    document.getElementById('test-container').style.display = 'block';
    document.getElementById('result-container').style.display = 'none';
}

// Display question function
function displayQuestion() {
    const questionContainer = document.getElementById('question-container');
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    const questionNumber = currentQuestionIndex + 1;
    
    questionContainer.innerHTML = `
        <p class="question-number">Question ${questionNumber} of 25</p>
        <p class="question-text">${currentQuestion.question}</p>
        <div class="options-container">
            ${currentQuestion.options.map((option, index) => `
                <button class="option-button" onclick="checkAnswer(${index})">${option}</button>
            `).join('')}
        </div>
    `;
}

// Check answer function
function checkAnswer(selectedIndex) {
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    const selectedAnswer = currentQuestion.options[selectedIndex];
    
    if (selectedAnswer === currentQuestion.correctAnswer) {
        score++;
    }
    
    currentQuestionIndex++;
    
    if (currentQuestionIndex < 25) {
        displayQuestion();
    } else {
        showResult();
    }
}

// Display result function
function showResult() {
    const percentage = (score / 25) * 100;
    const resultContainer = document.getElementById('result-container');
    const testContainer = document.getElementById('test-container');
    
    resultContainer.innerHTML = `
        <h2>Test Results</h2>
        <p>You got ${score} out of 25 questions correct!</p>
        <p>Accuracy: ${percentage}%</p>
        <div class="result-buttons">
            <button onclick="startTest()">Try Again</button>
            <button onclick="showCategorySelection()" class="secondary-button">Choose Different Category</button>
        </div>
    `;
    
    testContainer.style.display = 'none';
    resultContainer.style.display = 'block';
}

// Show category selection screen on page load
window.onload = function() {
    document.getElementById('start-container').style.display = 'none';
    document.getElementById('test-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'none';
};