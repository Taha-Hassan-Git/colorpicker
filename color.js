const generateBtn = document.getElementById("generate");
const showerBtn = document.getElementById("shower");
const lockBtnArray = document.querySelectorAll(".lock");
const btnArray = document.querySelectorAll(".button");
const colorInputArr = document.querySelectorAll(".input");
const copyArr = document.querySelectorAll(".copy");
let previousColors = []

//  generateColors is the function that runs on load and 
//  whenever the user presses the spacebar/right arrow key or clicks
//  the generate btn. It's the main engine of the program.
//
// Helper functions: 
//                   howManyLocked         || checks which divs are locked
//                   similarColors         || returns an object of similar colors from a seed color
//                   changeBtnBg           || updates the btn color
//                   updateColors          || changes the appearance of the divs to match the generated colors
//                   hex2Rgb/rgbtohex      || translate color values between the two standards
//                   getRandomIntInclusive || generates random ints
//                   normalise             || brings rgb values back to min and max levels

function generateColors(){
    //find how many are locked
    let lockedUnlocked = howManyLocked();
    if (lockedUnlocked.lockedArray.length == 0){
        //If there are no locked elements then generate a random colour
        //to put into the similarColors function
        const randomColor = "#" + Math.random().toString(16).substring(2, 8);
        let newColorObj = similarColors({color: randomColor,locked: false });
        changeBtnBg(randomColor);
        newColorObj[0] = randomColor;
        setTimeout(() => {
            let arr = [];
            lockedUnlocked.unlockedArray.forEach((element) => arr.push(element.id));
            
            previousColors.push(arr);
          }, 0);
        lockedUnlocked.unlockedArray.forEach((element, index)=>{
            updateColors(element, newColorObj[index]);
        });
    } else {
        //Make an array of locked colours and select one at random
        //to feed into similarcolors function
        seedColors = []
        lockedUnlocked.lockedArray.forEach(element => seedColors.push(element.querySelector('.name').innerHTML));
        let newColorObj = similarColors({color: seedColors[getRandomIntInclusive(0, seedColors.length -1)], locked: true});
        changeBtnBg(seedColors[0]);
        lockedUnlocked.unlockedArray.forEach((element) =>{
            updateColors(element, newColorObj[getRandomIntInclusive(1,23)]);
        });
    }
};



function similarColors(color) {
    // Convert the input color to RGB
    let rgb = hex2rgb(color.color);
    let r = rgb[0];
    let g = rgb[1];
    let b = rgb[2];
    let newColorObj = {}
    //generate an object of similar colours, 

    //              Complementary colours || invert the rgb values
    //              tertiary colours      || invert just one of the three values.

    //The object also generates darker and lighter shades of these similar colours
    //as well as the original colour, and 3 completely random colours.
    if (color.locked){
        newColorObj = {
            //left blank for generateColors function to add the seed colour
            0: '',
            //lighter/darker shades of seed colour
            1: rgbToHex(normalise(r+30), normalise(g+30), normalise(b+30)),
            2: rgbToHex(normalise(r-30), normalise(g-30), normalise(b-30)),
            3: rgbToHex(normalise(r+60), normalise(g+60), normalise(b+60)),
            4: rgbToHex(normalise(r-60), normalise(g-60), normalise(b-60)),
            //inverted values, complementary colour and shades of it
            5: rgbToHex(b , r, g),
            6: rgbToHex(normalise(b+20), normalise(r+20), normalise(g+20)),
            7: rgbToHex(normalise(b-20), normalise(r-20), normalise(g-20)),
            8: rgbToHex(normalise(b+40), normalise(r+40), normalise(g+40)),
            9: rgbToHex(normalise(b-40), normalise(r-40), normalise(g-40)),
            10: rgbToHex(normalise(b+50), normalise(r+50), normalise(g+50)),
            11: rgbToHex(normalise(b-50), normalise(r-50), normalise(g-50)),
            //Tertiary colours, one value inverted, and shades of them
            12: rgbToHex(255-r, g, b),
            13: rgbToHex(normalise((255-r)+20), normalise(g+20), normalise(b+20)),
            14: rgbToHex(normalise((255-r)-20), normalise(g-20), normalise(b-20)),
            15: rgbToHex(r, 255-g, b),
            16: rgbToHex(normalise(r-20), normalise((255-g)-20), normalise(b-20)),
            17: rgbToHex(normalise(r+20), normalise((255-g)+20), normalise(b+20)),
            18: rgbToHex(r, g, 255-b),
            19: rgbToHex(normalise(r-20), normalise(g-20), normalise((255-b)-20)),
            20: rgbToHex(normalise(r+20), normalise(g+20), normalise((255-b)+20)),
            //random colours
            21: "#" + Math.random().toString(16).substring(2, 8),
            22: "#" + Math.random().toString(16).substring(2, 8),
            23: "#" + Math.random().toString(16).substring(2, 8),
        }
    } else {
        newColorObj = {
            //left blank for generateColors function to add the seed colour
            0: '',
            // Complemeentary and tertiary colors
            1: rgbToHex(b , r, g),
            2: rgbToHex(255-r, g, b),
            3: rgbToHex(r, 255-g, b),
            4: rgbToHex(r, g, 255-b),
        }
    }
    
    return newColorObj
}




function handleChange(e){
    let colorElement = e.target.parentElement.parentElement;
    let colorName = colorElement.querySelector(".name");
    colorElement.style.backgroundColor = e.target.value;
    colorName.innerHTML = e.target.value;
    contrastCheck(hex2rgb(e.target.value), colorElement);
}



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

    

function updateColors(element, color){
        const colorInput = element.querySelector('.input');
        const colorName = element.querySelector('.name');
        colorName.innerHTML = color;
        element.style.backgroundColor = color;
        element.id = color;
        colorInput.value = color;
        let rgbColor = hex2rgb(color);
        contrastCheck(rgbColor,element);
}



function changeBtnBg(color){
    let arr = [];
    let divArray =  document.querySelectorAll(".color");
    divArray.forEach(e => arr.push(e.classList.contains("locked")));
    if (arr.includes(true)){
        
    }
    btnArray.forEach((btn)=>{
        btn.style.backgroundColor = color; 
        contrastCheck(hex2rgb(color), btn);
    });
}

function contrastCheck(color, element) {
    element.style.color = "black";
    if (color[0]  < 100 && color[1]  < 100&& color[2] < 120){
        element.style.color = "white";
        if (element.tagName == 'DIV'){
            element.childNodes[3].childNodes[1].style.boxShadow = "3px 3px 29px -4px rgba(179,179,179,0.20)";
        }
    }
}





//      ||||    EVENT LISTENERS        ||||


generateBtn.addEventListener("click", generateColors);


lockBtnArray.forEach((element) => {
    //adds the event listener for the lock icon
    element.addEventListener("click", handleLock);
})


colorInputArr.forEach((e) => {
    //add event listener to color inputs
    e.addEventListener("input", handleChange);
})


document.getElementById("back").addEventListener("click", backButton);

function backButton(){
    previousColors.pop();
    let arr = previousColors.slice(-1).flat();
    document.querySelectorAll('.color').forEach((element, index) =>{
        updateColors(element, arr[index])
    });
}



document.addEventListener("keyup", function(event) {
    //keyboard functionality
    if (event.code === "Space" || event.code === "ArrowRight") {
      generateColors();
    }
    if (event.code === "ArrowLeft"){
      backButton();
    }
  });


  
copyArr.forEach((arr)=>{
      arr.addEventListener("click",copyColor);
  });
function copyColor(e) {
    // Get the text field
    const copyText = e.target.parentElement.parentElement.id;
     // Copy the text
    navigator.clipboard.writeText(copyText);
    // Alert the copied text
    alert("Copied colour! " + copyText);
}





//      ||||      HELPER FUNCTIONS  ||||


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


//          GENERTE COLORS ON PAGE LOAD


generateColors()