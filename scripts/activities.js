function timer(minutes, seconds, minutesShown, secondsShown){
    console.log("Hello");
    if(seconds < 10){
        secondsShown.innerHTML = "0" + seconds;
    }
    else{
        secondsShown.innerHTML = "" + seconds;
    }
    if(minutes < 10){
        minutesShown.innerHTML = "0" + minutes;
    }
    else{
        minutesShown.innerHTML = "" + minutes;
    }
    localStorage.setItem("seconds", seconds - 1);
    seconds = seconds - 1;
    if(seconds < 0){
        localStorage.setItem("minutes", minutes - 1);
        localStorage.setItem("seconds", 59);
        minutes = minutes -1;
        seconds = 59;
    }
}

let minutesShown = document.getElementById("minutes");
let secondsShown = document.getElementById("seconds");

const time = async () => {
    while(localStorage.getItem("minutes") > 0 || localStorage.getItem("seconds") > 0){
        await new Promise(r => setTimeout(r, 1000));
        timer(localStorage.getItem("minutes"), localStorage.getItem("seconds"), minutesShown, secondsShown);
    }  
    await new Promise(r => setTimeout(r, 1000));
    secondsShown.innerHTML = "00";
}
time();