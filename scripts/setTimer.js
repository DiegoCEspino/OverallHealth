// Formats user's input in timer to be displayed and marks timer as set
function changeTimer(){
    formatTime(document.getElementById("minutes").value, document.getElementById("seconds").value);
    localStorage.setItem("timerSet", "true");
}

// Formats user's input in timer
function formatTime(minutes, seconds){
    if(minutes == ""){
        minutes = 0;
    }
    if(seconds == ""){
        seconds = 0;
    }
    localStorage.setItem("minutes", minutes); // Sets minutes for timer
    localStorage.setItem("seconds", seconds); // Sets seconds for timer
    if(seconds < 10){
        seconds = "0" + seconds;
    }
    if(minutes < 10){
        minutes = "0" + minutes;
    }
    let timer = minutes + " : "+ seconds;
    console.log(timer);
    return timer;
}

// Adds event listener to button to set timer values when clicked
document.getElementById("button").addEventListener("click", changeTimer);

// Adds event listener to go back to the previous page when clicked
document.getElementById("back").addEventListener("click", myFunction);
function myFunction() {
    location.replace("Activity.html");
}