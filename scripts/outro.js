function outro() {
    let fadeOutCounter = 1;
    let fadeAudioCounter = 1;
    glowBool = false;
    setTimeout(function () {
        let fadeOutInter = setInterval(function () {
            canvas.style.opacity = fadeOutCounter;
            canvasTwo.style.opacity = fadeOutCounter;
            inputOne.style.opacity = fadeOutCounter;
            inputTwo.style.opacity = fadeOutCounter;
            winImg.style.opacity = fadeOutCounter;
            winnerDiv.style.opacity = fadeOutCounter;
            anotherGamePrompt.style.opacity = fadeOutCounter;
            winMusic.volume(fadeOutCounter, winID);
            fadeOutCounter -= 0.015;
            if (fadeOutCounter < 0) {
                if (playAgainBool) {
                    location.reload();
                } else {
                    canvas.style.display = "none";
                    canvasTwo.style.display = "none";
                    inputOne.style.display = "none";
                    inputTwo.style.display = "none";
                    winImg.style.display = "none";
                    winnerDiv.style.display = "none";
                    goodByeDiv.style.cursor = "default";
                    anotherGamePrompt.style.display = fadeOutCounter;
                    goodByeDiv.style.width = screen.width + "px";
                    goodByeDiv.style.height = screen.height + "px";
                    goodByeDiv.style.lineHeight = screen.height + "px";
                    goodByeDiv.innerHTML = "Good Bye! (you can close the game now...)";
                    goodByeDiv.style.animationName = "fadeIn";
                    goodByeDiv.style.animationIterationCount = "1";
                    goodByeDiv.style.animationDuration = "1.5s";
                }
                clearInterval(fadeOutInter);
            }
        }, 16.6666)
    }, 250)
}