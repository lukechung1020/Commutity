//------------------------------------------------
// Call this function when the "logout" button is clicked
//-------------------------------------------------
function logout() {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    console.log("logging out user");
    window.location.href = "./index.html";
  }).catch((error) => {
    // An error happened.
  });
}

function onlySignedInUserAcess() {

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      // Do nothing.
    } else {
      // No user is signed in.
      // Send the user to the login page
      window.location.href = "./index.html";
    }
  });
}
onlySignedInUserAcess();