var currentUser;

function populateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    var userName = userDoc.data().name;
                    var userCommuteType = userDoc.data().commuteType;
                    var userCity = userDoc.data().city;

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userCommuteType != null) {
                        document.getElementById("commuteSelect").value = userCommuteType;
                    }
                })
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}

//call the function to run it 
populateUserInfo();

function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {
    //enter code here

    //a) get user entered values
    userName = document.getElementById('nameInput').value;       //get the value of the field with id="nameInput"
    userCommuteType = document.getElementById('commuteSelect').value;     //get the value of the field with id="schoolInput"
    userCity = document.getElementById('citySelect').value;       //get the value of the field with id="cityInput"
    //b) update user's document in Firestore
    currentUser.update({
        name: userName,
        commuteType: userCommuteType,
        city: userCity
    })
        .then(() => {
            console.log("Document successfully updated!");
        })
    //c) disable edit 
    document.getElementById('personalInfoFields').visible = false;

}

