// function readText(text) {
//     db.collection("posts").doc(text)
//         .onSnapshot(eachText => {
//             console.log("current document data: " + eachText.data());
//             document.getElementById("postText-goes-here").innerHTML = eachText.data().postText;
//         })
// }

// readText("jBR5cx50M34PihUqlYhp");

// function readTitle(title) {
//     db.collection("posts").doc(title)
//         .onSnapshot(eachTitle => {
//             console.log("current document data: " + eachTitle.data());
//             document.getElementById("title-goes-here").innerHTML = eachTitle.data().postTitle;
//         })
// }

// readTitle("jBR5cx50M34PihUqlYhp"); 
//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------

function displayPosts(collection) {
    let cardTemplate = document.getElementById("postsCardTemplate");

    db.collection(collection).get()   //the collection called "hikes"
        .then(allPosts => {
            //var i = 1;  //Optional: if you want to have a unique ID for each hike
            allPosts.forEach(doc => { //iterate thru each doc
                var title = doc.data().postTitle;       // get value of the "name" key
                var postText = doc.data().postText;  // get value of the "details" key
                var timeStamp = doc.data().timestamp;    //get unique ID to each hike to be used for fetching right image
                var userID = doc.data().userID; //gets the length field
                var image = doc.data().image; //gets the length field
                let newcard = cardTemplate.content.cloneNode(true);

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-text').innerHTML = postText;
                newcard.querySelector('.card-text').innerHTML = postText;
                newcard.querySelector('.card-image').src = image; //Example: NV01.jpg

                //Optional: give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery, Example: "hikes-go-here"
                document.getElementById(collection + "-go-here").appendChild(newcard);

                //i++;   //Optional: iterate variable to serve as unique ID
            })
        })
}

displayPosts("posts")  //input param is the name of the collection

