// Displays username and all timed activities' details the user has finished
function displayHistory(){
    // Empty box where activities are going to be displayed
    document.getElementById("actions").innerHTML = "";
    firebase.auth().onAuthStateChanged(user => { // Gets the user that is logged in the web app
        if (user) {
            let array = db.collection("users").doc(user.uid) // Gets the information inside the "users" document for the current user
            array.get()
                .then(userDoc => { // User document
                    var userName = userDoc.data().name; // Username
                    document.getElementById("nameHere").innerHTML = userName; // Display username
                    db.collection('actions').get().then(snap => { // Actions collection
                        var size = snap.size; // Collection size
                        for (let i = 1; i <= size; i++){ // Loops through every action
                            db.collection("actions").doc(i.toString()).onSnapshot(
                                action => { // Action document
                                   if (action.data().user == userName){ // If current user performed this action
                                        // Adds action to the box to be displayed
                                        document.getElementById("actions").innerHTML += "<br><h4>Activity: " + action.data().activity 
                                            + "</h4>Done on " + action.data().date.toDate() 
                                            + " for " + action.data().time/60000 + " minutes<br><br>";
                                   } 
                                });
                        } 
                    });
            });
        }});
}

// Displays username and finished timed activities' details
displayHistory();