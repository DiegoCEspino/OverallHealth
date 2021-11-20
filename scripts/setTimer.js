function changeTimer(){
    formatTime(document.getElementById("minutes").value, document.getElementById("seconds").value);
    localStorage.setItem("timerSet", "true");
}

function formatTime(minutes, seconds){
    if(minutes == ""){
        minutes = 0;
    }
    if(seconds == ""){
        seconds = 0;
    }
    localStorage.setItem("minutes", minutes);
    localStorage.setItem("seconds", seconds);
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

document.getElementById("button").addEventListener("click", changeTimer);