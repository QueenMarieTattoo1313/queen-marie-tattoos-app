```javascript
/*==========================================
  QUEEN MARIE TATTOOS
  script.js
==========================================*/


/*==========================
  HERO SLIDESHOW
==========================*/

const slides = [

"images/tattoo1.jpg",
"images/tattoo2.jpg",
"images/tattoo3.jpg",
"images/tattoo4.jpg"

];

let currentSlide = 0;

const slideImage = document.getElementById("slideImage");

if(slideImage){

setInterval(()=>{

currentSlide++;

if(currentSlide >= slides.length){

currentSlide = 0;

}

slideImage.src = slides[currentSlide];

},3500);

}


/*==========================
 SHARE APP
==========================*/

async function shareWebsite(){

const shareData={

title:"Queen Marie Tattoos",

text:"Check out Queen Marie Tattoos! Browse tattoos, book appointments, and pay your deposit.",

url:window.location.href

};

if(navigator.share){

try{

await navigator.share(shareData);

}catch(err){

console.log(err);

}

}else{

navigator.clipboard.writeText(window.location.href);

alert("App link copied to clipboard!");

}

}



/*==========================
 BACK BUTTON
==========================*/

function goBack(){

history.back();

}



/*==========================
 SCROLL TO TOP
==========================*/

function scrollTopButton(){

window.scrollTo({

top:0,

behavior:"smooth"

});

}



/*==========================
 PAGE FADE
==========================*/

window.addEventListener("load",()=>{

document.body.classList.add("loaded");

});



/*==========================
 INSTALL APP
==========================*/

let deferredPrompt;

window.addEventListener("beforeinstallprompt",(e)=>{

e.preventDefault();

deferredPrompt=e;

const installButton=document.getElementById("installApp");

if(installButton){

installButton.style.display="inline-block";

}

});



function installApp(){

if(!deferredPrompt){

return;

}

deferredPrompt.prompt();

deferredPrompt.userChoice.then(()=>{

deferredPrompt=null;

});

}



/*==========================
 IMAGE PREVIEW
==========================*/

const gallery=document.querySelectorAll(".gallery-preview img");

gallery.forEach(img=>{

img.addEventListener("click",()=>{

window.open(img.src,"_blank");

});

});



/*==========================
 BUTTON CLICK EFFECT
==========================*/

const buttons=document.querySelectorAll("button,.main-btn,.social-btn");

buttons.forEach(btn=>{

btn.addEventListener("click",()=>{

btn.classList.add("clicked");

setTimeout(()=>{

btn.classList.remove("clicked");

},200);

});

});



/*==========================
 CURRENT YEAR
==========================*/

const footerYear=document.getElementById("year");

if(footerYear){

footerYear.textContent=new Date().getFullYear();

}
```
