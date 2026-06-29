"use strict";

const APP_NAME = "Queen Marie Tattoos";

const slides = [
    "images/tattoo1.jpg",
    "images/tattoo2.jpg",
    "images/tattoo3.jpg",
    "images/tattoo4.jpg"
];

let currentSlide = 0;

function startSlideshow() {
    const slide = document.getElementById("slideImage");

    if (!slide) return;

    setInterval(() => {
        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        slide.src = slides[currentSlide];
    }, 3500);
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

        alert("App link copied to clipboard.");

    }

}

let deferredPrompt;

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

function goBack() {
    window.history.back();
}

function scrollToTop() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

function updateYear() {

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

}

const buttons = document.querySelectorAll(".main-btn, .share-btn, .social-btn");

buttons.forEach(button => {

    button.addEventListener("click", () => {

        button.style.transform = "scale(.97)";

        setTimeout(() => {

            button.style.transform = "scale(1)";

        }, 150);

    });

});

window.addEventListener("load", () => {

    document.body.style.opacity = "1";

    const loader = document.getElementById("loader");

    if (loader) {
        loader.style.display = "none";
    }

});

function searchGallery() {

    const input = document.getElementById("searchInput");

    if (!input) return;

    const filter = input.value.toLowerCase();

    const images = document.querySelectorAll(".gallery-preview img");

    images.forEach((image) => {

        const text = image.alt.toLowerCase();

        if (text.includes(filter)) {

            image.style.display = "block";

        } else {

            image.style.display = "none";

        }

    });

}


function favoriteTattoo(image) {

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (!favorites.includes(image)) {

        favorites.push(image);

    }

    localStorage.setItem("favorites", JSON.stringify(favorites));

    alert("Tattoo added to Favorites!");

}

function bookAppointment() {

    window.location.href = "pages/booking.html";

}

function openGallery() {

    window.location.href = "pages/gallery.html";

}

function openFlashTattoos() {

    window.location.href = "pages/flash.html";

}

function openReviews() {

    window.location.href = "pages/reviews.html";

}

function openReferral() {

    window.location.href = "pages/referral.html";

}

function openAftercare() {

    window.location.href = "pages/aftercare.html";

}

function openContact() {

    window.location.href = "pages/contact.html";

}

function callQueenMarie() {

    window.location.href = "tel:2147109249";

}

function emailQueenMarie() {

    window.location.href = "mailto:donnamorales70@gmail.com";

}

function openFacebook() {

    window.open("#","_blank");

}

function openInstagram() {

    window.open("#","_blank");

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

document.querySelectorAll(".gallery-preview img").forEach(image => {

    image.addEventListener("click", () => {

        openImage(image.src);

    });

});

window.addEventListener("click", function (event) {

    const modal = document.getElementById("imageModal");

    if (!modal) return;

    if (event.target === modal) {

        closeImage();

    }

});

function validateContactForm() {

    const name = document.getElementById("name");

    const email = document.getElementById("email");

    const message = document.getElementById("message");

    if (!name || !email || !message) return true;

    if (name.value.trim() === "") {

        alert("Please enter your name.");

        name.focus();

        return false;

    }

    if (email.value.trim() === "") {

        alert("Please enter your email.");

        email.focus();

        return false;

    }

    if (message.value.trim() === "") {

        alert("Please enter your message.");

        message.focus();

        return false;

    }

    return true;

}

function validateBookingForm() {

    const client = document.getElementById("clientName");

    const phone = document.getElementById("phone");

    const tattoo = document.getElementById("tattoo");

    if (!client || !phone || !tattoo) return true;

    if (client.value.trim() === "") {

        alert("Enter your name.");

        client.focus();

        return false;

    }

    if (phone.value.trim() === "") {

        alert("Enter your phone number.");

        phone.focus();

        return false;

    }

    if (tattoo.value.trim() === "") {

        alert("Describe the tattoo you want.");

        tattoo.focus();

        return false;

    }

    return true;

}

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

});

sections.forEach(section => {

    observer.observe(section);

});

function filterFlash(category) {

    const cards = document.querySelectorAll(".flash-card");

    cards.forEach(card => {

        if (category === "all") {

            card.style.display = "block";

            return;

        }

        if (card.dataset.category === category) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}

function toggleMenu() {

    const menu = document.getElementById("mobileMenu");

    if (!menu) return;

    menu.classList.toggle("active");

}

function showNotification(message) {

    const notification = document.getElementById("notification");

    if (!notification) return;

    notification.innerHTML = message;

    notification.classList.add("show");

    setTimeout(() => {

        notification.classList.remove("show");

    },3000);

}

function saveFavorite(id){

    let favorites = JSON.parse(localStorage.getItem("queenFavorites")) || [];

    if(!favorites.includes(id)){

        favorites.push(id);

        localStorage.setItem("queenFavorites",JSON.stringify(favorites));

        showNotification("Tattoo added to Favorites ❤️");

    }

}

function removeFavorite(id){

    let favorites = JSON.parse(localStorage.getItem("queenFavorites")) || [];

    favorites = favorites.filter(item => item !== id);

    localStorage.setItem("queenFavorites",JSON.stringify(favorites));

}

window.onerror = function (message, file, line) {

    console.error("JavaScript Error");

    console.error(message);

    console.error(file);

    console.error(line);

};

function initializeApp() {

    updateYear();

    startSlideshow();

    console.log(APP_NAME + " Loaded");

}

document.addEventListener("DOMContentLoaded",initializeApp);

