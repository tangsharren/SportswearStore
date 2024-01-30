/*
            BAIT1023 WEB DESIGN AND DEVELOPMENT        
            Assignment
    
            Author: Tan Chen Xun
        
            Filename: Home.js
        
        */
//Automated slide
let thumbnails = document.getElementsByClassName('slider');
let container = document.getElementById('container');

let arrow_right = document.getElementById('right_arrow');
let arrow_left = document.getElementById('left_arrow');

arrow_left.addEventListener('click', function(){
    container.scrollLeft-=125;
})

arrow_right.addEventListener('click', function(){
    container.scrollLeft+=125;
})

const maxScrollLeft = container.scrollWidth - container.clientWidth;

//Auto Play Slider
function autoPlay() {
    if (container.scrollLeft > (maxScrollLeft-1)){
        container.scrollLeft-=maxScrollLeft;
    } else {
        container.scrollLeft+=1;
    }
}
let play = setInterval(autoPlay, 50);

//Hover to pause the slide
for (var i=0; i<thumbnails.length;i++) {
    thumbnails[i].addEventListener('mouseover',function() {
        clearInterval(play);
    });

    thumbnails[i].addEventListener('mouseout', function() {
        return play = setInterval(autoPlay,50);
    });
}

//slide-ad
var slideIndex = 0;
showSlides();
function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides fade");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    slides[slideIndex-1].style.display = "block";  
    setTimeout(showSlides, 4000);
}

//change arrow appearance
function setNewImage() {
    document.getElementById("anchor_down").src="images/Home/arrowdown.png";
}
function setOldImage() {
    document.getElementById("anchor_down").src="images/Home/arrowdown2.png"; 
}