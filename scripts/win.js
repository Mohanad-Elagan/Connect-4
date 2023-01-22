function slowDownWin() {
    let intervalCounter = 0;
    if (selectedRow == 5) {
        slowDownFactor = 4.5;
    } else if (selectedRow == 4) {
        slowDownFactor = 3.8;
    } else if (selectedRow == 3) {
        slowDownFactor = 3.7;
    } else if (selectedRow == 2) {
        slowDownFactor = 3.5;
    } else if (selectedRow == 1) {
        slowDownFactor = 2.5;
    }
    let slowMusic = setInterval(function(){
        backMusic.rate((500 - intervalCounter) / 500, backID);
        if (intervalCounter > 500) {
            backMusic.pause(backID);
            clearInterval(slowMusic);
        }
    }, 50);
    let winInterval = setInterval(function () {
        if (selectedRow != 0) {
            circleArr[selectedCol][5 - selectedRow].accel = Math.max((((avaliblePosY - circleArr[selectedCol][5 - selectedRow].posY) / 2100) * 16.6666666), (selectedRow / slowDownFactor));
        } else {
            circleArr[selectedCol][5 - selectedRow].accel = 0.3;
        }
        intervalCounter++;
        if (intervalCounter > 500) {
            clearInterval(winInterval);
        }
    }, 1);
    winMusic.play(winID);
}

function winGlow() {
    setTimeout(function () {
        for (let subArr of winCirclesCoords) {
            circleArr[subArr[0]][5 - subArr[1]].travelBool = false;
            circleArr[subArr[0]][5 - subArr[1]].glowBool = false;
            circleArr[subArr[0]][5 - subArr[1]].deGlowBool = false;
            circleArr[subArr[0]][5 - subArr[1]].glowCounter = 0;
            circleArr[subArr[0]][5 - subArr[1]].deGlowCounter = 50;
        }
    }, 200);
}

function callWinner(){
    if(winner != null){
        if(winner == "red"){
            winMsg = "<b style='color:red;'>" + inputOne.value + "</b>" + " wins!";
        }else{
            winMsg = "<b style='color:green;'>" + inputTwo.value + "</b>" + " wins!";
        }
    }
    let intervalCounter = 0;
    let winnerInterval = setInterval(function(){
        winImg.style.width = intervalCounter + "px";
        winImg.style.height = (intervalCounter / 3) + "px";
        winImg.style.top = ((-0.25 * intervalCounter) + 150) + 20 + "px";
        winImg.style.left = ((screen.width / 2) - (intervalCounter / 2)) + "px";

        if(intervalCounter > 600){
            winnerDiv.style.width = intervalCounter + "px";
            winnerDiv.style.height = (intervalCounter / 9) + "px";
            winnerDiv.style.top = ((-0.25 * intervalCounter) + 150) + 270 + "px";
            winnerDiv.style.left = ((screen.width / 2) - (intervalCounter / 2)) + "px";
            winnerDiv.innerHTML = winMsg;
            winnerDiv.style.animationName = "fadeIn";
            winnerDiv.style.animationIterationCount = "1";
            winnerDiv.style.animationDuration = "1s";

            anotherGamePrompt.style.width = intervalCounter + "px";
            anotherGamePrompt.style.height = (intervalCounter / 4.5) + "px";
            anotherGamePrompt.style.top = ((-0.25 * intervalCounter) + 150) + 400 + "px";
            anotherGamePrompt.style.left = ((screen.width / 2) - (intervalCounter / 2)) + "px";
            anotherGamePrompt.innerHTML = "<div>play another game?</div> <div><span onclick='outro();playAgainBool = true'>yes</span> <span onclick='outro(); playAgainBool = false;'>no</span></div>";
            anotherGamePrompt.style.animationName = "fadeIn";
            anotherGamePrompt.style.animationIterationCount = "1";
            anotherGamePrompt.style.animationDuration = "1s";
            
            clearInterval(winnerInterval);
        }
        intervalCounter += 50;
    }, 16.6666);
}