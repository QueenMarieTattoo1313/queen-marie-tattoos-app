"use strict";

/*==================================
QUEEN MARIE TATTOOS
Luxury App
==================================*/

const APP_NAME = "Queen Marie Tattoos";

const slides = [

"images/IMG_1.PNG",
"images/IMG_2.PNG",
"images/IMG_3.PNG",
"images/IMG_4.PNG",
"images/IMG_5.PNG",
"images/IMG_6.PNG",
"images/IMG_7.PNG",
"images/IMG_8.PNG",
"images/IMG_9.PNG",
"images/IMG_10.PNG",
"images/IMG_11.PNG",
"images/IMG_12.PNG",
"images/IMG_13.PNG",
"images/IMG_14.PNG",
"images/IMG_15.PNG",
"images/IMG_16.PNG",
"images/IMG_17.PNG",
"images/IMG_18.PNG",
"images/IMG_19.PNG",
"images/IMG_20.PNG",
"images/IMG_21.PNG",
"images/IMG_22.PNG",
"images/IMG_23.PNG",
"images/IMG_24.PNG",
"images/IMG_25.PNG",
"images/IMG_26.PNG",
"images/IMG_27.PNG",
"images/IMG_28.PNG",
"images/IMG_29.PNG",
"images/IMG_30.PNG",
"images/IMG_31.PNG",
"images/IMG_32.PNG"

];

/*==================================
SLIDESHOW
==================================*/

function startSlideshow(){

const slide=document.getElementById("slideImage");

if(!slide) return;

slide.src=slides[currentSlide];

setInterval(()=>{

slide.style.opacity="0";

setTimeout(()=>{

currentSlide++;

if(currentSlide>=slides.length){

currentSlide=0;

}

slide.src=slides[currentSlide];

slide.style.opacity="1";

},400);

},4000);

}

/*==================================
YEAR
==================================*/

function updateYear(){

const year=document.getElementById("year");

if(year){

year.textContent=new Date().getFullYear();

}

}
let currentSlide = Math.floor(Math.random() * slides.length);

let deferredPrompt = null;

/*==================================
BACK BUTTON
==================================*/

function goBack(){

history.back();

}

/*==================================
SCROLL TO TOP
==================================*/

function scrollToTop(){

window.scrollTo({

top:0,

behavior:"smooth"

});

}

/*==================================
INSTALL APP
==================================*/

window.addEventListener("beforeinstallprompt",(event)=>{

event.preventDefault();

deferredPrompt=event;

const installButton=document.getElementById("installApp");

if(installButton){

installButton.style.display="inline-flex";

}

});

async function installApp(){

if(!deferredPrompt){

showNotification("Install is not available right now.");

return;

}

deferredPrompt.prompt();

const choice=await deferredPrompt.userChoice;

if(choice.outcome==="accepted"){

showNotification("Thanks for installing Queen Marie Tattoos!");

}

deferredPrompt=null;

}

/*==================================
SHARE APP
==================================*/

async function shareWebsite(){

const shareData={

title:APP_NAME,

text:"💖 Check out Queen Marie Tattoos! Luxury custom tattoos in East Texas.",

url:window.location.href

};

if(navigator.share){

try{

await navigator.share(shareData);

showNotification("Thanks for sharing!");

}catch(error){

console.log(error);

}

}else{

navigator.clipboard.writeText(window.location.href);

showNotification("Website link copied!");

}

}

/*==================================
IMAGE MODAL
==================================*/

function openImage(imageSrc){

const modal=document.getElementById("imageModal");

const modalImage=document.getElementById("modalImage");

if(!modal||!modalImage) return;

modal.style.display="flex";

modalImage.src=imageSrc;

document.body.style.overflow="hidden";

}

function closeImage(){

const modal=document.getElementById("imageModal");

if(!modal) return;

modal.style.display="none";

document.body.style.overflow="auto";

}

/*==================================
GALLERY IMAGES
==================================*/

const galleryImages=document.querySelectorAll(".gallery-preview img");

galleryImages.forEach((image)=>{

image.addEventListener("click",()=>{

openImage(image.src);

});

});

/*==================================
CLOSE MODAL
==================================*/

window.addEventListener("click",(event)=>{

const modal=document.getElementById("imageModal");

if(!modal) return;

if(event.target===modal){

closeImage();

}

});

document.addEventListener("keydown",(event)=>{

if(event.key==="Escape"){

closeImage();

}

});

/*==================================
SEARCH GALLERY
==================================*/

function searchGallery(){

const input=document.getElementById("searchInput");

if(!input) return;

const filter=input.value.toLowerCase();

galleryImages.forEach((image)=>{

const card=image.closest(".gallery-card") || image.parentElement;

const text=image.alt.toLowerCase();

if(text.includes(filter)){

card.style.display="";

}else{

card.style.display="none";

}

});

}

/*==================================
SAVE FAVORITES
==================================*/

function saveFavorite(image){

let favorites=JSON.parse(localStorage.getItem("queenFavorites")) || [];

if(!favorites.includes(image)){

favorites.push(image);

localStorage.setItem("queenFavorites",JSON.stringify(favorites));

showNotification("❤️ Tattoo added to Favorites");

}else{

showNotification("Already in Favorites");

}

}

/*==================================
BUTTON ANIMATION
==================================*/

const buttons=document.querySelectorAll(

".primary-btn,.secondary-btn,.dashboard-card,.floating-btn,.main-btn,.share-btn,.social-btn"

);

buttons.forEach((button)=>{

button.addEventListener("click",()=>{

button.style.transform="scale(.96)";

setTimeout(()=>{

button.style.transform="";

},150);

});

});


/*==================================
SECTION ANIMATION
==================================*/

const sections=document.querySelectorAll("section");

const observer=new IntersectionObserver((entries)=>{

entries.forEach((entry)=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});

sections.forEach((section)=>{

observer.observe(section);

});


/*==================================
NOTIFICATIONS
==================================*/

function showNotification(message){

const notification=document.getElementById("notification");

if(!notification) return;

notification.textContent=message;

notification.classList.add("show");

setTimeout(()=>{

notification.classList.remove("show");

},3000);

}


/*==================================
CONTACT FORM
==================================*/

function validateContactForm(){

const form=document.getElementById("contactForm");

if(!form) return true;

const required=form.querySelectorAll("[required]");

for(const field of required){

if(field.value.trim()===""){

showNotification("Please complete all required fields.");

field.focus();

return false;

}

}

return true;

}


/*==================================
BOOKING FORM
==================================*/

function validateBookingForm(){

const form=document.getElementById("bookingForm");

if(!form) return true;

const required=form.querySelectorAll("[required]");

for(const field of required){

if(field.value.trim()===""){

showNotification("Please complete all required fields.");

field.focus();

return false;

}

}

showNotification("Booking request submitted!");

return true;

}


/*==================================
ONLINE / OFFLINE
==================================*/

window.addEventListener("online",()=>{

showNotification("🟢 You're back online.");

});

window.addEventListener("offline",()=>{

showNotification("🔴 No internet connection.");

});


/*==================================
LOADER
==================================*/

window.addEventListener("load",()=>{

const loader=document.getElementById("loader");

if(loader){

setTimeout(()=>{

loader.style.opacity="0";

setTimeout(()=>{

loader.style.display="none";

},500);

},700);

}

});


/*==================================
ERROR HANDLER
==================================*/

window.onerror=function(message,file,line){

console.error("JavaScript Error");

console.error(message);

console.error(file);

console.error(line);

};


/*==================================
INITIALIZE APP
==================================*/

function initializeApp(){

updateYear();

startSlideshow();

console.log(APP_NAME+" Loaded Successfully");

}

document.addEventListener("DOMContentLoaded",initializeApp);


/*==================================
END OF SCRIPT
==================================*/
