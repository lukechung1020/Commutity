

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
                if (!(image === "")) {
                    newcard.querySelector('.card-image').src = image;
                } else {
                    newcard.querySelector('.card-image').src = "./images/icon.jpg";
                }

                document.getElementById(collection + "-go-here").appendChild(newcard);

                let deleteButton = document.querySelector('#delete-button');
                $(deleteButton).click(() => {
                    if (
                        window.confirm("Are you sure you want to delete this post?")
                    ) {
                        doc.ref.delete();
                        $(newcard).remove();
                    }
                })

            })
        })


}

displayPosts("posts");

// const deletePostForm = document.querySelector('.delete')
// deletePostForm.addEventListener('submit', (e) => {
//     e.preventDefault()

//     const docRef = doc(db, 'posts', deletePostForm.id.value)

//     deleteDoc(docRef)
//         .then(() => {
//             deletePostForm.reset()
//         })
// })

