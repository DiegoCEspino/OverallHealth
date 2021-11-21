function Favourite(activityName){
    let activity = activityName.parentElement.childNodes[1].childNodes[0].innerHTML;
    console.log(activity);
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
                    //console.log(userDoc.data().name)
                    var user_fav = userDoc.data().favouriteActivities;
                    if (typeof user_fav != "undefined"){
                        for (let i = 0; i < activities.length; i++){
                            if (user_fav.indexOf(activities[i].parentElement.childNodes[1].childNodes[0].innerHTML) == -1){
                                activities[i].childNodes[0].innerHTML = "stars";
                            } else {
                                activities[i].childNodes[0].innerHTML = "star";
                            }
                        }
                    }
                    //console.log(user_fav);
                });
        } else {
            console.log("User not logged in");
        }
    });
}

function insertActivity(){
    var activities = document.getElementsByClassName("favouriteIcon");
    db.collection('activities').get().then(snap => {
        var size = snap.size - activities.length // will return the collection size
        //console.log(size);
        for (let i = 0; i < size; i++){
            document.body.childNodes[3].childNodes[1].innerHTML += '<div class="activityBox"><button class="favouriteIcon"><i class="material-icons md-48"></i></button><a class="activityLink" href=""><h3 class="activityTitle"></h3><img class="activityImage" src="" alt="Activity"><p class="activityDescription"></p></a></div>';
        }
        activities = document.getElementsByClassName("favouriteIcon");
        for (let i = 1; i <= activities.length; i++){
            db.collection("activities").doc(i.toString()).onSnapshot(
                activity => { 
                document.getElementsByClassName("activityTitle")[i - 1].innerHTML = activity.data().name;
                document.getElementsByClassName("activityDescription")[i - 1].innerHTML = activity.data().description;
                document.getElementsByClassName("activityLink")[i - 1].href = activity.data().href;
                document.getElementsByClassName("activityImage")[i - 1].src = "../images/" + activity.data().icon + ".PNG";
            })
        }
        let favourite = document.getElementsByClassName("favouriteIcon");
        for (let i = 0; i < favourite.length; i++){
            favourite[i].addEventListener("click", function(){Favourite(favourite[i]);});
        }
        checkFavourite();
    });
}

insertActivity()