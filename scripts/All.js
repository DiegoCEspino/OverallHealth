// Adds the activity details to the actions collection when closing the activity page
// This script is on all activities that are reachable from the activities page
function postTime(){
    firebase.auth().onAuthStateChanged(user => { // Gets the user that is logged in the web app
        if (user) {
            let array = db.collection("users").doc(user.uid) // Gets the information inside the "users" document for the current user
            array.get()
                .then(userDoc => { // User document
                    var userName = userDoc.data().name; // Username
                    db.collection('actions').get().then(snap => { // Actions collection
                        var size = snap.size; // Collection size

                        // Adds new action doxument to actions collection
                        db.collection("actions").doc((size + 1).toString()).set({
                            user: userName, // Username
                            time: localStorage.getItem("activityTime"), // Time spent on the activity
                            activity: localStorage.getItem("lastActivity"), // Activity name
                            date: new Date() // Date that the record was posted
                        });
                    });
                });
        } 
    });
}

// If the last time has not been recorded yet it is recorded.
// The way this is by comparing the last time with the last time recorded if they are different it means that the last time
// has not been recorded yet.
// This logic is not perfect, but it is unlikely to fail. For it to fail it would be required for two consecutive activites performed
// a single user to be exactly the same time to the milisecond
if (localStorage.getItem("lastActivityTime") != localStorage.getItem("activityTime")){ 
    postTime();
    localStorage.setItem("lastActivityTime", localStorage.getItem("activityTime"));
}