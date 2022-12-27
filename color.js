const generateBtn = document.getElementById("generate")
function randomColor(element){
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    element.style.backgroundColor = "#" + randomColor;
}

document.querySelectorAll('.color').forEach(randomColor)


generateBtn.addEventListener("click", function () {
    document.querySelectorAll('.color').forEach(randomColor)});