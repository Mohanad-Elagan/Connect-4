function promptName(){
    if(nameCounter == 0){
        playerName = prompt("Please enter the name of the first player: ");
    }else{
        playerName = prompt("Please enter the name of the second player: ");
    }
    if(nameCounter < 3){
        nameCounter++;
        evaluatePrompt(playerName);
    }
}
function evaluatePrompt(name) {
    let fadeInCounter = 0;
    if(name != "" && name != null){
        if(name.length >= 3){
            if(name.length <= 7){
                if(nameCounter == 1){
                    inputOne.value = name;
                    promptName();
                }else{
                    if(name != inputOne.value){
                        inputTwo.value = name;
                        setTimeout(function () {
                            let fadeInInter = setInterval(function () {
                                canvas.style.opacity = fadeInCounter;
                                canvasTwo.style.opacity = fadeInCounter;
                                inputOne.style.opacity = fadeInCounter;
                                inputTwo.style.opacity = fadeInCounter;
                                fadeInCounter += 0.015;
                                if (fadeInCounter > 1) {
                                    clearInterval(fadeInInter);
                                }
                            }, 16.6666)
                        }, 250)
                    }else{
                        alert("please enter a different name!");
                        nameCounter--;
                        promptName();
                        return false;
                    }
                }
                return true;
            }else{
                alert("the length of the name shall not be longer than 7!");
                nameCounter--;
                promptName();
                return false;
            }
        }else{
            alert("the length of the name shall not be shorter than 3!");
            nameCounter--;
            promptName();
            return false;
        }
    }else{
        alert("Please enter a name!");
        nameCounter--;
        promptName();
        return false;
    }
}
const canvas = document.body.querySelector("#canvasOne");
const ctxOne = canvas.getContext("2d");
const canvasTwo = document.body.querySelector("#canvasTwo");
const ctxTwo = canvasTwo.getContext("2d");
const img = document.body.querySelector("img");
const inputOne = document.body.querySelector("#inputOne");
const inputTwo = document.body.querySelector("#inputTwo");
const winImg = document.body.querySelector("#winImg");
const winnerDiv = document.body.querySelector("#winner");
const anotherGamePrompt = document.body.querySelector("#anotherGamePrompt");
const goodByeDiv = document.body.querySelector("#goodBye");
canvas.width = 0.55 * screen.width;
canvas.height = canvas.width;
canvasTwo.width = 0.55 * screen.width;
canvasTwo.height = canvasTwo.width;
const CW = canvas.width;
const CH = canvas.height;
const mousePosXCorrection = (screen.width / 2) - (canvas.width / 2);
const mousePosYCorrection = (screen.height / 2) - (canvas.height / 2);
canvas.style.left = mousePosXCorrection + "px";
canvas.style.top = mousePosYCorrection + "px";
canvasTwo.style.left = mousePosXCorrection + "px";
canvasTwo.style.top = mousePosYCorrection + "px";
let selectedCol, selectedRow;
let playerCounter = 0;
let nameCounter = 0;
let streak, avaliblePosY, slowDownFactor, winner, winMsg, playerName, playAgainBool;
let glowBool = true;
let winCirclesCoords = [[0, 0], [0, 0], [0, 0], [0, 0]];
let circleArr = [
    [],
    [],
    [],
    [],
    [],
    [],
    []
];
let squareArr = [
    [],
    [],
    [],
    [],
    [],
    [],
    []
];
let exitCirclesArr = [];

var winMusic = new Howl({
    src:"audio/winMusic.mp3",
    volume: 1,
    onend: function(){
        winMusic.seek(4, winID);
        winMusic.play();
    }
});
var backMusic = new Howl({
    src:"audio/backgroundMusic.mp3",
    volume: 1, 
    loop: true,
});
var winID = winMusic.play();
var backID = backMusic.play();
setTimeout(function () { winMusic.pause(winID); }, 500);

inputOne.style.top = ((screen.height / 2) - 75) + "px";
inputOne.style.left = 0.015 * screen.width + "px";
inputTwo.style.top = ((screen.height / 2) - 75) + "px";
inputTwo.style.right = 0.015 * screen.width + "px";
winImg.style.left = ((screen.width / 2) - 300) + "px";