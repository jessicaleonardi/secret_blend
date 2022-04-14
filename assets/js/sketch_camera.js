let classifier;
let imageModelURL = "https://teachablemachine.withgoogle.com/models/y4EIxN7pB/model.json";
let video;
let flippedVideo;
let label = "";

const LOCKED_LABELS = [1,2,3,4,5,6,6].map(i => `locked${i}`);

function preload() {
  classifier = ml5.imageClassifier(imageModelURL);
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

  if (LOCKED_LABELS.includes(label)) {
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
