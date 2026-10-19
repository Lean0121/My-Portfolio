
/* ==========================================
   1. MOBILE NAVIGATION MENU
========================================== */

const menu = document.getElementById("menu");
const links = document.getElementById("links");

if (menu && links) {

    // Open and close the mobile menu
    menu.addEventListener("click", function () {

        const isOpen = links.classList.toggle("open");

        menu.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });

    // Close the menu when a navigation link is clicked
    document.querySelectorAll(".links a").forEach(function (link) {

        link.addEventListener("click", function () {

            links.classList.remove("open");

            menu.setAttribute("aria-expanded", "false");

        });

    });

}


/* ==========================================
   2. AUTOMATIC COPYRIGHT YEAR
========================================== */

const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}


/* ==========================================
   3. CERTIFICATE IMAGE SLIDER
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    // Get slider elements
    const track = document.querySelector(".certificate-track");

    const slides = document.querySelectorAll(".certificate-slide");

    const prevBtn = document.querySelector(".cert-prev");
    const nextBtn = document.querySelector(".cert-next");

    const dotsContainer = document.querySelector(".certificate-dots");
    const counter = document.querySelector(".certificate-counter");


    /* ------------------------------------------
       Check if all slider elements exist
    ------------------------------------------ */

    if (
        !track ||
        slides.length === 0 ||
        !prevBtn ||
        !nextBtn ||
        !dotsContainer ||
        !counter
    ) {
        return;
    }


    /* ------------------------------------------
       Slider Variables
    ------------------------------------------ */

    let currentSlide = 0;

    const totalSlides = slides.length;


    /* ------------------------------------------
       Create Navigation Dots
    ------------------------------------------ */

    for (let i = 0; i < totalSlides; i++) {

        const dot = document.createElement("button");

        dot.classList.add("cert-dot");

        dot.type = "button";

        dot.setAttribute(
            "aria-label",
            "View certificate " + (i + 1)
        );

        // Navigate to selected certificate
        dot.addEventListener("click", function () {

            currentSlide = i;

            updateSlider();

        });

        dotsContainer.appendChild(dot);

    }


    /* ------------------------------------------
       Get All Navigation Dots
    ------------------------------------------ */

    const dots = dotsContainer.querySelectorAll(".cert-dot");


    /* ------------------------------------------
       Update Slider Position
    ------------------------------------------ */

    function updateSlider() {

        // Move to the selected certificate
        track.style.transform =
            "translateX(-" + (currentSlide * 100) + "%)";


        // Update active navigation dot
        dots.forEach(function (dot, index) {

            dot.classList.toggle(
                "active",
                index === currentSlide
            );

            dot.setAttribute(
                "aria-current",
                index === currentSlide ? "true" : "false"
            );

        });


        // Update certificate counter
        counter.textContent =
            (currentSlide + 1) + " / " + totalSlides;

    }


    /* ------------------------------------------
       Next Certificate Button
    ------------------------------------------ */

    nextBtn.addEventListener("click", function () {

        currentSlide++;

        // Return to first certificate after the last
        if (currentSlide >= totalSlides) {
            currentSlide = 0;
        }

        updateSlider();

    });


    /* ------------------------------------------
       Previous Certificate Button
    ------------------------------------------ */

    prevBtn.addEventListener("click", function () {

        currentSlide--;

        // Go to last certificate before the first
        if (currentSlide < 0) {
            currentSlide = totalSlides - 1;
        }

        updateSlider();

    });


    /* ------------------------------------------
       Display First Certificate
    ------------------------------------------ */

    updateSlider();

});
