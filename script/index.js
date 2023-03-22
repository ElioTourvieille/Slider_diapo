// GLOBAL VARIABLE
let counter = 0
let timer
let images
let slides
let slideWidth

const diapo = document.querySelector(".diaporama")
images = document.querySelector(".image-wrapper")
slides = Array.from(images.children)

// Calculate the width of diaporama
slideWidth = diapo.getBoundingClientRect().width

// Active the buttons right, left and pause
let stop = document.querySelector("#nav-pause")
let next = document.querySelector("#nav-right")
let prev = document.querySelector("#nav-left")

stop.addEventListener("click", function () {
    let pulse = stop.getAttribute("data-state")
// Use the data-state to activate the animation and pause/restart
    if (pulse === 'initial'){
        stop.setAttribute("data-state", "active")
        stopTimer()
    } else {
        stop.setAttribute("data-state", "initial")
        startTimer()
    }
})

next.addEventListener("click",() => {
    slideNext()
    stop.setAttribute("data-state", "initial")
    startTimer() // Restart the slideshow
})
prev.addEventListener("click",() =>{
    slidePrev()
    stop.setAttribute("data-state", "initial")
    startTimerBack() //Restart the slideshow in prev side
})

// Automate the slideshow
timer = setInterval(slideNext, 3500)

// Responsive
 window.addEventListener("resize", () => {
     slideWidth = diapo.getBoundingClientRect().width
 })

// FUNCTIONS
function slideNext(){ // SLide on the right
    counter++
    if(counter === slides.length){  // If we are in the end of the diapo we back at initial position (first image)
        counter = 0
    }
    let decal = -slideWidth * counter // To shift the image using CSS transform
    images.style.transform = `translateX(${decal}px)`
}

function slidePrev(){ // SLide on the left
    counter--
    if(counter < 0){  // If we are in the first diapo we go at last position (4th image)
        counter = slides.length - 1
    }
    let decal = -slideWidth * counter // To shift the image using CSS transform
    images.style.transform = `translateX(${decal}px)`
}

function stopTimer(){ // Stop the slideshow
    clearInterval(timer)
}

function startTimer(){// Restart the slideshow
    clearInterval(timer)
    timer = setInterval(slideNext, 3500)
}

function startTimerBack(){// Restart the slideshow in prev side
    clearInterval(timer)
    timer = setInterval(slidePrev, 3500)
}