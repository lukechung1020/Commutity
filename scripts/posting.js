// Uploading a post to firebase
function createPost() {
    console.log("inside create post")
    let Title = document.getElementById("post-title").value.trim();
    let Text = document.getElementById("post-text").value.trim();

    // Validation for required fields which are title, text, and filters
    if (!Title && !Text && filterValuesArr.length == 0) {
        // All fields are empty
        alert("Please fill out Post Title, Text Content AND select filters!");
        return;
    } else if (Title && !Text && filterValuesArr.length == 0) {
        // Only title is filled
        alert("Please fill out Text Content AND select filters!");
        return;
    } else if (!Title && Text && filterValuesArr.length == 0) {
        // Only text is filled
        alert("Please fill out Post Title AND select filters!");
        return;
    } else if (!Title && Text && filterValuesArr.length > 0) {
        // Only filters selected
        alert("Please fill out Post Title AND Text Content!");
        return;
    } else if (Title && Text && filterValuesArr.length == 0) {
        // Only filters not selected
        alert("Please select filters!");
        return;
    } else if (Title && !Text && filterValuesArr.length > 0) {
        // Only text not filled
        alert("Please fill out Text Content!");
        return;
    } else if (!Title && Text && filterValuesArr.length > 0) {
        // Only title not filled
        alert("Please fill out Post Title!");
    }

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            var userID = user.uid;
            // Gets the document for current user.
            currentUser.get()
                .then(userDoc => {
                    // Add items
                    var postRef = db.collection("posts").doc();
                    db.collection("posts").doc(postRef.id).set({
                        userID: userID,
                        postTitle: Title,
                        postText: Text,
                        image: "",
                        filters: filterValuesArr,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(() => {
                        console.log("Sucessfully added post to firestore");
                        // Add the post id of this post to an array in the current user's document
                        // that contains the post ids that has been created by this user
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

// Variables to be used for images
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

// Function that populate selected filters section based on filterValuesArr
function updateSelectedFilters() {
    // Get pointer to selectedFilters div
    let selectedFilters = document.getElementById("selectedFilters");
    // When there are elements in the filters array, create buttons and display them
    // Display the button that clears all the filter buttons that are created when clicked
    if (filterValuesArr.length > 0) {
        filterValuesArr.forEach(function (item) {
            let filterBtn = document.createElement("button");
            filterBtn.setAttribute("type", "button");
            filterBtn.setAttribute("class", "btn btn-light");
            filterBtn.setAttribute("style", "margin-right: 5px;");
            filterBtn.innerHTML = item;
            selectedFilters.appendChild(filterBtn);
        });
        document.getElementById("clearFilters").removeAttribute("hidden");
    }
}

// Function that clears the selected filters
// Have to manually reset and hide each field because of error of exceeding call stack
function clearSelectedFilters() {
    let selectedFilters = document.getElementById("selectedFilters");
    let numOfChildren = selectedFilters.childNodes.length;
    if (numOfChildren > 0) {
        while (numOfChildren > 0) {
            selectedFilters.removeChild(selectedFilters.lastChild);
            numOfChildren--;
        }
    }
    document.getElementById("clearFilters").setAttribute("hidden", "hidden");
    // Reset select commute type
    selectCommuteType.selectedIndex = 0;
    // Reset transit type
    selectTransitType.selectedIndex = 0;
    selectTransitType.setAttribute("hidden", "hidden");
    // Reset location options
    locationSearch.value = "";
    locationSearch.setAttribute("hidden", "hidden");
    // Reset bus options
    busStopSearch.value = "";
    busStopSearch.setAttribute("hidden", "hidden");
    busStopSearch.disabled = false;
    busRouteSearch.value = "";
    busRouteSearch.setAttribute("hidden", "hidden");
    busRouteSearch.disabled = false;
    skytrainOption.selectedIndex = 0;
    skytrainOption.setAttribute("hidden", "hidden");
    // Reset skytrain options
    selectExpoLine.setAttribute("hidden", "hidden");
    selectExpoLine.value = "";
    selectExpoLine.disabled = false;
    selectMilleniumLine.setAttribute("hidden", "hidden");
    selectMilleniumLine.value = "";
    selectMilleniumLine.disabled = false;
    selectCanadaLine.setAttribute("hidden", "hidden");
    selectCanadaLine.value = "";
    selectCanadaLine.disabled = false;
    clearSearch.setAttribute("hidden", "hidden");
    filterValuesArr = [];
}
