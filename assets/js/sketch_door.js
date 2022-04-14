let classifier;
let imageModelURL = "https://teachablemachine.withgoogle.com/models/-K9vddBJh/model.json";
let video;
let flippedVideo;
let label = "";
let speech;
let output = "no text";

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
  
  speechRec = new p5.SpeechRec("it-IT", gotSpeech);
  let continuous = true;
  let interimResults = true;
  speechRec.start(continuous, interimResults);

  function gotSpeech() {
    console.log(speechRec);
    if (speechRec.resultValue) {
      output = speechRec.resultString;
    }
  }

  setInterval(function () {
    output = "";
  }, 20000);
  
}

function draw() {
  background(0);
  // Draw the video
  image(flippedVideo, 0, 0);

  // Draw the label
  fill(255);
  textSize(30);
  textAlign(CENTER);

  switch (label) {
    case "divisa":
      fill('rgba(0%,255%,0%,0.5)');
      rect(0, 0, 745, 560);
      fill(0);
      text("Porta sbloccata, accesso consentito", width / 2, height/2);
      break;
    default: /* borghese | borghese2 */
      fill('rgba(0%,0%,0%,0.5)')
      rect(0, 0, 745, 560);
      fill(0,255,0)
      text("Tentativo fallito", width / 2, height/2);
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
