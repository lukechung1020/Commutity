// Uploading a post to firebase
function createPost() {
    console.log("inside create post")
    let Title = document.getElementById("post-title").value.trim();
    let Text = document.getElementById("post-text").value.trim();

    // Validation that both Post title and Text content is not empty or whitespace
    // Displays to the user, what input is not filled out correctly in the form of an alert
    if (!Title || !Text) {
        if (!Title && Text) {
            alert("Please fill in a Post Title.");
            return;
        } else if (Title && !Text) {
            alert("Please fill in the Text Content.");
            return;
        }
        alert("Please fill in Post Title AND Text Content.");
        return;

    }

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
                        image: "",
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(() => {
                        console.log("Sucessfully added post to firestore");
                        db.collection("users").doc(userID).update({
                            posts: firebase.firestore.FieldValue.arrayUnion(postRef.id)
                        }).then(() => {
                            console.log("Successfully added post id to users posts array");
                        })

                        // Upload photo
                        uploadPic(postRef.id);
                    })
                })
        } else {
            console.log("No user is signed in");
            window.location.href = 'index.html';
        }
    });
}


var ImageFile;
var fileInput = document.getElementById("post-img");
var image = document.getElementById("preview-img");

// Shows preview image of chosen file
function listenFileSelect() {
    fileInput.addEventListener('change', function (e) {
        ImageFile = e.target.files[0];
        var blob = URL.createObjectURL(ImageFile);
        image.src = blob;
        cancelBtn.removeAttribute("hidden");
    })
}
listenFileSelect();

// Reference Cancel Button
var cancelBtn = document.getElementById("remove-img");

// When cancel button is clicked, set values to empty string
function removeFileSelect() {
    fileInput.value = "";
    image.src = "";
    cancelBtn.setAttribute("hidden", "hidden");
}

// Uploading photo to firebase storage
function uploadPic(postDocID) {
    console.log("inside uploadPic " + postDocID);
    console.log(fileInput.value);

    // Return if there is no fileInput and change window to thanks.html
    if (fileInput.value == "") {
        console.log("no file to upload");
        window.location.href="thanks.html";
        return;
    }

    var storageRef = storage.ref("images/" + postDocID + ".jpg");

    storageRef.put(ImageFile)   //global variable ImageFile

        // AFTER .put() is done
        .then(function () {
            console.log('Uploaded to Cloud Storage.');
            storageRef.getDownloadURL()

                // AFTER .getDownloadURL is done
                .then(function (url) { // Get URL of the uploaded file
                    console.log("Got the download URL.");
                    db.collection("posts").doc(postDocID).update({
                        "image": url // Save the URL into users collection
                    })

                        // AFTER .update is done
                        .then(function () {
                            console.log('Added pic URL to Firestore.');
                            // change window to thank.html
                            window.location.href="thanks.html";
                        })
                })
        })
        .catch((error) => {
            console.log("error uploading to cloud storage");
        })
}
