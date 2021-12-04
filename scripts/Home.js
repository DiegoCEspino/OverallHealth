//Displays a random quote
function display_Quote() {
    var randomNum = Math.floor(Math.random() * 3); // Random number
    console.log(randomNum)
    // Displays quote
    if (randomNum == 0) {
        db.collection("Quotes").doc("Inspire")
        .onSnapshot(quote => { // Quote document
            console.log("current document data: " + quote.data());  
            document.getElementById("inspire-quote").innerHTML = quote.data().Quote0; // Sets quote
        })
    // Displays quote
    } else if (randomNum == 1) {
        db.collection("Quotes").doc("Inspire")
        .onSnapshot(quote => { // Quote document
            console.log("current document data: " + quote.data());  
            document.getElementById("inspire-quote").innerHTML = quote.data().Quote1; // Sets quote 
        })
    // Displays quote
    } else {
        db.collection("Quotes").doc("Inspire")
        .onSnapshot(quote => { // Quote document
            console.log("current document data: " + quote.data());  
            document.getElementById("inspire-quote").innerHTML = quote.data().Quote2; // Sets quote
        })
    }
}
//Chooses and displays quote when page is loaded
display_Quote();
