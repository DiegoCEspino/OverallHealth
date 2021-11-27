function timer(minutes, seconds, minutesShown, secondsShown) {
    if (seconds < 10) {
        secondsShown.innerHTML = "0" + seconds;
    }
    else {
        secondsShown.innerHTML = "" + seconds;
    }
    if (minutes < 10) {
        minutesShown.innerHTML = "0" + minutes;
    }
    else {
        minutesShown.innerHTML = "" + minutes;
    }
    localStorage.setItem("seconds", seconds - 1);
    seconds = seconds - 1;
    if (seconds < 0) {
        localStorage.setItem("minutes", minutes - 1);
        localStorage.setItem("seconds", 59);
        minutes = minutes - 1;
        seconds = 59;
    }
}

function activityDetails() {
    var title = localStorage.getItem("lastActivity");
    document.getElementById("title").innerHTML = title;
    db.collection('activities').get().then(snap => {
        var size = snap.size
        for (let i = 1; i <= size; i++) {
            db.collection("activities").doc(i.toString()).onSnapshot(
                activity => {
                    if (activity.data().name == title) {
                        document.getElementById("description").innerHTML = activity.data().description;
                    }
                }
            );
        }
    });
}

activityDetails();

let minutesShown = document.getElementById("minutes");
let secondsShown = document.getElementById("seconds");
var seconds = localStorage.getItem("seconds");
var minutes = localStorage.getItem("minutes");
if (seconds == null){
    localStorage.setItem("seconds", 0);
    seconds = localStorage.getItem("seconds");
} 
else if (seconds < 10) {
    secondsShown.innerHTML = "0" + seconds;
}
else {
    secondsShown.innerHTML = "" + seconds;
}
if (minutes == null){
    localStorage.setItem("minutes", 0);
    minutes = localStorage.getItem("minutes");
} 
else if (minutes < 10) {
    minutesShown.innerHTML = "0" + minutes;
}
else {
    minutesShown.innerHTML = "" + minutes;
}

var initialTime;

const time = async () => {
    initialTime = new Date();
    document.getElementById("start").remove();
    while (localStorage.getItem("minutes") > 0 || localStorage.getItem("seconds") > 0) {
        await new Promise(r => setTimeout(r, 1000));
        timer(localStorage.getItem("minutes"), localStorage.getItem("seconds"), minutesShown, secondsShown);
    }
    await new Promise(r => setTimeout(r, 1000));
    secondsShown.innerHTML = "00";
    if (localStorage.getItem("timerSet") == "true") {
        alert("Time's up!")
        localStorage.setItem("timerSet", "false");
    }
}

window.onunload = function (event) {
    var time = Math.abs(new Date() - initialTime);
    //console.log(time);
    if (!isNaN(time)) {
        localStorage.setItem("activityTime", time);
    }
};
