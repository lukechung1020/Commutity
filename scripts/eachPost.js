// Populate the single post card
function displayPostInfo() {
    let params = new URL(window.location.href); //get URL of search bar
    let ID = params.searchParams.get("docID"); //get value for key "id"
    console.log(ID);
    var postUser;

    db.collection('posts').doc(ID).get().then((doc) => {
        var title = doc.data().postTitle;
        var postText = doc.data().postText;
        var time = doc.data().timestamp;
        postUser = doc.data().userID;
        var image = doc.data().image;
        let tempPostArr = doc.data().filters;
        let filterString = "";

        const dateInMillis = time.toDate();

        var date = new Date(dateInMillis).toDateString() + ' at ' + new Date(dateInMillis).toLocaleTimeString();
        // If empty image, then set default
        if (!(image === "")) {
            document.getElementById("post-image").src = image;
        } else {
            document.getElementById("post-image").src = "./images/icon.jpg";
        }

        // Display the array of filters as a string on the post
        for (let i = 0; i < tempPostArr.length; i++) {
            if (i == tempPostArr.length - 1) {
                filterString += tempPostArr[i];
            } else {
                filterString += tempPostArr[i] + ", ";
            }
        }

        // Set inner html for all fields
        document.getElementById("post-title").innerHTML = title;
        document.getElementById("post-filters").innerHTML = filterString;
        document.getElementById("post-content").innerHTML = postText;
        document.getElementById("post-timestamp").innerHTML = date;

        // Get the name of the user of the post
        db.collection('users').doc(postUser).get().then((doc) => {
            var nameOfUser = doc.data().name;
            console.log(nameOfUser);

            document.getElementById("post-username").innerHTML = nameOfUser;
        });
    });

}
displayPostInfo();

