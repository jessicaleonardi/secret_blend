let classifier;
let imageModelURL = "https://teachablemachine.withgoogle.com/models/y4EIxN7pB/";
let video;
let flippedVideo;
let label = "";

function preload() {
  classifier = ml5.imageClassifier(imageModelURL + "model.json");

}

function setup() {
  createCanvas(745, 560);

  video = createCapture(VIDEO);
  video.size(745, 560);
  video.hide();

  flippedVideo = ml5.flipImage(video);
  classifyVideo();
  
}

function draw() {
  background(0);
  // Draw the video
  image(flippedVideo, 0, 0);

  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  
  if(label == "locked1") {
    fill(0)
    rect(0,0, width, height);
    fill(0,255,0)
    text("in attesa", width / 2, height/2);
  }
  
  if(label == "locked2") {
    fill(0)
    rect(0,0, width, height);
    fill(0,255,0)
    text("in attesa", width / 2, height/2);
  }
  
  if(label == "locked3") {
    fill(0)
    rect(0,0, width, height);
    fill(0,255,0)
    text("in attesa", width / 2, height/2);
  }
  
  if(label == "locked4") {
    fill(0)
    rect(0,0, width, height);
    fill(0,255,0)
    text("in attesa", width / 2, height/2);
  }
  
  if(label == "locked5") {
    fill(0)
    rect(0,0, width, height);
    fill(0,255,0)
    text("in attesa", width / 2, height/2);
  }
  
  if(label == "locked6") {
    fill(0)
    rect(0,0, width, height);
    fill(0,255,0)
    text("in attesa", width / 2, height/2);
  }
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}


