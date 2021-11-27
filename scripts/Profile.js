function displayHistory(){
    document.getElementById("actions").innerHTML = "";
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            let array = db.collection("users").doc(user.uid)
            array.get()
                .then(userDoc => {
                    var userName = userDoc.data().name;
                    document.getElementById("nameHere").innerHTML = userName;
                    db.collection('actions').get().then(snap => {
                        var size = snap.size;
                        for (let i = 1; i <= size; i++){
                            db.collection("actions").doc(i.toString()).onSnapshot(
                                action => {
                                   if (action.data().user == userName){
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

displayHistory();