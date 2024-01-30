/*
            BAIT1023 WEB DESIGN AND DEVELOPMENT        
            Assignment
    
            Author: Tan Chen Xun
        
            Filename: Header.js
        
        */
function search_product() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("search_contain");
    filter = input.value.toUpperCase();
    ul = document.getElementById("search_list");
    li = ul.getElementsByTagName('li');
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }

function display_search() {
    document.getElementById("search_list").style.display = "block";
}

function hide_search() {
    document.getElementById("search_list").style.display = "none";
}

const dropdownContent =document.getElementById("menu");

  function dropfunction(){
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  }

  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

 