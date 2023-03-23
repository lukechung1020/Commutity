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
    let noImagecardTemplate = document.getElementById("n-postsCardTemplate");

    db.collection(collection).get()   
        .then(allPosts => {
            allPosts.forEach(doc => { 
                var title = doc.data().postTitle;
                var postText = doc.data().postText;
                var timeStamp = doc.data().timestamp; 
                var userID = doc.data().userID;
                var image = doc.data().image; 
                let newcard = cardTemplate.content.cloneNode(true);
                
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-text').innerHTML = postText;
                console.log()
                if (!(image === "" )) {
                    newcard.querySelector('.card-image').src = image;
                } else {
                    newcard.querySelector('.card-image').src = "./images/icon.jpg";
                }
                
                document.getElementById(collection + "-go-here").appendChild(newcard);
                
            })
        })
}

displayPosts("posts") 

