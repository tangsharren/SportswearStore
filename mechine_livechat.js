/*
            BAIT1023 WEB DESIGN AND DEVELOPMENT        
            Assignment
    
            Author: Wong Yann Yiee
        
            Filename: mechine_livechat.js
        
        */

            
/* (link reference: https://www.youtube.com/watch?v=F-KNG_gVJ2c)*/
/* (link reference: https://www.youtube.com/watch?v=0yp3bbT-z5I&t=217s)*/


//function for open and close the form 
function openForm(){
    document.getElementById("Form").style.display="block";
}

function closeForm(){
    document.getElementById("Form").style.display="none";
}

//---------------------------------------------------------------------------------------------

//set constant question and answer
const live_ans = [
    {
        ques: 'How to start shopping ? ',
        ansa: 'Hi,you may proceed to product page to start shopping. Have a great experience! ',
    },
    {
        ques: 'How to create an account ? ',
        ansa: "Hi,click on sign up button then use email account and create a password. Dont' forget your password.",
    },
    {
        ques: 'What delivery method is used ? ',
        ansa: "Hi,we have 3 type of delivery options: 1)DHL<br />2)Ninjavan<br />3)Poslaju.<br />You also can pickup at our retail shops. Make your best choice.",
    }
]
//loop for clicking the setted question and include array for checking the corresponding position 
let textabs = document.getElementsByClassName("quest");
for (let i=0; i < textabs.length ; i++){
    textabs[i].addEventListener('click',() => {
        getQues(live_ans[i]);
       
    })
    
}

//function for getting the question and reply message by clicking the setted question
function getQues(live_ans)
{
    let container = document.getElementById("form_container");
    let small_container = document.createElement('div')
    small_container.innerHTML =  `<div id="quest_ans">
                                
                                <div class = cust_question>                                
                                    ${live_ans.ques}
                                </div>
                                
                                <div class = cust_ans>                          
                                    ${live_ans.ansa}
                                    
                                </div> 
                               
                                 
                                <img src="images/Live-chat/logo-1.png" id="image_respond">
                            </div>
                           `
    container.append(small_container)
    const lastMsg = small_container
    lastMsg.scrollIntoView(true)
} 



//---------------------------below is about sending message method-----------------------------------------------

const msg_container = document.querySelector('#form_container');
const sendBtn = document.querySelector('.input_msg img');
const input = document.querySelector('.input_msg input');

input.addEventListener('keyup',sendMessageOnEnter);//to allow user send message by enter

//---------function for sending message method -----------------
function sendMessage()
{
    let small_msg_container = document.createElement('div')
    small_msg_container.innerHTML = `
    <div class="single">
       
        <div class="user_info">
           <p>${input.value}</p>
        </div>
    </div>
       
    `
    msg_container.append(small_msg_container)
    input.focus();
    input.value = '';
    input.ariaPlaceholder = "Type your message...";
   
    const lastMsg = small_msg_container
    lastMsg.scrollIntoView(true)
}


//function for sending message by enter

function sendMessageOnEnter(e)
{
    if(e.keyCode === 13 && input.value !== ''){
       sendMessage();
    }
}

//function for send message by clicking image
sendBtn.addEventListener('click',sendMessageOnClick);

function sendMessageOnClick(){
    if(input.value ===''){
        return
    }
    else{
        sendMessage();
    }
}



