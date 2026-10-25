const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

const profilePhoto = document.getElementById("profilePhoto");
const photoFallback = document.getElementById("photoFallback");

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

const contactForm = document.getElementById("contactForm");
const formFeedback = document.getElementById("formFeedback");

document.getElementById("currentYear").textContent =
    new Date().getFullYear();

// Mobile navigation
menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close mobile navigation after clicking a link
navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.textContent = "☰";
    });
});

// Profile photo: image/ramesh.jpeg
if (profilePhoto && photoFallback) {
    function showPhotoFallback() {
        profilePhoto.style.display = "none";
        photoFallback.hidden = false;
    }

    function showProfilePhoto() {
        profilePhoto.style.display = "block";
        photoFallback.hidden = true;
    }

    profilePhoto.addEventListener("load", showProfilePhoto);
    profilePhoto.addEventListener("error", showPhotoFallback);

    if (profilePhoto.complete) {
        if (profilePhoto.naturalWidth > 0) {
            showProfilePhoto();
        } else {
            showPhotoFallback();
        }
    }
}

// Project filters
filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const selectedFilter = button.dataset.filter;

        filterButtons.forEach((item) => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        projectCards.forEach((card) => {
            const category = card.dataset.category;
            const shouldShow =
                selectedFilter === "all" ||
                category === selectedFilter;

            card.hidden = !shouldShow;
        });
    });
});

// Contact form validation
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

function setError(input, errorElement, message) {
    errorElement.textContent = message;
    input.classList.toggle("invalid", Boolean(message));
    input.setAttribute("aria-invalid", String(Boolean(message)));
}

function validateName() {
    const value = nameInput.value.trim();

    if (value.length < 2) {
        setError(nameInput, nameError, "Enter at least 2 characters.");
        return false;
    }

    setError(nameInput, nameError, "");
    return true;
}

function validateEmail() {
    const value = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(value)) {
        setError(emailInput, emailError, "Enter a valid email address.");
        return false;
    }

    setError(emailInput, emailError, "");
    return true;
}

function validateMessage() {
    const value = messageInput.value.trim();

    if (value.length < 10) {
        setError(
            messageInput,
            messageError,
            "Message must contain at least 10 characters."
        );
        return false;
    }

    setError(messageInput, messageError, "");
    return true;
}

nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
messageInput.addEventListener("input", validateMessage);

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();

    formFeedback.className = "form-feedback";

    if (isNameValid && isEmailValid && isMessageValid) {
        formFeedback.textContent =
            "Validation successful! Your message has not been emailed. This demo has no email-sending service.";
        formFeedback.classList.add("success");
    } else {
        formFeedback.textContent =
            "Please correct the highlighted fields and try again.";
        formFeedback.classList.add("error");
    }
});