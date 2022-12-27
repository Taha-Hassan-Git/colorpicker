const generateBtn = document.getElementById("generate");
const lockBtnArray = document.querySelectorAll(".lock");


lockBtnArray.forEach((element) => {
    element.addEventListener("click", handleLock);
})

generateBtn.addEventListener("click", function () {
    document.querySelectorAll('.color').forEach(randomColor)});

function randomColor(element){
    if (element.classList.contains("locked")){

    } else {
        const colorName = element.querySelector('.name');
        var randomColor = Math.floor(Math.random()*16777215).toString(16);
        element.style.backgroundColor = "#" + randomColor;
        colorName.innerHTML = "#" + randomColor;
    }
    
}

function handleLock(e){
    const parentElement = e.target.parentNode.parentNode;
    parentElement.classList.add("locked");
}

document.querySelectorAll('.color').forEach(randomColor);


