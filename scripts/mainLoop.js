function mainLoop(){
    ctxOne.clearRect(0, 0, CW, CH);
    drawBoard();
    drawSubBoard();
    drawCircles();
    drawSparkle();
    requestAnimationFrame(mainLoop);
}
createBoard();
mainLoop();
canvasTwo.addEventListener("click", callDetect);
setTimeout(promptName, 500);