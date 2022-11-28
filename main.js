
Webcam.set({
    width:350,
    height:300,
    image_format:"jpg",
    jpg_quality:90
});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function capture(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="selfie_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5version',ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/jwKKRlB1p/model.json',modelLoaded);

function modelLoaded(){
    console.log('modelLoaded !')
}

function identify(){
    img = document.getElementById("selfie_image");
    classifier.classify(img, gotResult);
}
function gotResult(error,results){
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_object").innerHTML = results[0].label;
        document.getElementById("result_confidence").innerHTML = results[0].confidence.toFixed(3)*100+" %";
var synth = window.speechSynthesis;
speak_data = "it is"+results[0].label;
var utterThis = new SpeechSynthesisUtterance(speak_data);
synth.speak(utterThis);

    }
}
