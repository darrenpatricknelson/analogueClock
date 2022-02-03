// JS for the analogue clock 

let canvas = document.getElementById("canvas");
let content = canvas.getContext("2d");
let radius = canvas.height / 2;
content.translate(radius, radius);
radius = radius * 0.9;
setInterval(drawClock, 1000);

function drawClock() {
    drawFace(content, radius);
    drawNumbers(content, radius);
    drawTime(content, radius);
}
function drawFace(content, radius) {
    let grad;

    content.beginPath();
    content.arc(0, 0, radius, 0, 2 * Math.PI);
    content.fillStyle = "white";
    content.fill();

    grad = content.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, "#333");
    grad.addColorStop(0.5, "white");
    grad.addColorStop(1, "#333");

    content.strokeStyle = grad;
    content.lineWidth = radius * 0.1;
    content.stroke();
    content.beginPath();
    content.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    content.fillStyle = "#333";
    content.fill();
}

function drawNumbers(content, radius) {
    let ang;
    let num;

    content.font = radius * 0.15 + "px ariel";
    content.textBaseline = "middle";
    content.textAlign = "center";

    for (num = 1; num < 13; num++) {
        ang = (num * Math.PI) / 6;
        content.rotate(ang);
        content.translate(0, -radius * 0.85);
        content.rotate(-ang);
        content.fillText(num.toString(), 0, 0);
        content.rotate(ang);
        content.translate(0, radius * 0.85);
        content.rotate(-ang);
    }
}

function drawTime(content, radius) {
    let now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    hour = hour % 12;
    hour =
        (hour * Math.PI) / 6 +
        (minute * Math.PI) / (6 * 60) +
        (second * Math.PI) / (360 * 60);
    drawHand(content, hour, radius * 0.5, radius * 0.07);

    minute = minute * (Math.PI / 30) + (second * Math.PI) / (30 * 60);
    drawHand(content, minute, radius * 0.8, radius * 0.07);

    second = second * (Math.PI / 30);
    drawHand(content, second, radius * 0.9, radius * 0.02);
}

function drawHand(content, pos, length, width) {
    content.beginPath();
    content.lineWidth = width;
    content.lineCap = "round";
    content.moveTo(0, 0);
    content.rotate(pos);
    content.lineTo(0, -length);
    content.stroke();
    content.rotate(-pos);
}


