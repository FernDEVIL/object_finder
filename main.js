video = "";
statuss = "";
object_name = "";
objects = [];

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380)
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_name = document.getElementById("input").value;
}

function modelLoaded() {
    console.log("Model Loaded!");
    statuss = true;
}

function draw() {
    image(video, 0, 0, 380, 380);
    if (statuss != "") {
        for (i = 0; i < objects.length; i++) {
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (objects[i].label == object_name) {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("status").innerHTML = "Status : Object found";

                var synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(object_name + " found");
                synth.speak(utterThis);
            } else {
                document.getElementById("status").innerHTML = object_name + " not found";
            }
        }
    }
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}