function postTime(){
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            let array = db.collection("users").doc(user.uid)
            array.get()
                .then(userDoc => {
                    var userName = userDoc.data().name;
                    db.collection('actions').get().then(snap => {
                        var size = snap.size;
                        db.collection("actions").doc((size + 1).toString()).set({
                            user: userName,
                            time: localStorage.getItem("activityTime"),
                            activity: localStorage.getItem("lastActivity"),
                            date: new Date()
                        });
                    });
                });
        } 
    });
}

if (localStorage.getItem("lastActivityTime") != localStorage.getItem("activityTime")){ 
    postTime();
    localStorage.setItem("lastActivityTime", localStorage.getItem("activityTime"));
}