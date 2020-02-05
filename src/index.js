let dogsData = []
document.addEventListener("DOMContentLoaded", (e) => { 
    fetchDogs()
    getDogFilter().addEventListener('click', filterDogs)
})

function fetchDogs() { 
    fetch('http://localhost:3000/pups')
    .then(r => r.json() )
    .then(dogs => { 
        dogsData = dogs 
        renderDogs()
    })
}
function getDogBarContainer() { 
   return document.getElementById("dog-bar")
}
function getDogInfoDiv() { 
return document.getElementById("dog-info")
}
function renderDogs (dogfilter) { 
    getDogBarContainer().innerHTML = ""
 if(!dogfilter){
  dogsData.forEach(dog => buildDog (dog))}
  else{ 
      dogfilter.forEach(dog => buildDog (dog))
  }
   

}
function getDogFilter (){ 
    return document.getElementById("good-dog-filter")
}
function buildDog(dog) { 
 let bar =  getDogBarContainer()
 let dogSpan = document.createElement('span')
  dogSpan.innerText = dog.name 
  bar.appendChild(dogSpan)
  dogSpan.dataset.id = dog.id
  dogSpan.addEventListener('click', getDog)
}

function getDog(event) { 
    console.log(event)
    let dogId = event.target.dataset.id 
    fetch('http://localhost:3000/pups/' + dogId)
    .then(r => r.json())
    .then(dog => displayDog(dog)) 
     

}

function displayDog(dog) { 
    let dogDiv = getDogInfoDiv()
    dogDiv.innerHTML = ""
     let dogImg = document.createElement('img')
     dogImg.src = dog.image
     let dogName = document.createElement('h2')
     dogName.innerText = dog.name
     let dogBehave = document.createElement('button')
     if (dog.isGoodDog == false) { 
         dogBehave.innerText = "Bad Dog!"
    }
    else {  
        
        dogBehave.innerText = "Good Dog!"
    }
     
    dogDiv.appendChild(dogImg)
    dogDiv.appendChild(dogName)
    dogDiv.appendChild(dogBehave)
     
    dogBehave.addEventListener('click', changeBehavior)
     dogBehave.dataset.id = dog.id
}

function changeBehavior(event) { 
    let dogId = event.target.dataset.id 
    beh= {isGoodDog: behaveCheck(event)}
    fetch('http://localhost:3000/pups/'+ dogId ,{ 
        method: "PATCH", 
        headers: { 
            "Content-Type": "application/json"
        },
        body: JSON.stringify(beh)
    })
    .then(r => r.json()) 
    .then(dog => displayDog(dog) )

    console.log(event)
    
}

function behaveCheck(e) { 
    return e.target.innerText === "Bad Dog!"
}

function filterDogs(event){ 
    console.log(event)
    
    if(event.target.innerText == "Filter good dogs: OFF"){ 
        event.target.innerText = "Filter good dogs: ON"
    let filteredDogs = dogsData.filter(dog => dog.isGoodDog === true ) 
    renderDogs(filteredDogs)}
    else{ 
        event.target.innerText = "Filter good dogs: OFF"
        renderDogs()
    }
}