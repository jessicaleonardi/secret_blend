let facemesh;
let video;
let predictions = [];
let bg = "black";
let img;

function setup() {
  createCanvas(745, 560);
  video = createCapture(VIDEO);
  video.size(width, height);
  frameRate(30);
  facemesh = ml5.facemesh(video, modelReady);

  facemesh.on("predict", (results) => {
    predictions = results;
  });

  video.hide();
  img = loadImage('ruanda.jpeg');
  image(img, 0, 0, 745, 560);
}

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  //background(bg);
  image(img, 0, 0, 745, 560);
  drawKeypoints();
  
}

function drawKeypoints() {
  let i = 0;
  if (predictions[i]) {
    //for (let i = 0; i < predictions.length; i += 1) {
    const keypoints = predictions[i].scaledMesh;

    // Draw facial keypoints.
    for (let j = 0; j < keypoints.length; j += 1) {
      const [x, y] = keypoints[j];

      //fill(0, 0, 0);
      noStroke();
      //ellipse(x, y, 2, 2);
      noFill();
      textSize(5);
      text(j, x, y);
    }
    //stroke("rgb(0,255,0)");
    line(
      keypoints[13][0],
      keypoints[13][1],
      keypoints[14][0],
      keypoints[14][1]
    );
    let distance = dist(
      keypoints[13][0],
      keypoints[13][1],
      keypoints[14][0],
      keypoints[14][1]
    );

    if (distance > 30 && distance < 40) {
      fill('rgba(100%,100%,100%,0.3)')
      rect(0, 0, 745, 560);
    }
    
     if (distance > 20 && distance < 30) {
      fill('rgba(100%,100%,100%,0.5)')
      rect(0, 0, 745, 560);
    }
    
    if (distance > 10 && distance < 20) {
      fill('rgba(100%,100%,100%,0.7)')
      rect(0, 0, 745, 560);
    }
    
    if (distance > 0 && distance < 10) {
      fill('rgba(100%,100%,100%,0.9)')
      rect(0, 0, 745, 560);
    }
  }
}


