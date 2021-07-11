score = "";
song1 = "";
song2 = "";
leftwristX = 0;
leftwristY = 0;
rightwristX = 0;
rightwristY = 0;

function preload() {
    song1 = loadSound("song1.mp3");
    song2 = loadSound("song2.mp3");
}

function draw() {
    image(video, 0, 0, 600, 500);
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();
    fill("#ff5757");
    stroke("#000000");
    if (scorerightwrist > 0.2) {
        circle(rightwristX, rightwristY, 20);
        song2.stop();
        if (song1_status == false) {
            song1.play();
            document.getElementById("speed").innerHTML = "song1";
        }
    }
    if (scoreleftwrist > 0.2) {
        circle(leftwristX, leftwristY, 20);
        song1.stop();
        if (song2_status == false) {
            song2.play();
            document.getElementById("volume").innerHTML = "song2";
        }
    }
}

function setup() {
    Canvas = createCanvas(600, 500);
    Canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelloaded);
    posenet.on('pose', got_poses);
}

function play() {
    song.play();
}

function stop() {
    song.stop();
}

function modelloaded() {
    console.log("posenet is initialized");
}

function got_poses(results) {
    if (results.length > 0) {
        console.log(results);
        leftwristX = results[0].pose.leftWrist.x;
        leftwristY = results[0].pose.leftWrist.y;
        console.log("leftwristX =" + leftwristX + " leftwristY =" + leftwristY);
        rightwristX = results[0].pose.rightWrist.x;
        rightwristY = results[0].pose.rightWrist.y;
        console.log("rightwristX =" + rightwristX + " rightwristY =" + rightwristY);
        scoreleftwrist = results[0].pose.keypoints[9];
        scorerightwrist = results[0].pose.keypoints[10];
    }
}