// This function allows users to add / remove activities from their favourite activities array in Firestore and in the web app
function Favourite(activityName){
    let activity = activityName.parentElement.childNodes[1].childNodes[0].innerHTML;
    console.log(activity);
    firebase.auth().onAuthStateChanged(user => { // Gets the user that is logged in the web app
        if (user) {
            let array = db.collection("users").doc(user.uid) // Gets the information inside the "users" document for the current user
            array.get()
                .then(userDoc => { // User document
                    var user_fav = userDoc.data().favouriteActivities; // Array equal to Favourite Activities Array in Firestore

                    // If the user doesn't have a favourite activities array or it is empty
                    // an array with a single element will be created
                    if (typeof user_fav == "undefined" || user_fav[0] == ""){ 
                        user_fav = [activity];
                        console.log("Added " + activity + " to favourite activities");
                    
                    // If the activity isn't already in the favourite activities array it will be added to it
                    } else if (user_fav.indexOf(activity) == -1){
                        user_fav.push(activity);
                        console.log("Added " + activity + " to favourite activities");

                    // If the activity already exists in the favourite activities array it will be removed from it
                    } else{
                        user_fav.splice(user_fav.indexOf(activity), 1);
                        console.log("Removed " + activity + " from favourite activities");
                    }
                    console.log(user_fav);

                    // Updates the star icons located on top of each activity displayed
                    checkFavourite();

                    // Updates the array in Firestore to the array we just created
                    currentUser = db.collection("users").doc(user.uid).update({
                        'favouriteActivities': user_fav
                      });
                });
        } else {
            console.log("User not logged in");
        }
    });
}

// Updates the favourite icon displayed at the top of each activity 
// depending on if the activities are part of the user's favourite activities array or not
function checkFavourite(){
    var activities = (document.getElementsByClassName("favouriteIcon"));  
    firebase.auth().onAuthStateChanged(user => { // Gets the user that is logged in the web app
        if (user) {
            let array = db.collection("users").doc(user.uid) // Gets the information inside the "users" document for the current user
            array.get()
                .then(userDoc => { // User's document
                    var user_fav = userDoc.data().favouriteActivities; // Array equal to Favourite Activities Array in Firestore
                    if (typeof user_fav != "undefined"){ // If the array exists
                        for (let i = 0; i < activities.length; i++){ // Loop through all the activities

                            // If the activity is not a favourite activity display the not favourite icon
                            if (user_fav.indexOf(activities[i].parentElement.childNodes[1].childNodes[0].innerHTML) == -1){
                                activities[i].childNodes[0].innerHTML = "stars";

                            // If the activity is a favourite activity display the favourite icon
                            } else {
                                activities[i].childNodes[0].innerHTML = "star";
                            }
                        }
                    }
                    //console.log(user_fav);

                    // Add an event listener to all the favourite or not favourite icons for them to execute the Favourite function if clicked
                    for (let i = 0; i < activities.length; i++){
                        activities[i].addEventListener("click", function(){Favourite(activities[i]);});
                    }
                });
        } else {
            console.log("User not logged in");
        }
    });
}

// Creates a box template with the activity's details for all the activities stored in Firestore
function insertActivity(type = null){
    db.collection('activities').get().then(snap => { // Activities collection
        var size = snap.size // Size of the collection
        for (let i = 1; i <= size; i++){ // Loops through all the activities
            db.collection("activities").doc(i.toString()).onSnapshot(
                activity => { // Gets the document for a single activity

                // 1.- type == null: If there aren't any filters being applied to the activities' display
                // 2.- activity.data().icon == "meditate" && type == "mental": If the activity is focused 
                // on mental health and the mental health filter is activated
                // 3.- activity.data().icon == "strength" && type == "physical": If the activity is focused 
                // on physical health and the physical health filter is activated
                if ((type == null) || (activity.data().icon == "meditate" && type == "mental") || (activity.data().icon == "strength" && type == "physical")){
                    // Adds activity boxes with the details pulled from Firestore
                    document.getElementById("activitiesBox").innerHTML += '<div class="activityBox"><button class="favouriteIcon"><i class="material-icons md-48">star</i></button><a class="activityLink" href="' 
                    + activity.data().href + '"><h3 class="activityTitle">' + activity.data().name 
                    + '</h3><img class="activityImage" src="../images/' + activity.data().icon + '.PNG" alt="Activity"><p class="activityDescription">' 
                    + activity.data().description + '</p></a></div>';

                    // Adds event listeners for the details of the activity box that is clicked to be saved to be used on the Activity page users will
                    // be redirected to
                    if (i == size){
                        var links = document.getElementsByClassName("activityLink");
                        for (let j = 0; j < links.length; j++){
                            links[j].addEventListener("click", function(){localStorage.setItem("lastActivity", links[j].childNodes[0].innerHTML);})
                        }
                    }

                    //Tests
                    //console.log(document.body.childNodes[5].childNodes[1].childNodes);
                    //document.getElementsByClassName("activityTitle")[i - 1].innerHTML = activity.data().name;
                    //document.getElementsByClassName("activityDescription")[i - 1].innerHTML = activity.data().description;
                    //document.getElementsByClassName("activityLink")[i - 1].href = activity.data().href;
                    //document.getElementsByClassName("activityImage")[i - 1].src = "../images/" + activity.data().icon + ".PNG";                    
                }
            })
        }
        // Makes sure the favourite and not favourite icons are being displayed properly for all activities, everytime their display changes
        checkFavourite();
    });
}

// Filters and displays the user's favourite activities
function insertFavouritesOnly(){
    firebase.auth().onAuthStateChanged(user => { // Gets the user that is logged in the web app
        if (user) {
            let array = db.collection("users").doc(user.uid) // Gets the information inside the "users" document for the current user
            array.get()
                .then(userDoc => { // User's document 
                    var user_fav = userDoc.data().favouriteActivities; // Array equal to Favourite Activities Array in Firestore
                    if (typeof user_fav != "undefined"){ // If the user has a favourite activities array
                        db.collection('activities').get().then(snap => { // Activities collection
                            var size = snap.size; // Collection size
                            for (let i = 1; i <= size; i++){ // Loops through all the activities
                                db.collection("activities").doc(i.toString()).onSnapshot(
                                    activity => { // Activity pulled through ID
                                        if (user_fav.indexOf(activity.data().name) != -1){ // If the activity is in the favourite activities array
                                            // Adds activity boxes with the details pulled from Firestore
                                            document.getElementById("activitiesBox").innerHTML += '<div class="activityBox"><button class="favouriteIcon"><i class="material-icons md-48"></i></button><a class="activityLink" href="' 
                                            + activity.data().href + '"><h3 class="activityTitle">' + activity.data().name 
                                            + '</h3><img class="activityImage" src="../images/' + activity.data().icon + '.PNG" alt="Activity"><p class="activityDescription">' 
                                            + activity.data().description + '</p></a></div>';
                                        }
                                        // When all the activities are displayed make sure that their favourite icons are displayed properly
                                        if (i == size){
                                            console.log(document.getElementsByClassName("favouriteIcon"));  
                                            checkFavourite();
                                        }
                                    })
                            } 
                        });
                    }
                    //console.log(user_fav);
                });
        } else {
            console.log("User not logged in");
        }
    });
}

// Receives the type of filter that is being requested to apply and executes the corresponding function with the corresponding parameters
function filter(type){
    // Removes all the activity boxes from the page
    while(document.getElementsByClassName("activityBox").length > 0){
        document.querySelector(".activityBox").remove();
    }
    // If the filter button pressed is remove filters, all activities are displayed
    if(type == "none"){
        insertActivity();
    // If there is a filter request and it is not the favourite activities filter
    } else if(type != "favourite"){
        insertActivity(type);
    // If the filer requested is the favourite activities filter
    } else{
        insertFavouritesOnly();
    }
}

// Adds event listeners to all the filter buttons with their corresponding function and parameters
document.getElementById("favouriteFilter").addEventListener("click", function(){filter("favourite");});
document.getElementById("physicalFilter").addEventListener("click", function(){filter("physical");});
document.getElementById("mentalFilter").addEventListener("click", function(){filter("mental");});
document.getElementById("noFilter").addEventListener("click", function(){filter("none");});

// Displays all activities when the page is refreshed
insertActivity();