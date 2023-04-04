// Displays the posts for the main feed
// If there are selected filters, query the posts based on those filters
// If not, just query by the post's timestamp, having more recent posts 
// showing up first
function displayPosts(collection) {
    // Whenever this function is called, remove all the posts in the feed
    removePosts();


    let cardTemplate = document.getElementById("postsCardTemplate");
    let filteredQuery = db.collection(collection);

    // When there are selected filters, query by those filters
    if (filterValuesArr.length > 0) {
        // The determinant filter is the one that is the last one in the array of filters
        // Use that filter to query
        filteredQuery = filteredQuery.where("filters", "array-contains", filterValuesArr[filterValuesArr.length - 1]).orderBy("timestamp", "desc");
        filteredQuery.get().then(allPosts => {
            allPosts.forEach(doc => {
                var title = doc.data().postTitle;
                var postText = doc.data().postText;
                var timeStamp = doc.data().timestamp;
                var userID = doc.data().userID;
                var image = doc.data().image;
                let newcard = cardTemplate.content.cloneNode(true);
                let tempPostArr = doc.data().filters;
                let filterString = "Filters: ";

                // Display the array of filters as a string on the post
                for (let i = 0; i < tempPostArr.length; i++) {
                    if (i == tempPostArr.length - 1) {
                        filterString += tempPostArr[i];
                    } else {
                        filterString += tempPostArr[i] + ", ";
                    }
                }

                newcard.querySelector('.card-title').innerHTML = title;
                // newcard.querySelector('.card-text').innerHTML = postText;
                newcard.querySelector('.filters').innerHTML = filterString;

                // If there is no image, use a default one
                if (!(image === "")) {
                    newcard.querySelector('.card-image').src = image;
                } else {
                    newcard.querySelector('.card-image').src = "./images/icon.jpg";
                }

                // Adding functionality to the delete button
                let deleteButton = newcard.querySelector('#delete-button');
                $(deleteButton).click(() => {
                    if (
                        window.confirm("Are you sure you want to delete this post?")
                    ) {
                        doc.ref.delete();
                        $(newcard).remove();
                    }
                });

                // If this post does not belong to the signed in user, hide the delete button
                if (currentUserUID != userID) {
                    deleteButton.setAttribute("hidden", "hidden");
                }

                // Add the created post to the feed
                document.getElementById(collection + "-go-here").appendChild(newcard);

            })
        })
    } else {
        filteredQuery.orderBy("timestamp", "desc").get()
            .then(allPosts => {
                allPosts.forEach(doc => {
                    var title = doc.data().postTitle;
                    var postText = doc.data().postText;
                    var timeStamp = doc.data().timestamp;
                    var userID = doc.data().userID;
                    var image = doc.data().image;
                    let newcard = cardTemplate.content.cloneNode(true);
                    let tempPostArr = doc.data().filters;
                    let filterString = "Filters: ";

                    for (let i = 0; i < tempPostArr.length; i++) {
                        if (i == tempPostArr.length - 1) {
                            filterString += tempPostArr[i];
                        } else {
                            filterString += tempPostArr[i] + ", ";
                        }
                    }

                    newcard.querySelector('.card-title').innerHTML = title;
                    // newcard.querySelector('.card-text').innerHTML = postText;
                    newcard.querySelector('.filters').innerHTML = filterString;
                    if (!(image === "")) {
                        newcard.querySelector('.card-image').src = image;
                    } else {
                        newcard.querySelector('.card-image').src = "./images/icon.jpg";
                    }
                    let deleteButton = newcard.querySelector('#delete-button');
                    $(deleteButton).click(() => {
                        if (
                            window.confirm("Are you sure you want to delete this post?")
                        ) {
                            doc.ref.delete();
                            $(newcard).remove();
                        }
                    });
                    if (currentUserUID != userID) {
                        deleteButton.setAttribute("hidden", "hidden");
                    }
                    document.getElementById(collection + "-go-here").appendChild(newcard);

                })
            })
    }
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

