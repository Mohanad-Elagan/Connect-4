function createBoard(){
    for(let counter = 0; counter < 7; counter++){
        for(let counterTwo = 0; counterTwo < 6; counterTwo++){
            squareArr[counter].push(new square((counter / 7) * CW, ((counterTwo + 1) / 7) * CH));
        }
    }
}
function createCircle(colIndex, counter){
    squareArr[colIndex][counter].hasCircle = true;
    if(playerCounter % 2 == 0){
        circleArr[colIndex].push(new circle(((colIndex / 7) * CW) + (CW / 14), CH / 14, "rgb(220, 35, 0)"));
        squareArr[colIndex][counter].circleType = "red";
    }else{
        circleArr[colIndex].push(new circle(((colIndex / 7) * CW) + (CW / 14), CH / 14, "green"));
        squareArr[colIndex][counter].circleType = "green";
    }
    playerCounter++;
}