let cvs = document.querySelector('#canvas');
let ctx = cvs.getContext("2d");

let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();

bird.src = "images/flappy_bird_bird.png";
bg.src = "images/flappy_bird_bg.png";
fg.src = "images/flappy_bird_fg.png";
pipeUp.src = "images/flappy_bird_pipeUp.png";
pipeBottom.src = "images/flappy_bird_pipeBottom.png";

// audio

let fly = new Audio();
let score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

let gap = 90;

// Click btn

document.addEventListener('keydown', moveUp);
document.addEventListener('keydown', moveDown);

function moveUp(event){
   if (event.keyCode === 38){
      yPos -= 25;
      fly.play();
   }
}

function moveDown(event) {
   if (event.keyCode === 40){
      yPos += 15;
   }
}

// Blocks

let pipe = [];
pipe[0] = {
   x: cvs.width,
   y: 0
}

// Bird

let xPos = 10;
let yPos = 150;
let grav = 1.5;
let score = 0;

function draw(){
   ctx.drawImage(bg, 0, 0);

   for (let i = 0; i < pipe.length; i++){
      ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
      ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
      pipe[i].x--;

      if (pipe[i].x === 125){
         pipe.push({
            x: cvs.width,
            y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
         });
      }

      if(xPos + bird.width >= pipe[i].x && xPos <= pipe[i].x + pipeUp.width && (yPos <= pipe[i].y + pipeUp.height || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height){
         location.reload();
      }

      if (pipe[i].x === 5){
         score++;
         score_audio.play();
      }

   }

   ctx.drawImage(fg, 0, cvs.height - fg.height);
   ctx.drawImage(bird, xPos, yPos);

   yPos += grav;

   ctx.fillStyle = "#000";
   ctx.font = "24px Verdana";
   ctx.fillText("Счёт: " + score, 10, cvs.height - 20);

   requestAnimationFrame(draw);
}

pipeBottom.onload = draw;