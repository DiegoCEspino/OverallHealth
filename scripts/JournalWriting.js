// Reads and dusplays the journals saved in Firestore
function readJournals(){
    document.getElementById("journals").innerHTML = ""; // Journal display area
    firebase.auth().onAuthStateChanged(user => { // Gets the user that is logged in the web app
        if (user) {
            let array = db.collection("users").doc(user.uid) // Gets the information inside the "users" document for the current user
            array.get()
                .then(userDoc => { // User document
                    var userName = userDoc.data().name; // Username
                    db.collection('Journals').get().then(snap => { // Journal collection
                        var size = snap.size; // Collection size
                        for (let i = 1; i <= size; i++){ // Loops through journals
                            db.collection("Journals").doc(i.toString()).onSnapshot(
                                journal => { // Journal pulled from ID
                                   if (journal.data().user == userName){ // If the current user wrote this journal
                                        // Adds journal entry to Journal box
                                        document.getElementById("journals").innerHTML += "<br><h3>Journal: " + journal.data().title 
                                            + "</h3>Written on " + journal.data().date.toDate() 
                                            + "<br><br>" + journal.data().entry + "<br>";
                                   } 
                                });
                        } 
                    });
            });
        }});
}

// Adds a journal document to the Journals collection
function writeJournal(){
    var title = document.getElementById("title").value; // Journal title
    var entry = document.getElementById("description").value; // Journal description
    var date = new Date(); // Date journal was written
    firebase.auth().onAuthStateChanged(user => { // Gets the user that is logged in the web app
        if (user) {
            let array = db.collection("users").doc(user.uid) // Gets the information inside the "users" document for the current user
            array.get()
                .then(userDoc => { // User document
                    var userName = userDoc.data().name; // Username
                    db.collection('Journals').get().then(snap => { // Journal collection
                        var size = snap.size; // Collection size

                        // Adds journal document to the Journals collection
                        db.collection("Journals").doc((size + 1).toString()).set({
                            user: userName, // Username
                            title: title, // Journal title
                            entry: entry, // Journal body
                            date: date // Journal date
                        });
                        readJournals(); // Displays all of user's journals (including new one)

                        // Erases content on input fields
                        document.getElementById("title").value = ""; 
                        document.getElementById("description").value = "";
                    });
            });
        }});
}

// Displays all of user's journals when page is loaded
readJournals();

// Adds event listener to go back to the previous page when clicked
document.getElementById("back").addEventListener("click", myFunction);
function myFunction() {
    location.replace("activities.html");
}