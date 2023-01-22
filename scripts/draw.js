function drawBoard() {
    ctxTwo.clearRect(0, 0, CW, CH);
    for (let counter = 0; counter < 7; counter++) {
        for (let counterTwo = 1; counterTwo < 7; counterTwo++) {
            ctxTwo.drawImage(img, (counter / 7) * CW, (counterTwo / 7) * CH, (1 / 7) * CW, (1 / 7) * CW);
        }
    }
}

function drawSubBoard() {
    for (let subArr of squareArr) {
        for (let square of subArr) {
            square.draw();
        }
    }
}

function drawCircles() {
    for (let subArr of circleArr) {
        for (let circle of subArr) {
            circle.draw();
        }
    }
}

function drawSparkle() {
    for (let subArr of squareArr) {
        for(let square of subArr){
            for(let sparkle of square.sparkleArr){
                sparkle.draw();
            }
        }
    }
}