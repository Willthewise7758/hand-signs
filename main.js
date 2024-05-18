//
Webcam.set({
    width:350,
    height:250,
    image_format : 'png',
    png_quality:150
});

camera = document.getElementById("camera");
Webcam.attach( '#camera' );

function take_snapshot(){
    Webcam.snap(function(data_uro){
        document.getElementById("result").innerHTML = '<img id="captured_imag" src="'+data_uro+'"/>';
    })
}
console.log('ml5 version', ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/bdLKGYYc3/model.json',modelLoaded);
function modelLoaded(){
    console.log("Model Loaded");
}
function speak(){
    synth=window.speechSynthesis;
    speak_data_1 = "The first prediction is"+prediction_1;
    speak_data_2="And the second prediction is"+prediction_2;
    utterThis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterThis);
}
function check()
{
    imgege=document.getElementById("captured_imag");
    classifier.classify(imgege, gotResult);
}
function gotResult(error, results){
    if(error){ console.error(error);}
    else{
        console.log(results)
            document.getElementById("result_hand_sign_name").innerHTML = results[0].label;
            document.getElementById("result_hand_sign_name2").innerHTML = results[1].label;
            prediction_1 = results[0].label;
            prediction_2 = results[1].label;
            speak();
            if(results[0].label == 'thumbs up')
                {document.getElementById("update_hand_sign").innerHTML = "👍"}
            if(results[0].label == 'pointing')
                {document.getElementById("update_hand_sign").innerHTML = "🫵"}
            if(results[0].label == 'peace')
                {document.getElementById("update_hand_sign").innerHTML = "👌"}
            if(results[1].label == 'thumbs up')
                {document.getElementById("update_hand_sign2").innerHTML = "👍"}
            if(results[1].label == 'pointing')
                {document.getElementById("update_hand_sign2").innerHTML = "🫵"}
            if(results[1].label == 'peace')
                {document.getElementById("update_hand_sign2").innerHTML = "👌"}
    }
}