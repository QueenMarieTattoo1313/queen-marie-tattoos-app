"use strict";

const APP_NAME = "Queen Marie Tattoos";

const slides = [
    "images/tattoo1.jpg",
    "images/tattoo2.jpg",
    "images/tattoo3.jpg",
    "images/tattoo4.jpg"
];

let currentSlide = 0;
let deferredPrompt = null;

function startSlideshow() {

    const slide = document.getElementById("slideImage");

    if (!slide) return;

    setInterval(() => {

        currentSlide++;

        if (currentSlide >= slides.length) {

            currentSlide = 0;

        }

        slide.src = slides[currentSlide];

    }, 4000);

}

function updateYear() {

    const year = document.getElementById("year");

    if (year) {

        year.textContent = new Date().getFullYear();

    }

}

function goBack() {

    history.back();

}

function scrollToTop() {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

window.addEventListener("beforeinstallprompt", (event) => {

    event.preventDefault();

    deferredPrompt = event;

    const installButton = document.getElementById("installApp");

    if (installButton) {

        installButton.style.display = "inline-block";

    }

});

async function installApp() {

    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    await deferredPrompt.userChoice;

    deferredPrompt = null;

}

async function shareWebsite() {

    const shareData = {

        title: APP_NAME,

        text: "Check out Queen Marie Tattoos!",

        url: window.location.href

    };

    if (navigator.share) {

        try {

            await navigator.share(shareData);

        } catch (error) {

            console.log(error);

        }

    } else {

        navigator.clipboard.writeText(window.location.href);

        alert("Website link copied to clipboard!");

    }

}

function openImage(imageSrc) {

    const modal = document.getElementById("imageModal");

    const modalImage = document.getElementById("modalImage");

    if (!modal || !modalImage) return;

    modal.style.display = "flex";

    modalImage.src = imageSrc;

}

function closeImage() {

    const modal = document.getElementById("imageModal");

    if (!modal) return;

    modal.style.display = "none";

}

const galleryImages = document.querySelectorAll(".gallery-preview img");

galleryImages.forEach(image => {

    image.addEventListener("click", () => {

        openImage(image.src);

    });

});


window.addEventListener("click", (event) => {

    const modal = document.getElementById("imageModal");

    if (!modal) return;

    if (event.target === modal) {

        closeImage();

    }

});

const buttons = document.querySelectorAll(

".main-btn, .share-btn, .social-btn"

);

buttons.forEach(button => {

    button.addEventListener("click", () => {

        button.style.transform = "scale(.96)";

        setTimeout(() => {

            button.style.transform = "";

        },150);

    });

});

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

});

sections.forEach(section => {

    observer.observe(section);

});

function searchGallery() {

    const input = document.getElementById("searchInput");

    if (!input) return;

    const filter = input.value.toLowerCase();

    const images = document.querySelectorAll(".gallery-preview img");

    images.forEach(image => {

        if (image.alt.toLowerCase().includes(filter)) {

            image.style.display = "block";

        } else {

            image.style.display = "none";

        }

    });

}

function saveFavorite(image) {

    let favorites = JSON.parse(localStorage.getItem("queenFavorites")) || [];

    if (!favorites.includes(image)) {

        favorites.push(image);

        localStorage.setItem("queenFavorites", JSON.stringify(favorites));

        showNotification("Tattoo added to Favorites ❤️");

    }

}

function showNotification(message) {

    const notification = document.getElementById("notification");

    if (!notification) return;

    notification.textContent = message;

    notification.classList.add("show");

    setTimeout(() => {

        notification.classList.remove("show");

    },3000);

}

function validateContactForm() {

    const form = document.getElementById("contactForm");

    if (!form) return true;

    const required = form.querySelectorAll("[required]");

    for (let field of required) {

        if (field.value.trim() === "") {

            alert("Please complete all required fields.");

            field.focus();

            return false;

        }

    }

    return true;

}

function validateBookingForm() {

    const form = document.getElementById("bookingForm");

    if (!form) return true;

    const required = form.querySelectorAll("[required]");

    for (let field of required) {

        if (field.value.trim() === "") {

            alert("Please complete all required fields.");

            field.focus();

            return false;

        }

    }

    return true;

}

window.addEventListener("online", () => {

    showNotification("You're back online.");

});

window.addEventListener("offline", () => {

    showNotification("No internet connection.");

});

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeImage();

    }

    if (event.key === "Home") {

        scrollToTop();

    }

});

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (loader) {

        setTimeout(() => {

            loader.style.opacity = "0";

            setTimeout(() => {

                loader.style.display = "none";

            },500);

        },700);

    }

});

window.onerror = function(message, file, line) {

    console.error("JavaScript Error");

    console.error(message);

    console.error(file);

    console.error(line);

};

function initializeApp() {

    updateYear();

    startSlideshow();

    console.log(APP_NAME + " Loaded Successfully");

}

document.addEventListener("DOMContentLoaded", initializeApp);
