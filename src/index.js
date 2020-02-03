document.addEventListener("DOMContentLoaded", () => {
    renderDogs()
})

// fetch dogs
function renderDogs(){
    fetch("http://localhost:3000/pups")
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
    .then(json => json.isGoodDog ? "Good Dog!" : "Bad Dog!")
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


