function validateForm(){
    var fullName = document.getElementById('full-name');
    const expName = /\w\s{2,}/;
    if(fullName.matches(expName))
        alert("Successful");
    else    
        alert("Not Successful");
}
