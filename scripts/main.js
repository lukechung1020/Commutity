function insertNameFromFirestore() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            console.log(user.uid);
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get().then(userDoc => {
                var userName = userDoc.data().name;
                console.log(userName);
                // document.getElementById("name-goes-here").innerText=userName;
            })
        }
    })
}

document.getElementById("postingform").addEventListener("submit", submitPost);

// Sends post details to firestore
function submitPost(e) {
    e.preventDefault();

    // Function for returning the values in the input fields
    const getElementVal = (id) => {
        return document.getElementById(id).value;
    };

    var postTitle = getElementVal("postname");
    var postText = getElementVal("postdetails");
    var dateOfPost = new Date();
    console.log(postTitle, postText, dateOfPost);

    const res = db.collection("posts").add({
        title: postTitle,
        content: postText,
        date: dateOfPost,
    }).then(res => {
        console.log("Created post with id: ", res.id);
    }).catch(function(error) {
        console.error("Error on writing post: ", error);
    });
}
