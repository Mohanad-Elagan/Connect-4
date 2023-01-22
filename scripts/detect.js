function detect(posX, posY) {
    let counter = 0;
    for (let subArr of squareArr) {
        for (let square of subArr) {
            if (posX > square.posX && posX < square.posX + square.width) {
                if (checkAvalibleSquare(counter)) {
                    let checkWinInterval = setInterval(function () {
                        if (circleArr[selectedCol][5 - selectedRow].posY > (avaliblePosY / 2)) {
                            detectWin();
                            clearInterval(checkWinInterval);
                        }
                    }, 1)
                    break;
                }
            }
        }
        counter++;
    }
}

function callDetect(e) {
    detect(e.clientX - mousePosXCorrection, e.clientY - mousePosYCorrection);
}

function checkAvalibleSquare(colIndex) {
    for (let counter = 5; counter >= 0; counter--) {
        if (squareArr[colIndex][counter].hasCircle) {
            continue;
        } else {
            selectedCol = colIndex;
            selectedRow = counter;
            canvasTwo.removeEventListener("click", callDetect);
            avaliblePosY = squareArr[colIndex][counter].posY;
            createCircle(colIndex, counter);
            return true;
        }
    }
}

function detectWin() {
    if (detectWinVertical() || detectWinHoriz() || detectWinDiagonal()) {
        canvasTwo.removeEventListener("click", callDetect);
        winner = streak;
        slowDownWin();
        let lastKnownPosY = circleArr[selectedCol][5 - selectedRow].posY;
        let setWinner = setInterval(function(){
            if(circleArr[selectedCol][5 - selectedRow].posY == lastKnownPosY){
                callWinner();
                clearInterval(setWinner);
            }
            lastKnownPosY = circleArr[selectedCol][5 - selectedRow].posY;
        }, 50);
    }
}

function detectWinVertical() {
    for (let counter = 0; counter < 7; counter++) {
        for (let counterTwo = 5; counterTwo > 2; counterTwo--) {
            streak = squareArr[counter][counterTwo].circleType;
            if (squareArr[counter][counterTwo - 1].circleType == streak && streak != null) {
                if (squareArr[counter][counterTwo - 2].circleType == streak && streak != null) {
                    if (squareArr[counter][counterTwo - 3].circleType == streak && streak != null) {
                        winCirclesCoords[0] = [counter, counterTwo];
                        winCirclesCoords[1] = [counter, counterTwo - 1];
                        winCirclesCoords[2] = [counter, counterTwo - 2];
                        winCirclesCoords[3] = [counter, counterTwo - 3];
                        return true;
                    }
                }
            }
        }
    }
}

function detectWinHoriz() {
    for (let counter = 0; counter < 4; counter++) {
        for (let counterTwo = 0; counterTwo < 6; counterTwo++) {
            streak = squareArr[counter][counterTwo].circleType;
            if (squareArr[counter + 1][counterTwo].circleType == streak && streak != null) {
                if (squareArr[counter + 2][counterTwo].circleType == streak && streak != null) {
                    if (squareArr[counter + 3][counterTwo].circleType == streak && streak != null) {
                        winCirclesCoords[0] = [counter, counterTwo];
                        winCirclesCoords[1] = [counter + 1, counterTwo];
                        winCirclesCoords[2] = [counter + 2, counterTwo];
                        winCirclesCoords[3] = [counter + 3, counterTwo];
                        return true;
                    }
                }
            }
        }
    }
}

function detectWinDiagonal() {
    for (let counter = 0; counter < 7; counter++) {
        for (let counterTwo = 0; counterTwo < 6; counterTwo++) {
            try{
                streak = squareArr[counter][counterTwo].circleType;
                if(squareArr[counter + 1][counterTwo + 1].circleType == streak && streak != null){
                    if(squareArr[counter + 2][counterTwo + 2].circleType == streak && streak != null){
                        if(squareArr[counter + 3][counterTwo + 3].circleType == streak && streak != null){
                            winCirclesCoords[0] = [counter, counterTwo];
                            winCirclesCoords[1] = [counter + 1, counterTwo + 1];
                            winCirclesCoords[2] = [counter + 2, counterTwo + 2];
                            winCirclesCoords[3] = [counter + 3, counterTwo + 3];
                            return true;
                        }
                    }
                }
            }catch(TypeError){}
            try{
                streak = squareArr[counter][counterTwo].circleType;
                if(squareArr[counter - 1][counterTwo + 1].circleType == streak && streak != null){
                    if(squareArr[counter - 2][counterTwo + 2].circleType == streak && streak != null){
                        if(squareArr[counter - 3][counterTwo + 3].circleType == streak && streak != null){
                            winCirclesCoords[0] = [counter, counterTwo];
                            winCirclesCoords[1] = [counter - 1, counterTwo + 1];
                            winCirclesCoords[2] = [counter - 2, counterTwo + 2];
                            winCirclesCoords[3] = [counter - 3, counterTwo + 3];
                            return true;
                        }
                    }
                }
            }catch(TypeError){}
            try{
                streak = squareArr[counter][counterTwo].circleType;
                if(squareArr[counter + 1][counterTwo - 1].circleType == streak && streak != null){
                    if(squareArr[counter + 2][counterTwo - 2].circleType == streak && streak != null){
                        if(squareArr[counter + 3][counterTwo - 3].circleType == streak && streak != null){
                            winCirclesCoords[0] = [counter, counterTwo];
                            winCirclesCoords[1] = [counter + 1, counterTwo - 1];
                            winCirclesCoords[2] = [counter + 2, counterTwo - 2];
                            winCirclesCoords[3] = [counter + 3, counterTwo - 3];
                            return true;
                        }
                    }
                }
            }catch(TypeError){}
            try{
                streak = squareArr[counter][counterTwo].circleType;
                if(squareArr[counter - 1][counterTwo - 1].circleType == streak && streak != null){
                    if(squareArr[counter - 2][counterTwo - 2].circleType == streak && streak != null){
                        if(squareArr[counter - 3][counterTwo - 3].circleType == streak && streak != null){
                            winCirclesCoords[0] = [counter, counterTwo];
                            winCirclesCoords[1] = [counter - 1, counterTwo - 1];
                            winCirclesCoords[2] = [counter - 2, counterTwo - 2];
                            winCirclesCoords[3] = [counter - 3, counterTwo - 3];
                            return true;
                        }
                    }
                }
            }catch(TypeError){}
        }
    }
}