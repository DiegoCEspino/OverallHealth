function readJournals(){
    document.getElementById("journals").innerHTML = "";
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            let array = db.collection("users").doc(user.uid)
            array.get()
                .then(userDoc => {
                    var userName = userDoc.data().name;
                    db.collection('Journals').get().then(snap => {
                        var size = snap.size;
                        for (let i = 1; i <= size; i++){
                            db.collection("Journals").doc(i.toString()).onSnapshot(
                                journal => {
                                   if (journal.data().user == userName){
                                        document.getElementById("journals").innerHTML += "<br><h3>Journal: " + journal.data().title 
                                            + "</h3>Written on " + journal.data().date.toDate() 
                                            + "<br><br>" + journal.data().entry;
                                   } 
                                });
                        } 
                    });
            });
        }});
}

function writeJournal(){
    var title = document.getElementById("title").value;
    var entry = document.getElementById("description").value;
    var date = new Date();
    console.log(date);
}

readJournals();