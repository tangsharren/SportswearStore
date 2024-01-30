/*
            BAIT1023 WEB DESIGN AND DEVELOPMENT        
            Assignment
    
            Author: Tan Chen Xun
        
            Filename: wish2.js
        
        */
let add_wish = document.getElementsByClassName("like");
let wish = [];


for (let i = 0; i < add_wish.length; i++){
    add_wish[i].addEventListener('click', () => {
         addtoWish(wish[i]);
 
})
}

function addtoWish(wish){
    let btn = event.target
    console.log(btn.checked)
    let btn_parent = btn.parentElement
    let btn_gparent = btn_parent.parentElement
    console.log(btn_gparent)
    let itemName = btn_gparent.children[3].innerText
    let itemPrice = btn_gparent.children[4].innerText
    let itemImage = btn_gparent.children[0].src
    if (btn.checked == true){
        wish=({name:itemName,price:itemPrice,image:itemImage});
    
        }        
    setItems(wish)
}

function setItems(wish){
    let wishItems = localStorage.getItem('wishInCart');
    wishItems = JSON.parse(wishItems);
    
    if (wishItems != null) {
        
        if (wishItems[wish.name] == undefined) {
            wishItems = {
                ...wishItems,
                [wish.name]: wish
            }
        }
    }
    else {
        
        wishItems = {
        [wish.name]: wish 
    }
    }

    localStorage.setItem("wishInCart", JSON.stringify(wishItems));
}

function displayWish() {
   let wishItems = localStorage.getItem("wishInCart");
   wishItems = JSON.parse(wishItems);
   let productContainer = document.getElementById("wishes_menu");

   if (wishItems && productContainer) {
       productContainer.innerHTML = '';
       Object.values(wishItems).map(item => {
           productContainer.innerHTML += `
           <li class="wishes_item">
                <button class="wish_remove" id="${item.name}"><img src="images/Wishlist/remove.png" alt="remove"  width="25px" height="25px" /></button>
                    <div class="wish-contain">
                        <img src="${item.image}"/>
                        <p>${item.name}</p>
                        <p>${item.price}</p>
                    </div>
                    <button class="wish_to_cart"><span class="bn54span">Add to cart</span></button>
                </li>
           `;
       });

   }

}

displayWish();

let wish_remove = document.querySelectorAll(".wish_remove");
let send_cart = document.querySelectorAll(".wish_to_cart")
let wish_item = localStorage.getItem("wishInCart");
let wish_array = JSON.parse(wish_item);
console.log(wish_remove.length)

for(let i=0; i < wish_remove.length ;i++){
    wish_remove[i].addEventListener('click',() => {
       remove_wish(wish_remove[i])
    })
}

for(let i=0; i < send_cart.length ; i++){
    send_cart[i].addEventListener('click',() => {
        to_cart(wish_remove[i])
        remove_wish(wish_remove[i])
        add_cart_number(wish_remove[i])
    })
}

function add_cart_number(wish_remove) {
    var productNo = localStorage.getItem('cartNumbers');

    //convert the productNo from string to integer
    productNo = parseInt(productNo);

    if (productNo) {
        localStorage.setItem('cartNumbers', productNo + 1);
         document.querySelector('.cart span').textContent = productNo + 1;
    }
    else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
}

function remove_wish(wish_remove) {
    let r_btn=event.target
    let r_btn_parent = r_btn.parentElement
    let r_btn_gparent = r_btn_parent.parentElement
    delete wish_array[wish_remove.id]
    localStorage.setItem('wishInCart',JSON.stringify(wish_array))
    r_btn_gparent.remove();
}

function to_cart(wish_remove){
    let itemName = wish_array[wish_remove.id].name;
    let itemPrice = wish_array[wish_remove.id].price;
    itemPrice = itemPrice.slice(2)
    let itemImage = wish_array[wish_remove.id].image;
    let inCart = 0
    let products = {name:itemName,tag:itemImage,price:itemPrice,inCart:inCart};
    console.log(products)
    set_Transfer(products)
}

function set_Transfer(products){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        
        if (cartItems[products.name] == undefined) {
            cartItems = {
                ...cartItems,
                [products.name]: products
            }
        }
        cartItems[products.name].inCart += 1;
    }
    else {
        products.inCart = 1;
        cartItems = {
        [products.name]: products 
    }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    totalCost(products);
}

function totalCost(products) {
    let cartCost = localStorage.getItem('totalCost');
    products.price = parseInt(products.price)
    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", JSON.stringify(cartCost + products.price));
    }
    else {
        localStorage.setItem("totalCost", JSON.stringify(products.price));
    }
}



