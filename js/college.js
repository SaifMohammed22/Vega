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

/* Swipe planet images */
document.addEventListener("DOMContentLoaded", function () {
    var swiper = new Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        loop: true, // Ensure this is set to true
        slidesPerView: "auto", // You can also set a specific number like 3
        spaceBetween: 30, // Adjust spacing between slides if needed
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        keyboard: {
            enabled: true, // Enable keyboard control
            onlyInViewport: true, // Slide only when the swiper is in the viewport
        },
        // Optional: Autoplay settings to keep the slider moving automatically
        autoplay: {
            delay: 2500, // Adjust the delay time as needed
            disableOnInteraction: false, // Continue autoplay after user interaction
        },
    });
});


