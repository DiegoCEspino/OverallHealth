function insertName() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid)
            currentUser.get()
                .then(userDoc => {
                    var user_Name = userDoc.data().name;
                    console.log(user_Name);
                    document.getElementById("userName").innerHTML = user_Name;
                })
        } else {
            console.log("User not logged in");
        }
    });
}

function display_Quote() {
    var randomNum = Math.floor(Math.random() * 3);
    console.log(randomNum)
    if (randomNum == 0) {
        db.collection("Quotes").doc("Inspire")
        .onSnapshot(quote => { 
            console.log("current document data: " + quote.data());  
            document.getElementById("inspire-quote").innerHTML = quote.data().Quote0; 
        })
    } else if (randomNum == 1) {
        db.collection("Quotes").doc("Inspire")
        .onSnapshot(quote => { 
            console.log("current document data: " + quote.data());  
            document.getElementById("inspire-quote").innerHTML = quote.data().Quote1; 
        })
    } else {
        db.collection("Quotes").doc("Inspire")
        .onSnapshot(quote => { 
            console.log("current document data: " + quote.data());  
            document.getElementById("inspire-quote").innerHTML = quote.data().Quote2; 
        })
    }
}
display_Quote();

insertName();