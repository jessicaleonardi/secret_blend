let classifier;
//flash e libro
//let imageModelURL = "https://teachablemachine.withgoogle.com/models/jiKg1O8WW/model.json";
//gesti al posto di flash e libro
let imageModelURL = "https://teachablemachine.withgoogle.com/models/n8j1UNl8f/model.json";
let video;
let flippedVideo;
let label = "";
let img;

function preload() {
  classifier = ml5.imageClassifier(imageModelURL);
}

function setup() {
  createCanvas(745, 560);
  img = loadImage('/assets/img/messaggio.png');
  video = createCapture(VIDEO);
  video.size(745, 560);
  video.hide();

  flippedVideo = ml5.flipImage(video);
  classifyVideo();
  image(img, 0, 0, 745, 560);  
}

function draw() {
  image(img, 0, 0, 745, 560);
  
  // Draw the label
  fill(255);
  textSize(30);
  textAlign(CENTER);
  
  fill(255);
  switch (label) {
    case "niente":
      text("2+7+/9+21514+", width / 2, height/2);
      break;
    case "flash":
    case "book":
      text("so7o 9o2iti4o", width / 2, height/2);
      break;
    case "entrambi":
      text("sono positivo", width / 2, height/2);
      break;
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
