//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeleton(){
    console.log($('#navbarPlaceholder').load('./app-elements/nav.html'));
    console.log($('#footerPlaceholder').load('./app-elements/footer.html'));
}
loadSkeleton();  //invoke the function
