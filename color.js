const generateBtn = document.getElementById("generate");
const showerBtn = document.getElementById("shower");
const lockBtnArray = document.querySelectorAll(".lock");
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

lockBtnArray.forEach((element) => {
    //adds the event listener for the lock icon
    element.addEventListener("click", handleLock);
})
function handleLock(e){
    //when lock icon is clicked it toggles the classname "locked"
    const parentElement = e.target.parentNode.parentNode;
    if (parentElement.classList.contains("locked")){
        parentElement.classList.remove("locked")
    } else {
        parentElement.classList.add("locked");
    }
}

generateBtn.addEventListener("click", randomColor);

function randomColor(){
    let lockedArray = [];
    let unlockedArray = [];
    document.querySelectorAll('.color').forEach(element =>{
    if (element.classList.contains("locked")){
        lockedArray.push(element);
    } else {
        unlockedArray.push(element);
    }});
    if (lockedArray.length == 0){
        var randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
        generationMethod = getRandomIntInclusive(1,4);
        if (generationMethod == 1){
            var colorArray = generateComplementaryColors(randomColor);
        } if (generationMethod == 2){
            var colorArray = generateMonochromaticColors(randomColor);
        } else {
            var colorArray = generateTriadicColors(randomColor);
        }
        colorArray.unshift(randomColor);
        unlockedArray.forEach((element, index) =>{
            const colorName = element.querySelector('.name');
            element.style.backgroundColor = colorArray[index];
            colorName.innerHTML = colorArray[index];
        });
    } 
};

function generateTriadicColors(hex) {
    // Convert the input color to RGB
    let rgb = hex2rgb(hex);
    let r = rgb[0];
    let g = rgb[1];
    let b = rgb[2];
  
    // Generate the triadic colors
    let color1 = rgbToHex(r, g, 255 - b);
    let color2 = rgbToHex(255 - r, g, b);
    let color3 = rgbToHex(Math.floor(255 - r * 0.4), Math.floor(g * 0.4), Math.floor(b * 0.4));
    let color4 = rgbToHex(Math.floor(r * 0.2), Math.floor(g * 0.2), Math.floor(255 - b * 0.2));
  
    return [color1, color2, color3, color4];
  }

function generateMonochromaticColors(hex) {
    // Convert the input color to RGB
    let rgb = hex2rgb(hex);
    let r = rgb[0];
    let g = rgb[1];
    let b = rgb[2];
  
    // Generate the monochromatic colors
    let color1 = rgbToHex(Math.floor(r * 0.8), Math.floor(g * 0.8), Math.floor(b * 0.8));
    let color2 = rgbToHex(Math.floor(r * 0.6), Math.floor(g * 0.6), Math.floor(b * 0.6));
    let color3 = rgbToHex(Math.floor(r * 0.4), Math.floor(g * 0.4), Math.floor(b * 0.4));
    let color4 = rgbToHex(Math.floor(r * 0.2), Math.floor(g * 0.2), Math.floor(b * 0.2));
  
    return [color1, color2, color3, color4];
  }

function generateComplementaryColors(hex) {
    // Convert the input color to RGB
  let rgb = hex2rgb(hex);
  let r = rgb[0];
  let g = rgb[1];
  let b = rgb[2];

  // Generate the complementary colors
  let color1 = rgbToHex(255 - r, 255 - g, 255 - b);
  let color2 = rgbToHex(255 - r, g, b);
  let color3 = rgbToHex(r, 255 - g, b);
  let color4 = rgbToHex(r, g, 255 - b);

  return [color1, color2, color3, color4];
}

function hex2rgb(hexa){
    var r = parseInt(hexa.slice(1,3), 16);
        g = parseInt(hexa.slice(3,5), 16);
        b = parseInt(hexa.slice(5,7), 16);
    return [r,g,b]
  }
function rgbToHex(r, g, b) {
// Convert the red, green, and blue values to hexadecimal strings
let hexR = r.toString(16).padStart(2, "0");
let hexG = g.toString(16).padStart(2, "0");
let hexB = b.toString(16).padStart(2, "0");

// Concatenate the hexadecimal strings and add the "#" prefix
return "#" + hexR + hexG + hexB;
}

function getRandomIntInclusive(min, max) {
    //Generates random Ints, called by various functions
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}


