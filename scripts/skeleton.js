//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeleton() {
    console.log($('#nav-topPlaceholder').load('./app-elements/nav-top.html'));
    console.log($('#nav-bottomPlaceholder').load('./app-elements/nav-bottom.html'));
}
loadSkeleton();  //invoke the function

// For modal
var myModal = document.getElementById('myModal')
var myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', function () {
  myInput.focus()
})