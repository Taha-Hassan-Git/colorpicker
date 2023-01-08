const generateBtn = document.getElementById("generate");
const showerBtn = document.getElementById("shower");
const lockBtnArray = document.querySelectorAll(".lock");

generateColors()

lockBtnArray.forEach((element) => {
    //adds the event listener for the lock icon
    element.addEventListener("click", handleLock);
})
function handleLock(e){
    //when lock icon is clicked it toggles the classname "locked"
    const parentElement = e.target.parentNode.parentNode;
    if (parentElement.classList.contains("locked")){
        parentElement.classList.remove("locked");
    } else {
        parentElement.classList.add("locked");
    }
}

generateBtn.addEventListener("click", generateColors);
function howManyLocked(){
    let lockedArray = [];
    let unlockedArray = [];
    document.querySelectorAll('.color').forEach(element =>{
    if (element.classList.contains("locked")){
        lockedArray.push(element);
    } else {
        unlockedArray.push(element);
    }});
    return {"lockedArray": lockedArray, "unlockedArray": unlockedArray}
}
function generateColors(){
    var colorArray = [];
    var lockedUnlocked = howManyLocked();
    if (lockedUnlocked.lockedArray.length == 0){
        var randomColor = "#" + Math.random().toString(16).substring(2, 8);
        console.log(randomColor);
        let newColorObj = similarColors(randomColor)
        newColorObj[0] = randomColor;
        lockedUnlocked.unlockedArray.forEach((element, index) =>{
            const colorName = element.querySelector('.name');
            element.style.backgroundColor = newColorObj[index];
            colorName.innerHTML = newColorObj[index];
        });
    } else {
        
    }
};

function similarColors(color) {
    // Convert the input color to RGB
    let rgb = hex2rgb(color);
    let r = rgb[0];
    let g = rgb[1];
    let b = rgb[2];
    var newColorObj = {
        "0": "",
        "1": rgbToHex(b , r, g),
        "2": rgbToHex(normalise(r+40), normalise(g+40), normalise(b+40)),
        "3": rgbToHex(normalise(b+40), normalise(r+40), normalise(g+40)),
        "4": rgbToHex(normalise(r-40), normalise(g-40), normalise(b-40)),
        "5": rgbToHex(normalise(b-40), normalise(r-40), normalise(g-40)),
        "6": rgbToHex(255-r, g, b),
        "7": rgbToHex(r, 255-g, b),
        "8": rgbToHex(r, g, 255-b),
        "9": "#" + Math.random().toString(16).substring(2, 8)
    }
    return newColorObj
} 

function hex2rgb(hexa){
    var r = parseInt(hexa.slice(1,3), 16);
        g = parseInt(hexa.slice(3,5), 16);
        b = parseInt(hexa.slice(5,7), 16);
    return [r,g,b]
  }
function rgbToHex(r, g, b) {
  return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}

function getRandomIntInclusive(min, max) {
    //Generates random Ints, called by various functions
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function normalise(value){
    let max = 255
    let min = 0
    if (value > 255){
        value = 255
    }  if (value < 0){
        value = 0
    }
    return value
}

