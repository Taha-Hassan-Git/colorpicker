const generateBtn = document.getElementById("generate");
const showerBtn = document.getElementById("shower");
const lockBtnArray = document.querySelectorAll(".lock");
const btnArray = document.querySelectorAll(".button");
const colorInputArr = document.querySelectorAll(".input");
const colorElementArr = document.querySelector(".color");

//generates colours on page load
generateColors()
colorInputArr.forEach((e) => {
    //add event listener to color inputs
    e.addEventListener("input", handleChange);
})
function handleChange(e){
    let colorElement = e.target.parentElement.parentElement;
    let colorName = colorElement.querySelector(".name");
    colorElement.style.backgroundColor = e.target.value;
    colorName.innerHTML = e.target.value;
    console.log(e.target.value);
    contrastCheck(hex2rgb(e.target.value), colorElement);
}
lockBtnArray.forEach((element) => {
    //adds the event listener for the lock icon
    element.addEventListener("click", handleLock);
})
function handleLock(e){
    //when lock icon is clicked it toggles the classname "locked"
    //and changes the lock icon
    const parentElement = e.target.parentNode.parentNode;
    if (parentElement.classList.contains("locked")){
        parentElement.classList.remove("locked");
        e.target.classList.remove("fa-lock");
        e.target.classList.add("fa-lock-open");
    } else {
        parentElement.classList.add("locked");
        e.target.classList.remove("fa-lock-open");
        e.target.classList.add("fa-lock");
    }
}


generateBtn.addEventListener("click", generateColors);
function howManyLocked(){
    //checks how many colour elements are locked/unlocked
    //returns an object with two arrays of locked/unlocked elements
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
    //find how many are locked
    var lockedUnlocked = howManyLocked();
    if (lockedUnlocked.lockedArray.length == 0){
        //If there are no locked elements then generate a random colour
        //to put into the similarColors function
        var randomColor = "#" + Math.random().toString(16).substring(2, 8);
        let newColorObj = similarColors(randomColor)
        changeBtnBg(randomColor);
        newColorObj[0] = randomColor;
        lockedUnlocked.unlockedArray.forEach((element, index) =>{
            const colorName = element.querySelector('.name');
            let newColor = newColorObj[index];
            element.style.backgroundColor = newColor;
            colorName.innerHTML = newColor;
            //change value of color input
            element.childNodes[1].childNodes[5].value = newColor;
            //check brightness of the colour and change between white
            //and black text accordingly
            let rgbNewColor = hex2rgb(newColor);
            contrastCheck(rgbNewColor,element);
        });
    } else {
        //Make an array of locked colours and select one at random
        //to feed into similarcolors function
        seedColors = []
        lockedUnlocked.lockedArray.forEach(element => seedColors.push(element.querySelector('.name').innerHTML));
        let newColorObj = similarColors(seedColors[getRandomIntInclusive(0, seedColors.length -1)]);
        changeBtnBg(seedColors[0]);
        lockedUnlocked.unlockedArray.forEach((element) =>{
            const colorName = element.querySelector('.name');
            let randomColor = newColorObj[getRandomIntInclusive(1,11)];
            element.style.backgroundColor = randomColor;
            colorName.innerHTML = randomColor;
            //change value of color input
            element.childNodes[1].childNodes[5].value = randomColor;
            let rgbRandomColor = hex2rgb(randomColor);
            contrastCheck(rgbRandomColor, element);
        });
    }
};

function similarColors(color) {
    // Convert the input color to RGB
    let rgb = hex2rgb(color);
    let r = rgb[0];
    let g = rgb[1];
    let b = rgb[2];
    //generate an object of similar colours, complementary colours invert the 
    //rgb values, and tertiary colours invert just one of the three values.
    //The object also generates darker and lighter shades of these similar colours
    //as well as the original colour, and 3 completely random colours.
    var newColorObj = {
        //left blank for generateColors function to add the seed colour
        "0": '',
        //lighter/darker shades of seed colour
        "1": rgbToHex(normalise(r+60), normalise(g+60), normalise(b+60)),
        "2": rgbToHex(normalise(r-60), normalise(g-60), normalise(b-60)),
        //inverted values, complementary colour and shades of it
        "3": rgbToHex(b , r, g),
        "4": rgbToHex(normalise(b+60), normalise(r+60), normalise(g+60)),
        "5": rgbToHex(normalise(b-60), normalise(r-60), normalise(g-60)),
        //Tertiary colours, one value inverted
        "6": rgbToHex(255-r, g, b),
        "7": rgbToHex(r, 255-g, b),
        "8": rgbToHex(r, g, 255-b),
        //random colours
        "9": "#" + Math.random().toString(16).substring(2, 8),
        "10": "#" + Math.random().toString(16).substring(2, 8),
        "11": "#" + Math.random().toString(16).substring(2, 8),
    }
    return newColorObj
}

function changeBtnBg(color){
    btnArray.forEach(e => {e.style.backgroundColor = color 
        contrastCheck(hex2rgb(color), e)});
}

function contrastCheck(color, element) {
    element.style.color = "black";
    if (color[0]  < 100 && color[1]  < 100&& color[2] < 120){
        element.style.color = "white";
    }
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
    //Bring rgb values back to max and min values
    if (value > 255){
        value = 255
    }  if (value < 0){
        value = 0
    }
    return value
}

