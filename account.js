/*
            BAIT1023 WEB DESIGN AND DEVELOPMENT        
            Assignment
    
            Author: Tang Sharren
        
            Filename: account.js
        
        */
       
/* link reference:https://www.youtube.com/watch?v=XH5OW46yO8I */

function showPassword() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
    } 
    else {
        x.type = "password";
    }
}

var modal = document.getElementById("resetpsw-popup");    
var btn = document.getElementById("resetpsw-btn");
var span = document.getElementsByClassName("closepopup-btn")[0];  
btn.onclick = function() {
    modal.style.display = "block";
}
    
span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function validateForm() {   
    var pw1 = document.getElementById("psw").value;  
    var pw2 = document.getElementById("confirm-psw").value;  
    if(pw1 != pw2) {  
        alert ("Password not matched!"); 
    } 
    else {  
        alert ("Password reset successfully");  
        location.href = "account.html";
    }  
}