document.addEventListener("DOMContentLoaded", (e) => {
    console.log('Connected...');
    fetchDogData();
    let dogFilter = goodDogFilter();
    dogFilter.addEventListener('click', (e)=>{dogFilterActivated(e)})
});

function fetchDogData(){

    let dogData = fetch('http://localhost:3000/pups')
        .then(results => results.json())
        .then(dogs => {
            dogs.forEach(dog => renderDog(dog));
        })
}

function goodDogFilter(){
    return document.getElementById('good-dog-filter');
}

function dogFilterActivated(event){
    if (event.target.innerText==="Filter good dogs: OFF"){
        console.log('Switched to ON');
        event.target.innerText = "Filter good dogs: ON";
        deleteDogBar();
        fetchGoodDogsData();
    }
    else if(event.target.innerText==="Filter good dogs: ON"){
        console.log('Switched to OFF')
        event.target.innerText = "Filter good dogs: OFF";
        deleteDogBar();
        fetchDogData();
    }
}

function fetchGoodDogsData(){
    let dogData = fetch('http://localhost:3000/pups')
        .then(results => results.json())
        .then(dogs => {
            let goodDogs = dogs.filter(dog => {return dog.isGoodDog===true})
            goodDogs.forEach(dog => renderDog(dog));
        })
}

function deleteDogBar(){
    let dogBarNode = dogBar();
    while(dogBarNode.firstChild){
        dogBarNode.removeChild(dogBarNode.firstChild)
    }
}


function renderDog(dog){
    
    let dogBarDiv = dogBar();
    let newDogSpan = document.createElement('span');
    dogBarDiv.appendChild(newDogSpan);
    newDogSpan.innerText = dog.name;
    newDogSpan.dataset.id = dog.id;
    newDogSpan.addEventListener('click', (e)=> {
        console.log(`Clicked on ${dog.name}`);
        dogHandler(dog, e);
    })
}

function dogBar(){
    return document.getElementById('dog-bar');
}

function dogHandler(dogInfo, event){
    console.log(dogInfo);
    eraseDog();
    let dogDiv = dogInfoBar();
    let dogImage = document.createElement('img');
    dogImage.src = dogInfo.image;
    dogDiv.appendChild(dogImage);
    let dogName = document.createElement('h2');
    dogName.innerText = dogInfo.name;
    dogDiv.appendChild(dogName);
    let dogStatus = makeIsGoodDogButton(dogInfo);

    dogDiv.appendChild(dogStatus);
}

function dogInfoBar(){
    return document.getElementById('dog-info');
}

function eraseDog(){
    let dogInfoNode = dogInfoBar();
    while(dogInfoNode.firstChild){
        dogInfoNode.removeChild(dogInfoNode.firstChild)
    }
}

function changeDogStatus(event){

    let dogID = parseInt(event.target.dataset.id, 10);
    let dogStatus = getIsGoodDogButton().className;
    //note the switch in status below:
    dogStatus === 'true' ? dogStatus = false : dogStatus = true;
    console.log(`Clicked dog status`)
    console.log(dogStatus);
    // this will happen first before the string of fetches
    getIsGoodDogButton().remove(); 
    fetch(`http://localhost:3000/pups/${dogID}`, {
        method: 'PATCH',
        body: JSON.stringify({
            isGoodDog: dogStatus
        }),
        headers: {
        'Content-type': 'application/json',
        }
        })
        .then(response => response.json())
        .then(json => {console.log(json);
            let dogDiv = dogInfoBar();
            let newButton = makeIsGoodDogButton(json);
            dogDiv.appendChild(newButton);
        })
}

function getIsGoodDogButton(){
    return document.querySelector('#dog-info button')
}

function makeIsGoodDogButton(dogInfo){
    let dogStatus = document.createElement('button');
    if(dogInfo.isGoodDog===true){
        dogStatus.innerText = "Good Dog!"
    }
    else if(dogInfo.isGoodDog===false){
        dogStatus.innerText = "Bad Dog!"
    }
    dogStatus.dataset.id = dogInfo.id;
    dogStatus.className = dogInfo.isGoodDog;
    dogStatus.addEventListener('click', (e)=>{changeDogStatus(event)});

    return dogStatus;
}

