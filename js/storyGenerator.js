async function generateStory(planet) {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const interests = document.getElementById('interests').value;
    const lang = document.getElementById('language').value;
    try {
        const response = await fetch('https://story-creator-iy5s.vercel.app/story', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, lang, planet, interests: interests.split(','), school: age })
        });

        if (response.ok) {
            const data = await response.json();
            displayStory(data.data);
        } else {
            alert('Failed to generate story. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while generating the story. Please check your internet connection and try again.');
    }
}

function displayStory(story) {
    const output = document.getElementById("output");
    output.innerHTML = ''; // Clear previous content
    story.forEach((part, index) => {
        const section = document.createElement("div");
        section.className = "section";
        section.innerHTML = `<h3>Part ${index + 1}</h3><p>${part}</p>`;
        output.appendChild(section);
    });

    manageScroll(); // Trigger scroll management
}

function manageScroll() {
    const sections = document.querySelectorAll(".section");
    let currentIndex = 0;

    const showSection = (index) => {
        if (index < sections.length) {
            sections[index].style.display = "block"; // Show section
            speakText(sections[index].textContent, () => {
                if (currentIndex + 1 < sections.length) {
                    hideSection(index);
                    currentIndex++;
                    setTimeout(() => {
                        showSection(currentIndex);
                        scrollToSection(currentIndex);
                    }, 500); // Match the fade-out delay
                }
            });
        }
    };

    const hideSection = (index) => {
        if (index >= 0 && index < sections.length) {
            sections[index].style.display = "none"; // Hide section
        }
    };

    showSection(currentIndex);
    scrollToSection(currentIndex);
}

function scrollToSection(index) {
    const section = document.querySelectorAll(".section")[index];
    section.scrollIntoView({ behavior: 'smooth' });
}

function speakText(text, callback) {
    const selectedLang = document.getElementById("language").value;
    let voice = "UK English Male";

    switch (selectedLang) {
        case "Arabic":
            voice = "Arabic Male";
            break;
        case "French":
            voice = "French Female";
            break;
        case "Spanish":
            voice = "Spanish Female";
            break;
        case "German":
            voice = "German Male";
            break;
        case "English":
        default:
            voice = "UK English Male";
            break;
    }

    responsiveVoice.speak(text, voice, {
        onend: callback
    });
}

function stopSpeaking() {
    responsiveVoice.cancel();
}