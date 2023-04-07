// Displays the posts for the main feed
// If there are selected filters, query the posts based on those filters
// If not, just query by the post's timestamp, having more recent posts 
// showing up first
function displayPosts(collection) {
    // Whenever this function is called, remove all the posts in the feed
    removePosts();


    let cardTemplate = document.getElementById("postsCardTemplate");
    let filteredQuery = db.collection(collection);

    // When there are selected filters, query by those filters, and new posts first
    // If not then just query by new posts first
    if (filterValuesArr.length > 0) {
        filteredQuery = filteredQuery.where("filters", "array-contains", filterValuesArr[filterValuesArr.length - 1]).orderBy("timestamp", "desc");
    } else {
        filteredQuery = filteredQuery.orderBy("timestamp", "desc");
    }
    filteredQuery.get().then(allPosts => {
        allPosts.forEach(doc => {
            var title = doc.data().postTitle;
            var postText = doc.data().postText;
            var time = doc.data().timestamp;
            var userID = doc.data().userID;
            var docID = doc.id;
            var image = doc.data().image;
            let newcard = cardTemplate.content.cloneNode(true);
            let tempPostArr = doc.data().filters;
            let filterString = "Filters: ";

            // Format timestamp in firestore
            const dateInMillis = time.toDate();
            var date = new Date(dateInMillis).toDateString() + ' at ' + new Date(dateInMillis).toLocaleTimeString();

            // Display the array of filters as a string on the post
            for (let i = 0; i < tempPostArr.length; i++) {
                if (i == tempPostArr.length - 1) {
                    filterString += tempPostArr[i];
                } else {
                    filterString += tempPostArr[i] + ", ";
                }
            }
            newcard.querySelector('.card-title').innerHTML = title;
            newcard.querySelector('.post-timestamp').innerHTML = date;
            newcard.querySelector('.filters').innerHTML = filterString;

            // If there is no image, use a default one
            if (!(image === "")) {
                newcard.querySelector('.card-image').src = image;
            } else {
                newcard.querySelector('.card-image').src = "./images/default-post-img.jpg";
            }

            // Adding functionality to the delete button
            let deleteButton = newcard.querySelector('#delete-button');
            // When clicked confirm with user if they want to delete the post
            $(deleteButton).click(() => {
                if (
                    window.confirm("Are you sure you want to delete this post?")
                ) {
                    // If image is not empty, delete from storage
                    var imageRef = doc.data().image;
                    if (imageRef != "") {
                        imageFileName = "images/" + docID + ".jpg";
                        var postImageRef = storage.ref().child(imageFileName);
                        // Delete the file
                        postImageRef.delete().then(() => {
                            console.log("Image deleted successfully!");
                        }).catch((error) => {
                            console.log("Error deleting image");
                        });
                    }
                    // Update posts array in users collection
                    let userCollectionRef = db.collection('users').doc(userID);
                    userCollectionRef.update({
                        posts: firebase.firestore.FieldValue.arrayRemove(docID)
                    });

                    // Delete post from firebase
                    doc.ref.delete();
                    console.log("Post deleted successfully");

                    // Refresh post feed
                    displayPosts("posts");
                }
            });

            // See more details button sends user to eachPost.html, but puts the post's ID in the url
            newcard.querySelector('a').href = "eachPost.html?docID=" + docID;

            // If this post does not belong to the signed in user, hide the delete button
            if (currentUserUID != userID) {
                deleteButton.setAttribute("hidden", "hidden");
            }

            // Add the created post to the feed
            document.getElementById(collection + "-go-here").appendChild(newcard);

        })
    })
}
displayPosts("posts");

// Function that populate selected filters section based on filterValuesArr
function updateSelectedFilters() {
    // Get pointer to selectedFilters div
    let selectedFilters = document.getElementById("selectedFilters");
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
    displayPosts("posts");
}

// Function that clears the selected filters
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

    displayPosts("posts");
}

// Function that removes all current posts
function removePosts() {
    let allPosts = document.getElementById("posts-go-here");
    let numOfChildren = allPosts.childNodes.length;
    if (numOfChildren > 0) {
        while (numOfChildren > 0) {
            allPosts.removeChild(allPosts.lastChild);
            numOfChildren--;
        }
    }
}

// Function that puts window to top of the page
