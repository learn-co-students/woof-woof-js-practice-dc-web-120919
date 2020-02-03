document.addEventListener("DOMContentLoaded", () => {
    renderDogs()
    getFilter().addEventListener("click", filterDogs)
})

// fetch dogs
function renderDogs(){
    return fetch("http://localhost:3000/pups")
    .then(response => response.json())
    .then(dogs => dogs.forEach(dog => buildDogNavBar(dog)))
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
    dogInfo.addEventListener("click", buildDogPage(dog))
}

//build dog page
function buildDogPage(dog){
    console.log("doggo's personal info page")
    let dogImage = document.createElement("img")
    dogImage.src = dog.image
    getDogInfo().appendChild(dogImage)

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



// When a user clicks on the Filter Good Dogs button, two things should happen:

// The button's text should change from "Filter good dogs: OFF" to "Filter good dogs: ON", or vice versa.
function dogsArray(){
    return fetch("http://localhost:3000/pups")
    .then(response => response.json())
    .then(console.log)
}

function filterDogs(event){
    debugger
    if (event.target.innerText == "Filter good dogs: OFF")
        event.target.innerText = "Filter good dogs: ON"
    
    else if (event.target.innerText = "Filter good dogs: ON")
        event.target.innerText = "Filter good dogs: OFF"
}
// If the button now says "ON" (meaning the filter is on), then the Dog Bar should only show pups whose isGoodDog attribute is true. If the filter is off, the Dog Bar should show all pups (like normal).
