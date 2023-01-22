class square {
    constructor(posX, posY) {
        this.posX = posX;
        this.posY = posY;
        this.width = CW / 7;
        this.height = this.width;
        this.hasCircle = false;
        this.circleType = null;
        this.clr = "transparent";
        this.sparkleCounter = 0;
        this.sparkleArr = [];
    }
    draw(){
        ctxOne.save();
        ctxOne.translate(this.posX, this.posY);
        ctxOne.fillStyle = this.clr;
        ctxOne.fillRect(0, 5, this.width, this.height);
        ctxOne.restore();
    }
    initiateSparkle(){
        if(this.sparkleCounter == 0){
            for (let counter = 0; counter < 75; counter++) {
                if (counter % 2 == 0) {
                    this.sparkleArr.push(new sparkle(1, this.posX + (this.width / 2), this.posY + (this.height / 2)));
                } else {
                    this.sparkleArr.push(new sparkle(-1, this.posX + (this.width / 2), this.posY + (this.height / 2)));
                }
                this.sparkleArr[counter].launch();
                this.sparkleCounter++;
            }
        }
        if (slowDownFactor > 0 && glowBool) {
            winGlow();
            let glowInter = setInterval(function () {
                if (glowBool) {
                    winGlow();
                } else {
                    clearInterval(glowInter);
                }
            }, 2000);
            setTimeout(function () { clearInterval(glowInter) }, 30000);
        }
    }
}

class circle {
    constructor(posX, posY, clr) {
        this.posX = posX;
        this.posY = posY;
        this.radius = 0.4 * (CW / 7);
        this.clr = clr;
        this.arcProgress = 0;
        this.glowBool = false;
        this.deGlowBool = false;
        this.glowCounter = 0;
        this.deGlowCounter = 50;
        this.distanceLeft = squareArr[selectedCol][selectedRow].posY + (CH / 14);
        this.travelBool = false;
        this.travelCounter = 1;
        this.accel = 0;
        this.active = true;
    }
    draw() {
        ctxOne.save();
        ctxOne.translate(this.posX, this.posY);
        ctxOne.strokeStyle = "white";
        ctxOne.fillStyle = this.clr;
        ctxOne.lineWidth = 0.5;
        if (this.travelBool) {
            this.travelCounter = 7;
        } else {
            this.travelCounter = 1;
        }
        for (let counter = 0; counter < this.travelCounter; counter++) {
            ctxOne.globalAlpha = counter / 7;
            ctxOne.beginPath();
            if (this.travelBool) {
                ctxOne.arc(0, (this.accel) * counter, this.radius, 0, this.arcProgress);
            } else {
                ctxOne.arc(0, 0, this.radius, 0, this.arcProgress);
            }
            if (this.deGlowCounter < 50) {
                ctxOne.fill();
            } else {
                ctxOne.globalAlpha = 1;
                ctxOne.stroke();
            }
            ctxOne.globalAlpha = 1;
        }
        ctxOne.restore();
        this.spawn();
        if (this.glowBool) {
            this.glow(this.glowCounter);
            this.glowCounter++;
        } else if (this.deGlowBool) {
            this.glow(this.deGlowCounter);
            this.deGlowCounter--;
        }
        if (this.deGlowCounter < 2) {
            if (this.active) {
                this.travel();
            }
        }
    }
    spawn() {
        if (this.arcProgress < Math.PI * 2) {
            this.arcProgress += 0.2;
        } else if (this.glowCounter < 50) {
            this.glowBool = true;
        } else {
            this.glowBool = false;
            this.deGlowBool = true;
        }
        if (this.deGlowCounter < 0) {
            this.deGlowBool = false;
            if (this.active) {
                this.travel();
            }
        }
    }
    transform(){
        ctxOne.fillStyle = this.clr;
        ctxOne.beginPath();
        ctxOne.arc(0, 0, this.radius, 0, this.arcProgress);
        ctxOne.fill();
        ctxOne.closePath();
    }
    glow(counter) {
        ctxOne.save();
        ctxOne.translate(this.posX, this.posY);
        if(counter == this.deGlowCounter){
            this.transform();
        }
        ctxOne.shadowBlur = 25;
        ctxOne.shadowColor = "orange";
        ctxOne.globalAlpha = (counter / 50);
        ctxOne.fillStyle = "orange";
        ctxOne.beginPath();
        ctxOne.arc(0, 0, this.radius + 5, 0, Math.PI * 2);
        ctxOne.fill();
        ctxOne.closePath();
        ctxOne.globalAlpha = 1;
        ctxOne.restore();
    }
    travel() {
        this.travelBool = true;
        if (this.distanceLeft > (CH / 14) + 30) {
            this.accel += 0.075;
            this.posY += this.accel;
            this.distanceLeft -= this.accel;
        } else {
            this.active = false;
            this.posX = squareArr[selectedCol][selectedRow].posX + (squareArr[selectedCol][selectedRow].width / 2);
            this.posY = squareArr[selectedCol][selectedRow].posY + (squareArr[selectedCol][selectedRow].height / 2);
            this.accel = 0;
            squareArr[selectedCol][selectedRow].clr = this.clr;
            squareArr[selectedCol][selectedRow].initiateSparkle();
            if(winner != undefined){
                canvasTwo.removeEventListener("click", callDetect);
            }else{
                canvasTwo.addEventListener("click", callDetect);
            }
        }
    }
}
class sparkle {
    constructor(xDirection, posX, posY) {
        this.radius = 2.5;
        this.posX = posX;
        this.posY = posY;
        this.xDirection = xDirection;
        this.accelX;
        this.accelY;
    }
    draw() {
        ctxTwo.save();
        ctxTwo.translate(this.posX, this.posY);
        ctxTwo.shadowBlur = 10;
        ctxTwo.shadowColor = "orange";
        ctxTwo.fillStyle = "rgb(255, 200, 0)";
        ctxTwo.beginPath();
        ctxTwo.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctxTwo.fill();
        ctxTwo.closePath();
        ctxTwo.restore();
        this.travel();
    }
    launch(){
        this.accelY = -(Math.random() * (5 - 1) + 1);
        this.accelX = this.xDirection * (Math.random() * (5 - 1) + 1);
    }
    travel(){
        if(this.accelX > 0){
            this.accelX -= 0.025;
        }else{
            this.accelX += 0.025;
        }
        this.accelY += 0.35;
        this.posX += this.accelX;
        this.posY += this.accelY;
    }
}