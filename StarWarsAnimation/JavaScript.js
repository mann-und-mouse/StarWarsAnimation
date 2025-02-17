class Animationslinie
{
    constructor()
    {
        this.topLefty = yMid;
        this.bottomLeftx = xMid;
        this.bottomLefty = yMid;
        this.bottomRightx = xMid;
        this.bottomRighty = yMid;
        this.topRightx = xMid;
        this.topRighty = yMid;
        this.topLeftx = xMid;
        this.start;
    }
    AnimatePerspective(timestamp)
    {
        if (this.start == undefined)
        {
            this.start = timestamp;
        }
      
    let elapsed = timestamp - this.start;
    let shift = Math.min(speed * elapsed, netHeight);
    if (this.bottomLefty != netHeight)
    {
        this.bottomLefty = Math.min(this.bottomLefty + shift, netHeight);
        this.bottomLeftx = Math.max(this.bottomLeftx - shift, border + 182 ) ;

        this.bottomRighty = this.bottomLefty;
        this.bottomRightx = Math.min(this.bottomRightx + shift, netWidth - 182) ;

        this.topRightx = this.bottomRightx;
        this.topRighty = Math.max(this.topRighty - shift, border);


        this.topLeftx = this.bottomLeftx;
        this.topLefty = Math.max(this.topLefty - shift, border);

    
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        DrawFullPicture();
        DrawLine2(this.topRightx, this.topRighty, this.bottomRightx, this.bottomLefty);
        DrawLine2(this.topLeftx, this.topLefty, this.bottomLeftx, this.bottomLefty);
        DrawLine2(this.bottomLeftx, this.bottomLefty, this.bottomRightx, this.bottomRighty);
        requestAnimationFrame((timestamp)=> this.AnimatePerspective(timestamp));

    }
    else
        requestAnimationFrame(ThePlan);
    
    }
}
const canvas = document.getElementById("leinwand");
const ctx = canvas.getContext("2d");
const canvas2 = document.getElementById("leinwand2");
const ctx2 = canvas.getContext("2d");
ctx.strokeStyle = "#ffff00";
ctx.lineWidth = 2;
DrawBackground();
requestAnimationFrame(ThePlan);

//Variablen

let x1Start;
let x1End = 0;
let y1Start;
let y1End = 0;
let x1Destination;
let y1Destination;

let y2Start;
let x2Start;
let y2End = 0;
let x2End =0;
let x2Destination;
let y2Destination;

let winkel1;
let scalar = 1;

let step = 0;
let start;
let speed = 0.4;

const border = 10;
const netWidth = canvas.width - border;
const netHeight = canvas.height - border;
let xMid = canvas.width /2 
let yMid = canvas.height / 2;
function ThePlan(timestamp)
{
    start = timestamp;
    switch (step)
    {
        case 0:
            x1Start = 180 + border;
            y1Start = border;
            x1Destination = netWidth
            y2Destination = border;
            x2Start = netWidth - 180;
            y2Start = netHeight;
            x2Destination = border;
            y2Destination = netHeight;
            requestAnimationFrame(AnimateHorizontalLine)
            break;
        case 1:
            x1Start = x1End;
            x2Start = x2End;
            y1Destination = netHeight;
            y2Destination = border;
            requestAnimationFrame(AnimateVerticalLine)
            break;
        case 2:
            x1Start = x2Destination;
            x2Start = x1Destination;
            x2Destination = netWidth - 180;
            x1Destination = 180 + border;
            y1Start = y2Destination;
            y2Start = y1Destination;
            y1Destination = border;
            y2Destination = netHeight;
            requestAnimationFrame(AnimateHorizontalLine);
            break;
        case 3:
            x1Destination = netWidth - 180;
            x2Start = netWidth - 180;
            y2Start = border
            x2Destination = border + 180;
            y1Destination = netHeight;
            y2Destination = netHeight;
            requestAnimationFrame(AnimateDiagonalLine)
            break;
        case 4:
            y1Start = border;
            y1Destination = netHeight;
            y2Destination = border;
            y1End = 0;
            requestAnimationFrame(AnimateVerticalLine);
            break;
        case 5:
            x1Start = 65 + border;
            y1Start = border;
            x1Destination = netWidth - 65;
            y1Destination = netHeight;
            x2Start = netWidth - 65;
            x2Destination = 65 + border;
            scalar = Math.tan((31.7 * Math.PI) / 180);
            requestAnimationFrame(AnimateDiagonalLine);
            break;
        case 6:
            x1Start = 65 + border;
            x1Destination = x1Start;
            x2Start = netWidth - 65;
            x2Destination = x2Start;
            y1Start = border;
            y1Destination = netHeight;
            y2Start = y1Destination;
            y2Destination = y1Start;
            y1End = 0;
            requestAnimationFrame(AnimateVerticalLine);
            break;
        case 7:
            x1Start = border;
            x1Destination = netWidth;
            x2Destination = border;
            x2Start = netWidth;
            scalar = Math.tan(9.8* Math.PI / 180);
            y1Start = 122 + border;
            y1Destination = yMid + 63;
            requestAnimationFrame(AnimateDiagonalLine);
            break;
        case 8:
            //y1Start = yMid;
            //y1Destination = netHeight;
            //scalar = 1;
            //x1Start = xMid;
            //x1End = xMid;
            //speed = 0.02;
            //let test = "wht";
            //AnimatePerspective(timestamp)
            ////requestAnimationFrame(AnimatePerspective);
            speed = 0.005;
            let line1 = new Animationslinie();
            line1.AnimatePerspective(timestamp);
            let line2 = new Animationslinie();
            //requestAnimationFrame((timestamp) => line1.AnimatePerspective(timestamp));
            line2.AnimatePerspective(timestamp);
            //Sleep(100).then(line2.AnimatePerspective(timestamp));
            break;
        //case 8:
        //    DrawFullPicture();
    }
    if(step < 8)
        step++;
}
function Sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}
function AnimateDiagonalLine(timestamp)
{
    let elapsed = timestamp - start;
    let shiftx = Math.min(speed * elapsed, x1Destination);
    let shifty = Math.min(speed * elapsed *  scalar , y1Destination);
    if (x1End != x1Destination)
    {
        x1End = Math.min(x1Start + shiftx, x1Destination);
        x2End = Math.max(x2Start - shiftx, x2Destination);
        y1End = Math.min(y1Start + shifty, y1Destination);
        y2End = Math.max(y2Start - shifty, y2Destination);
        DrawLine(x1Start, y1Start, x1End, y1End);
        DrawLine(x2Start, y1Start, x2End, y1End);
        x1Start = x1End;
        x2Start = x2End;
        y1Start = y1End;
        y2Start = y2End;

        requestAnimationFrame(AnimateDiagonalLine)
    }
    else
        requestAnimationFrame(ThePlan);
   }
function AnimateVerticalLine(timestamp)
{
    let elapsed = timestamp - start;
    let shift = Math.min(speed * elapsed, y1Destination);

    if (y1End != y1Destination)
    {
        y1End = Math.min(y1Start + shift, y1Destination);
        y2End = Math.max(y2Start - shift, y2Destination);
        DrawLine(x1Start, y1Start, x1Destination, y1End);
        DrawLine(x2Start, y2Start, x2Destination, y2End);
        y1Start = y1End - 1;
        y2Start = y2End + 1;
        requestAnimationFrame(AnimateVerticalLine);
    }
    else
        requestAnimationFrame(ThePlan);
}
function AnimateHorizontalLine(timestamp)
{
    let elapsed = timestamp - start;
    let shift = Math.min(speed * elapsed, x1Destination);

    y1End = border;
    y2End = netHeight;

    if (x1End != x1Destination)
    {
        x1End = Math.min(x1Start + shift, x1Destination);
        x2End = Math.max(x2Start - shift, x2Destination);
        DrawLine(x1Start, y1Start, x1End, y1End);
        DrawLine(x2Start, y2Start, x2End, y2End);
        x1Start = x1End - 1;
        x2Start = x2End + 1;
        requestAnimationFrame(AnimateHorizontalLine);
    }
    else
        requestAnimationFrame(ThePlan);
}
function DrawLine(xS, yS, xE, yE)
{
    ctx.beginPath();
    ctx.moveTo(xS, yS);
    ctx.lineTo(xE, yE);
    ctx.stroke();
}
function DrawLine2(xS, yS, xE, yE)
{
    ctx.beginPath();
    ctx.moveTo(xS, yS);
    ctx.lineTo(xE, yE);
    ctx.stroke();
}

function DrawBackground()
{
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function DrawFullPicture()
{
    DrawBackground();
    ctx.beginPath();
    ctx.moveTo(border, border);
    ctx.lineTo(canvas.width - border, border);
    ctx.lineTo(canvas.width - border, netHeight);
    ctx.lineTo(border, netHeight);
    ctx.lineTo(border, border);
    ctx.stroke();

    //1. Vertikale
    const verticalDistance1 = 299;
    DrawLine(xMid - verticalDistance1, border, xMid - verticalDistance1, netHeight);
    DrawLine(xMid + verticalDistance1, border, xMid + verticalDistance1, netHeight);

    //2. Vertikale
    const verticalDistance2 = 184;
    DrawLine(xMid - verticalDistance2, border, xMid - verticalDistance2, netHeight);
    DrawLine(xMid + verticalDistance2, border, xMid + verticalDistance2, netHeight);

   
    //1. Diagonale
    DrawLine(xMid - verticalDistance2, netHeight, xMid + verticalDistance2, border);
    DrawLine(xMid - verticalDistance2, border, xMid + verticalDistance2, netHeight);

    //2. Diagonale
    DrawLine(xMid - verticalDistance1, netHeight, xMid + verticalDistance1, border);
    DrawLine(xMid - verticalDistance1, border, xMid + verticalDistance1, netHeight);

    //3. Diagonale
    const horizontalDistance1 = 63;
    DrawLine(border, yMid - horizontalDistance1, canvas.width - border, yMid + horizontalDistance1);
    DrawLine(border, yMid + horizontalDistance1, canvas.width - border, yMid - horizontalDistance1);
}