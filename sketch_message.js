let classifier;
//flash e libro
//let imageModelURL = "https://teachablemachine.withgoogle.com/models/jiKg1O8WW/";
//gesti al posto di flash e libro
let imageModelURL = "https://teachablemachine.withgoogle.com/models/n8j1UNl8f/";
let video;
let flippedVideo;
let label = "";
let img;

function preload() {
  classifier = ml5.imageClassifier(imageModelURL + "model.json");
  
}

function setup() {
  createCanvas(745, 560);
  img = loadImage('messaggio.png');
  video = createCapture(VIDEO);
  video.size(745, 560);
  video.hide();

  flippedVideo = ml5.flipImage(video);
  classifyVideo();
  image(img, 0, 0, 745, 560);  
}

function draw() {
  image(img, 0, 0, 745, 560);  
  //background(0);
  //text("2+7+/9+21514+", width / 2, height/2);
  
  // Draw the label
  fill(255);
  textSize(30);
  textAlign(CENTER);
  
  
 
  if(label == "niente") {
    fill(255)
    text("2+7+/9+21514+", width / 2, height/2);
  }
  
  if (label == "flash") {
    fill(255)
    text("so7o 9o2iti4o", width / 2, height/2);
  } 
  
  if (label == "book") {
    fill(255)
    text("so7o 9o2iti4o", width / 2, height/2);
  } 
  
  if (label == "entrambi") {
    fill(255)
    text("sono positivo", width / 2, height/2);
  } 
  
  /*
  if(label == "flash") {
    fill(255)
    text("in attesa", width / 2, height/2);
  }
  
  if(label == "book") {
    fill(0)
    rect(0,0, width, height);
    fill(255)
    text("in attesa", width / 2, height/2);
  }
  
  if(label == "locked3") {
    fill(0)
    rect(0,0, width, height);
    fill(255)
    text("in attesa", width / 2, height/2);
  }
  
  if(label == "locked4") {
    fill(0)
    rect(0,0, width, height);
    fill(255)
    text("in attesa", width / 2, height/2);
  }
  
  if(label == "locked5") {
    fill(0)
    rect(0,0, width, height);
    fill(255)
    text("in attesa", width / 2, height/2);
  }
  
  if(label == "locked6") {
    fill(0)
    rect(0,0, width, height);
    fill(255)
    text("in attesa", width / 2, height/2);
  }
  */
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


