window.onload=setForm;
/*
            BAIT1023 WEB DESIGN AND DEVELOPMENT        
            Assignment
    
            Author: Wong Yann Yiee
        
            Filename:send_feedback.js
        
        */
//function for come out a message to tell user sended the feedback
function setForm()
{
    document.forms[0].onsubmit=function(){
        if(this.checkValidity()) alert
        ("Submitted. Thanks for your respond.");
        
        return true;
    }
}