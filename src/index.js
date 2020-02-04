document.addEventListener("DOMContentLoaded", () => {
    renderDogs()
    getFilter().addEventListener("click", filterDogs)
})

let allDogs = []

// fetch dogs
function renderDogs(){
    return fetch("http://localhost:3000/pups")
    .then(response => response.json())
    .then(dogs => {
        allDogs = dogs
        iterateAllDogs()})
}

function iterateAllDogs(goodDogs){
    let filterDogs = goodDogs ? goodDogs : allDogs
    filterDogs.forEach(dog => buildDogNavBar(dog))
}


function updateDog(event){
    console.log("updating good boy status")
    let dogBoyStatus = {isGoodDog: dogButton(event)}
    let dogId = event.target.dataset.id
    fetch("http://localhost:3000/pups/" + dogId, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dogBoyStatus)

    }).then(response => response.json())
    .then(json => event.target.innerText = json.isGoodDog ? "Good Dog!" : "Bad Dog!")
}

//build dog-nav-bar
function buildDogNavBar(dog){
    console.log("nav bar info stuff being built")
    let dogInfo = document.createElement("span")
    dogInfo.innerText = dog.name
    getNavBar().appendChild(dogInfo)
    dogInfo.addEventListener("click", () => buildDogPage(dog))
}

//build dog page
function buildDogPage(dog){
    console.log("doggo's personal info page")
    clearDiv(getDogInfo())

    // debugger
    
    let dogImage = document.createElement("img")
    getDogInfo().appendChild(dogImage)
    dogImage.src = dog.image

    let dogName = document.createElement("h2")
    dogName.innerText = dog.name
    getDogInfo().appendChild(dogName)

    let dogButton = document.createElement("button")
    dogButton.innerText = dog.isGoodDog ? "Good Dog!" : "Bad Dog!"
    dogButton.dataset.id = dog.id
    dogButton.dataset.boolean = dog.isGoodDog
    getDogInfo().appendChild(dogButton)
    dogButton.addEventListener("click", updateDog)

}

function dogButton(event){
    switch(event.target.innerText) {
        case "Good Dog!":
            return event.target.dataset.boolean = false
        case "Bad Dog!":
            return event.target.dataset.boolean = true
    }
}

//get elements
function getNavBar(){
    return document.getElementById("dog-bar")
}

function getDogInfo(){
    return document.getElementById("dog-info")
}

function getFilter(){
    return document.getElementById("good-dog-filter")
}



// clear divs 
function clearDiv(div){
    while(div.firstChild){
        div.firstChild.remove()
    }
}



// When a user clicks on the Filter Good Dogs button, two things should happen:

// The button's text should change from "Filter good dogs: OFF" to "Filter good dogs: ON", or vice versa.

function filterDogs(event){
    let goodDogs = []
    if (event.target.innerText == "Filter good dogs: OFF") {
        event.target.innerText = "Filter good dogs: ON"
        allDogs.forEach(dog => {
            if (dog.isGoodDog)
            goodDogs.push(dog)})
            clearDiv(getNavBar())
            iterateAllDogs(goodDogs)  
        }
    else if (event.target.innerText = "Filter good dogs: ON"){
        event.target.innerText = "Filter good dogs: OFF"
        clearDiv(getNavBar())
        iterateAllDogs()
    }
}
// If the button now says "ON" (meaning the filter is on), then the Dog Bar should only show pups whose isGoodDog attribute is true. If the filter is off, the Dog Bar should show all pups (like normal).
