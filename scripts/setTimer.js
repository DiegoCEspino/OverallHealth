function changeTimer(){
    formatTime(document.getElementById("minutes").value, document.getElementById("seconds").value);
}

function formatTime(minutes, seconds){
    if(seconds < 10){
        seconds = "0" + seconds;
    }
    let timer = minutes + " : "+ seconds;
    console.log(timer);
    return timer;
}

document.getElementById("button").addEventListener("click", changeTimer);