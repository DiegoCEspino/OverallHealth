function Favourite(activityName){
    let activity = activityName.childNodes[3].innerHTML
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            let array = db.collection("users").doc(user.uid)
            array.get()
                .then(userDoc => {
                    var user_fav = userDoc.data().favouriteActivities;
                    if (typeof user_fav == "undefined" || user_fav[0] == ""){
                        user_fav = [activity];
                        console.log("Added " + activity + " to favourite activities");
                    } else if (user_fav.indexOf(activity) == -1){
                        user_fav.push(activity);
                        console.log("Added " + activity + " to favourite activities");
                    } else{
                        user_fav.splice(user_fav.indexOf(activity), 1);
                        console.log("Removed " + activity + " from favourite activities");
                    }
                    console.log(user_fav);
                    checkFavourite();
                    currentUser = db.collection("users").doc(user.uid).update({
                        'favouriteActivities': user_fav
                      }).then(function(){
                        
                    })
                    .catch(function(error){
                        console.log("erros is"+ error);
                    });
                });
        } else {
            console.log("User not logged in");
        }
    });
}

function checkFavourite(){
    var activities = document.getElementsByClassName("favouriteIcon");
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            let array = db.collection("users").doc(user.uid)
            array.get()
                .then(userDoc => {
                    console.log(userDoc.data().name)
                    var user_fav = userDoc.data().favouriteActivities;
                    if (typeof user_fav != "undefined"){
                        for (let i = 0; i < activities.length; i++){
                            if (user_fav.indexOf(activities[i].childNodes[3].innerHTML) == -1){
                                activities[i].childNodes[1].src = "../images/home.PNG";
                            } else {
                                activities[i].childNodes[1].src = "../images/back.PNG";
                            }
                        }
                    }
                    console.log(user_fav);
                });
        } else {
            console.log("User not logged in");
        }
    });
}

let favourite = document.getElementsByClassName("favouriteIcon");
for (let i = 0; i < favourite.length; i++){
    favourite[i].addEventListener("click", function(){Favourite(favourite[i]);});
}

checkFavourite();