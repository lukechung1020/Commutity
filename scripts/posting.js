// Uploading a post to firebase
function createPost() {
    console.log("inside create post")
    let Title = document.getElementById("post-title").value;
    let Text = document.getElementById("post-text").value;
    console.log(Title, Text);

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            var userID = user.uid;
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    // add items
                    var postRef = db.collection("posts").doc();
                    db.collection("posts").doc(postRef.id).set({
                        userID: userID,
                        postTitle: Title,
                        postText: Text,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(() => {
                        console.log("Sucessfully added post to firestore");
                    });
                    // add this post id to posts array in users/users.id
                    console.log("ID of post that was created:", postRef.id);
                    db.collection("users").doc(userID).update({
                        posts: firebase.firestore.FieldValue.arrayUnion(postRef.id)
                    }).then(() => {
                        console.log("Successfully added post id to users posts array");
                        // go to thanks.html page after completion
                        window.location.href = "thanks.html";
                    });
                })
        } else {
            console.log("No user is signed in");
            window.location.href = 'posting.html';
        }
    });
}