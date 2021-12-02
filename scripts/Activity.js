// Does the timer countdown and displays it on the page accordingly
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

// Reads the title and description of the activity that was selected and displays it on the page
function activityDetails() {
    // Activity title saved when the user clicked the activity box
    var title = localStorage.getItem("lastActivity");
    // Sets the title
    document.getElementById("title").innerHTML = title;
    db.collection('activities').get().then(snap => { // Activities collection
        var size = snap.size // Collection size
        for (let i = 1; i <= size; i++) { // Loops through the activities
            db.collection("activities").doc(i.toString()).onSnapshot(
                activity => { // Activity pulled from ID
                    if (activity.data().name == title) { // Finds the wanted activity document
                        document.getElementById("description").innerHTML = activity.data().description; // Sets the activity description
                    }
                }
            );
        }
    });
}

// Displays the activity details when loading the page
activityDetails();

// Sets the values for the timer when loading the page
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

// Runs the timer
const time = async () => {
    initialTime = new Date();
    document.getElementById("start").remove();
    while (localStorage.getItem("minutes") > 0 || localStorage.getItem("seconds") > 0) {
        await new Promise(r => setTimeout(r, 1000)); // Waits a second
        // Displays the new time
        timer(localStorage.getItem("minutes"), localStorage.getItem("seconds"), minutesShown, secondsShown);
    }
    await new Promise(r => setTimeout(r, 1000)); // Waits a second
    secondsShown.innerHTML = "00"; // Sets the timer back to 00:00
    // If the times reaches 00:00 and the timer was set by the user it send a notification / alarm
    if (localStorage.getItem("timerSet") == "true") {
        alert("Time's up!")
        // Unsets the timer
        localStorage.setItem("timerSet", "false");
    }
}

// The page saves the time spent on the activity when the page closes
window.onunload = function (event) {
    var time = Math.abs(new Date() - initialTime); // Now - moment when the activity was started (Time that passed)
    //console.log(time);
    if (!isNaN(time)) { // If the timer started
        // Saving the time to localStorage
        localStorage.setItem("activityTime", time);
    }
};

// Adds an event listener to the timer for it to be modifiable
document.getElementById("timer").addEventListener("click", myFunction);
function myFunction() {
    // redirects to new page
    location.replace("setTimer.html");
}