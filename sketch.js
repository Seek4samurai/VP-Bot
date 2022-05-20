// initialized variables
let faceapi;
let detections = [];

let video;
let canvas;

function setup() {
  canvas = createCanvas(1080, 720); // canvas window
  canvas.id("canvas");

  // getting video
  video = createCapture(video);
  video.id("video");
  video.size(width, height);

  // marking face
  const faceOptions = {
    withLandmarks: true,
    withExpressions: true,
    withDescriptors: true,
    minConfidence: 0.5,
  };

  //Initialize the model:
  faceapi = ml5.faceApi(video, faceOptions, faceReady);
}

// on face detection
function faceReady() {
  faceapi.detect(gotFaces);
}

// Got faces:
function gotFaces(error, result) {
  if (error) {
    console.log(error);
    return;
  }

  detections = result; //Now all the data in this detections:

  clear(); //Draw transparent background;:
  drawBoxs(detections); //Draw detection box:
  drawLandmarks(detections); //// Draw all the face points:
  drawExpressions(detections, 720, 540, 14); //Draw face expression:

  faceapi.detect(gotFaces); // Call the function again at here:
}

function drawBoxs(detections) {
  if (detections.length > 0) {
    //If at least 1 face is detected:
    for (f = 0; f < detections.length; f++) {
      let { _x, _y, _width, _height } = detections[f].alignedRect._box;
      stroke(44, 169, 225);
      strokeWeight(1);
      noFill();
      rect(_x, _y, _width, _height);
    }
  }
}

function drawLandmarks(detections) {
  if (detections.length > 0) {
    //If at least 1 face is detected:
    for (f = 0; f < detections.length; f++) {
      let points = detections[f].landmarks.positions;
      for (let i = 0; i < points.length; i++) {
        stroke(47, 255, 0); // points color
        strokeWeight(5); // points weight
        point(points[i]._x, points[i]._y);
      }
    }
  }
}

function drawExpressions(detections, x, y, textYSpace) {
  if (detections.length > 0) {
    //If at least 1 face is detected:
    let { neutral, happy, angry, sad, disgusted, surprised, fearful } =
      detections[0].expressions;
    textFont("Helvetica Neue");
    textSize(24);
    noStroke();
    fill(255, 42, 0);

    text("neutral:       " + nf(neutral * 100, 2, 2) + "%", x, y);
    text("happiness: " + nf(happy * 100, 2, 2) + "%", x, y + textYSpace);
    text("anger:        " + nf(angry * 100, 2, 2) + "%", x, y + textYSpace * 2);
    text("sad:            " + nf(sad * 100, 2, 2) + "%", x, y + textYSpace * 3);
    text(
      "surprised:  " + nf(surprised * 100, 2, 2) + "%",
      x,
      y + textYSpace * 4
    );
    text(
      "fear:           " + nf(fearful * 100, 2, 2) + "%",
      x,
      y + textYSpace * 5
    );
  } else {
    //If no faces is detected:
    text("neutral: ", x, y);
    text("happiness: ", x, y + textYSpace);
    text("anger: ", x, y + textYSpace * 2);
    text("sad: ", x, y + textYSpace * 3);
    text("surprised: ", x, y + textYSpace * 4);
    text("fear: ", x, y + textYSpace * 5);
  }
}
