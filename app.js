let kittens = []
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */


function addKitten(event) {
  event.preventDefault()
  let form = event.target
  let randAffect = Math.floor(Math.random() * (6 - 2 + 1)) + 2;
  let defaultMood = "tolerant"
  if (randAffect > 5){
    defaultMood = "happy"
  }
  else if (randAffect < 4){
    defaultMood = "angry"
  }
  let kitten = {
    id: generateId(),
    name: form.name.value,
    mood: defaultMood,
    affection: randAffect
  }


  let kittenName = form.name.value
  let currentKitten = kittens.find(kitten => kitten.name == kittenName)

  if (kittenName == "") {
    alert("Kitten needs a name")
  }

  else if(currentKitten){
    alert("Kitten already exists")
  }
  else {
    kittens.push(kitten)
    saveKittens()
    form.reset()
  }
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens 
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  drawKittens()
}

function removeKitten(kittenId) {
  let index = kittens.findIndex(kitten => kitten.id == kittenId)
  if (index == -1) {
    throw new Error("Invalid Kitten Id")
  }
  kittens.splice(index, 1)
  saveKittens()
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let storedKittens = JSON.parse(window.localStorage.getItem("kittens"))
  if (storedKittens) {
    kittens = storedKittens
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let kittenListElement = document.getElementById("kittens")
  let kittensTemplate = ""
  kittens.forEach((kitten,index) => {
    kittensTemplate += `
    <div class="cat-border mt-3 mb-3 p-3 card shadow container ${kitten.mood} kitten">
    <img src="https://robohash.org/${kitten.name}?set=set4&size=140x140">
    <div><h3 class="mt-1 mb-1 d-flex justify-content-center">${kitten.name}</h3></div>
    <div class="mt-3"><p><span>Mood: ${kitten.mood}</span></p></div>
    <div><p><span>Affection: ${kitten.affection}</span></p></div>
    <p>
    <button class="btn-dark" onclick="pet('${kitten.id}')">Pet</button>
    <button onclick="catnip('${kitten.id}')">Feed CatNip</button>
    </p>
    <div style="pointer-events: all;" class="d-flex justify-content-center">
    <i class="action far fa-trash-alt text-danger" onclick="removeKitten('${kitten.id}')"></i>
    </div>
    </div>
    `
  })
  document.getElementById("kittens").classList.remove("hidden")
  document.getElementById("add-kitten").classList.remove("hidden")
  kittenListElement.innerHTML = kittensTemplate
  document.getElementById("clearKittens").classList.add("hidden")

  if(kittens.length > 0){
    document.getElementById("clearKittens").classList.remove("hidden")
  }

}


/**
 * Find the kitten in the array by its id
 * @param {string} id 
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(kitten => kitten.id == id)
}


/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5 
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id 
 */
function pet(id) {
  let kittenTarget = findKittenById(id)
  if (Math.random() > .5){
  kittenTarget.affection ++
}
  else {
    kittenTarget.affection --
  }
  setKittenMood(kittenTarget)
  saveKittens()
  console.log(kittenTarget)
}
/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
  let kittenTarget = findKittenById(id)
  kittenTarget.mood = "tolerant"
  kittenTarget.affection = 5
  saveKittens()
  drawKittens()
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
 */
function setKittenMood(kitten) {
  kitten.mood = "tolerant"
  if (kitten.affection <= 3){
    kitten.mood = "angry"
  }
  if(kitten.affection >= 6){
    kitten.mood = "happy"
  }
  else if(kitten.affection == 0){
    kitten.mood = "gone"
}
  saveKittens()
}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens(){
  kittens = []
  saveKittens()
}

/**
 * Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").remove();
  console.log('Good Luck, Take it away')
  drawKittens()
}


// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{name: string, mood: string, affection: number}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

loadKittens()
