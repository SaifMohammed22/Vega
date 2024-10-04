/* Back to top button */
const backToTopButton = document.querySelector("#back-to-top");

window.addEventListener("scroll", scrollFunction);

function scrollFunction() {
    if (window.pageYOffset > 500) { // Show button
        if (!backToTopButton.classList.contains("btnEntrance")) {
            backToTopButton.classList.remove("btnExit");
            backToTopButton.classList.add("btnEntrance");
            backToTopButton.style.display = "block";
        }
    }
    else { // Hide button
        if (backToTopButton.classList.contains("btnEntrance")) {
            backToTopButton.classList.remove("btnEntrance");
            backToTopButton.classList.add("btnExit");
            setTimeout(function () {
                backToTopButton.style.display = "none";
            }, 250);
        }
    }
}

backToTopButton.addEventListener("click", backToTop);

function backToTop() {
    window.scrollTo(0, 0);
}

/* Quiz */

/* Qustions */
let questions = [
    {
        numb: 1,
        question: "What is the most common method to discover exoplanets?",
        answer: "C. Transit Method",
        options: [
            "A. Radial Velocity Method",
            "B. Direct Imaging",
            "C. Transit Method",
            "D. Wobbling Star Technique"
        ]
    },
    {
        numb: 2,
        question: "Which exoplanet is our closest neighbor to the Solar System?",
        answer: "B. Proxima Cen b",
        options: [
            "A. 51 Pegasi b",
            "B. Proxima Cen b",
            "C. Kepler-186 f",
            "D. TRAPPIST-1e"
        ]
    },
    {
        numb: 3,
        question: "Which planet has the shortest year, completing it's orbit in less than 18 hours?",
        answer: "C. 55 Cancri e",
        options: [
            "A. 51 Pegasi b",
            "B. Kepler-186 f",
            "C. 55 Cancri e",
            "D. COCONUTS-2b"
        ]
    },
    {
        numb: 4,
        question: "Which exoplanet has the largest mass, suggesting it may be a gas giant?",
        answer: "C. HD 100546 b",
        options: [
            "A. TRAPPIST-1e",
            "B. Kepler-186 f",
            "C. HD 100546 b",
            "D. Proxima Cen b"
        ]
    },
    {
        numb: 5,
        question: "What makes Proxima Cen b a potential candidate for habitability?",
        answer: "B. It orbits within its star's habitable zone",
        options: [
            "A. It is a gas giant with extreme temperatures",
            "B. It orbits within its star's habitable zone",
            "C. It completes an orbit in less than 18 hours",
            "D. It has an atmosphere similar to Earth"
        ]
    },
    {
        numb: 6,
        question: "Why is 51 Pegasi b important in exoplanet discovery?",
        answer: "A. It was the first planet ever discovered orbiting a star like Sun",
        options: [
            "A. It was the first planet ever discovered orbiting a star like Sun",
            "B. It is the closest planet to Earth",
            "C. It is the first exoplanet considered habitable",
            "D. It has the largest radius of any known exoplanet"
        ]
    },
    {
        numb: 7,
        question: "What is the unique feature of COCONUTS-2b's orbit?",
        answer: "D. It takes over a million Earth years to orbit its star",
        options: [
            "A. It has the shortest orbit of any known planet",
            "B. It has an orbit within the habitable zone",
            "C. It completes an orbit in only 4 days",
            "D. It takes over a million Earth years to orbit its star"
        ]
    },
    {
        numb: 8,
        question: "How do scientists use the transit method to detect exoplanets?",
        answer: "B. Observing dip in star's brightness as planet passes in front",
        options: [
            "A. Watching wobbling stars caused by the gravitational pull",
            "B. Observing dip in star's brightness as planet passes in front",
            "C. Measuring temperature changes in the star's atmosphere",
            "D. Capturing direct images of the exoplanet using a telescope"
        ]
    },
    {
        numb: 9,
        question: "What is a 'super-Earth'?",
        answer: "A. A planet larger than Earth, but smaller than gas giants like Jupiter",
        options: [
            "A. A planet larger than Earth, but smaller than gas giants like Jupiter",
            "B. A planet that orbits its star very closely",
            "C. A planet much larger than Jupiter",
            "D. A planet with conditions identical to Earth"
        ]
    },
    {
        numb: 10,
        question: "Exoplanet with one of the hottest surfaces due to close orbit?",
        answer: "C. 55 Cancri e",
        options: [
            "A. TRAPPIST-1e",
            "B. Proxima Cen b",
            "C. 55 Cancri e",
            "D. Kepler-186 f"
        ]
    },
];

let score = 0; // Track the user's score
let currentQuestion = 0; // Start with the first question

// Function to show questions
function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    const options = document.querySelectorAll('.option');
    const questionTotal = document.querySelector('.question-total');
    const headerScore = document.querySelector('.header-score');

    // Display the current question and its options
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;
    options.forEach((option, i) => {
        option.textContent = questions[index].options[i];

        // Remove previously applied classes to reset options
        option.classList.remove('selected', 'wrong', 'correct', 'disabled');
    });

    // Update the total questions indicator
    questionTotal.textContent = `${index + 1} of ${questions.length} Questions`;

    // Update score display in the header
    headerScore.textContent = `Score: ${score} / ${questions.length}`;

    // Reset all option styles and enable them for the next question
    options.forEach(opt => {
        opt.classList.remove('selected', 'wrong', 'disabled');
    });

}

// Function to handle the selection of an option
function handleOptionClick(index) {
    const options = document.querySelectorAll('.option');

    options.forEach(option => {
        option.onclick = () => {
            const selectedAnswer = option.textContent.trim(); // Get the selected option text

            // Remove any previously selected styles
            options.forEach(opt => opt.classList.remove('selected', 'wrong', 'correct'));

            if (selectedAnswer === questions[index].answer) {
                score++; // Increment score if the answer is correct
                option.classList.add('selected');

                // Update score display immediately
                const headerScore = document.querySelector('.header-score');
                headerScore.textContent = `Score: ${score} / ${questions.length}`;
            } else {
                // Wrong answer selected
                option.classList.add('wrong'); // Mark the selected option as wrong

                // Highlight the correct answer
                const correctOption = Array.from(options).find(opt =>
                    opt.textContent.trim() === questions[index].answer
                );
                if (correctOption) {
                    correctOption.classList.add('correct'); // Mark the correct answer in green
                }
            }

            // Disable all options after selection
            options.forEach(opt => opt.classList.add('disabled'));

            // Enable the "Next" button after answering
            const nextBtn = document.querySelector('.next-btn');
            nextBtn.classList.add('enabled');
        };
    });
}

// Function to handle the "Next" button logic
function handleNextButton() {
    const nextBtn = document.querySelector('.next-btn');
    const quizBox = document.querySelector('.quiz-box');
    const resultBox = document.querySelector('.result-box');
    if (nextBtn) {
        nextBtn.onclick = (e) => {
            e.preventDefault();  // Prevent default link behavior
            if (nextBtn.classList.contains('enabled')) {
                currentQuestion++;  // Move to the next question

                // Check if there are more questions to show
                if (currentQuestion < questions.length) {
                    // Show the next question
                    showQuestions(currentQuestion);
                    handleOptionClick(currentQuestion);

                    // Disable the "Next" button again until the next answer
                    nextBtn.classList.remove('enabled');

                    // Change "Next" to "Finish" if it's the last question
                    if (currentQuestion === questions.length - 1) {
                        nextBtn.textContent = 'Finish';
                    }

                } else {
                    // If it's the last question, show the final score
                    console.log("Quiz Finished");
                    quizBox.classList.add('hidden');  // Hide quiz box
                    resultBox.classList.add('active');  // Show result box

                    const scoreText = document.querySelector('.score-text');
                    const progressValue = document.querySelector('.progress-value');
                    const circularProgress = document.querySelector('.circular-progress');
                    let progressStartValue = -1;
                    let progressEndValue = (score / questions.length) * 100;
                    let speed = 20;

                    let progress = setInterval(() => {
                        progressStartValue++;
                        /* console.log(progressStartValue); */
                        progressValue.textContent = `${progressStartValue}%`;
                        circularProgress.style.background = `conic-gradient(var(--secondry-color) ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1) 0deg)`;

                        if(progressStartValue == progressEndValue) {
                            clearInterval(progress);
                        }
                    }, speed);
                    // Display percentage and score in result box
                    progressValue.textContent = `${progressEndValue}%`;
                    scoreText.textContent = `Your Score: ${score} out of ${questions.length}`;
                }
            }
        };
    }
}

// Initial setup to show the first question
showQuestions(currentQuestion);
handleOptionClick(currentQuestion);
handleNextButton();
