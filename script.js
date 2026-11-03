
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

/* ==========================================
   4. LETTER L DRAWING VERIFICATION
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const lockScreen = document.getElementById("lockScreen");
    const drawingCanvas = document.getElementById("drawingCanvas");
    const userDrawing = document.getElementById("userDrawing");

    const progressBar = document.getElementById("drawingProgress");
    const message = document.getElementById("drawingMessage");
    const resetButton = document.getElementById("resetDrawing");

    if (
        !lockScreen ||
        !drawingCanvas ||
        !userDrawing ||
        !progressBar ||
        !message ||
        !resetButton
    ) {
        return;
    }

    let drawing = false;
    let completed = false;

    let stage = 0;

    let lastY = 20;
    let lastX = 35;

    let points = [];

    // Get pointer position relative to SVG
    function getPosition(event) {

        const rect = drawingCanvas.getBoundingClientRect();

        return {
            x: ((event.clientX - rect.left) / rect.width) * 100,
            y: ((event.clientY - rect.top) / rect.height) * 100
        };

    }

    // Update the drawing
    function updateDrawing(x, y) {

        points.push(x + "," + y);

        userDrawing.setAttribute(
            "points",
            points.join(" ")
        );

    }

    // Update progress
    function updateProgress() {

        let progress = 0;

        if (stage === 0) {

            progress = ((lastY - 20) / 55) * 100;

        } else {

            progress = (
                55 + (lastX - 35)
            ) / 90 * 100;

        }

        progressBar.style.width =
            Math.min(progress, 100) + "%";

    }

    // Start tracing
    drawingCanvas.addEventListener("pointerdown", function (event) {

        if (completed) return;

        const position = getPosition(event);

        // First starting point
        if (points.length === 0) {

            const distance = Math.hypot(
                position.x - 35,
                position.y - 20
            );

            if (distance > 12) {

                message.textContent =
                    "Start at the top of the letter L.";

                return;

            }

            updateDrawing(35, 20);

        } else {

            // Continue from the last position
            const distance = Math.hypot(
                position.x - lastX,
                position.y - lastY
            );

            if (distance > 8) return;

        }

        drawing = true;

        drawingCanvas.setPointerCapture(event.pointerId);

    });

    // Track drawing movement
    drawingCanvas.addEventListener("pointermove", function (event) {

        if (!drawing || completed) return;

        const position = getPosition(event);

        const x = position.x;
        const y = position.y;

        // Stage 0: Draw the vertical line
        if (stage === 0) {

            if (
                Math.abs(x - 35) <= 9 &&
                y >= lastY &&
                y <= 78
            ) {

                lastX = 35;
                lastY = y;

                updateDrawing(lastX, lastY);

                if (lastY >= 70) {

                    stage = 1;

                    message.textContent =
                        "Great! Now trace the bottom line to the right.";

                }

                updateProgress();

            }

        }

        // Stage 1: Draw the horizontal line
        else if (stage === 1) {

            if (
                Math.abs(y - 75) <= 9 &&
                x >= lastX &&
                x <= 75
            ) {

                lastX = x;
                lastY = 75;

                updateDrawing(lastX, lastY);

                updateProgress();

                // Letter L successfully completed
                if (lastX >= 70) {

                    completed = true;

                    progressBar.style.width = "100%";

                    message.textContent =
                        "Perfect! Welcome to my portfolio! ♡";

                    setTimeout(function () {

                        lockScreen.classList.add("unlocked");

                    }, 700);

                }

            }

        }

    });

    // Stop drawing temporarily
    drawingCanvas.addEventListener("pointerup", function () {

        drawing = false;

    });

    drawingCanvas.addEventListener("pointercancel", function () {

        drawing = false;

    });

    // Reset drawing
    resetButton.addEventListener("click", function () {

        drawing = false;
        completed = false;

        stage = 0;

        lastX = 35;
        lastY = 20;

        points = [];

        userDrawing.setAttribute("points", "");

        progressBar.style.width = "0%";

        message.textContent =
            "Start at the top and trace downward, then move right.";

    });

});