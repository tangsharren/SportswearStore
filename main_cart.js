/*

  BAIT1023 WEB DESIGN AND DEVELOPMENT        
  Assignment

  Author : Eunice Teh Pei Yeen
           Tan Chen Xun
    
  Filename:   main_cart.js
    
*/ 

/* link reference: (https://youtu.be/PoTGs38DR9E)*/
/* link reference: (https://youtu.be/tEAl7L62GEw)*/
/* link reference: (https://www.youtube.com/watch?v=q_TZhCWbS3I) --> USE TO MODIFY THE FIRST TWO REFRENCES TO NOT 
                                                                      LIMIT THE PRODUCT PAGE IN USING CART*/

var carts = document.querySelectorAll('.cart_btn');

var products = [];
// click to add to cart
for (let i = 0; i < carts.length; i++){
    carts[i].addEventListener('click', () => {
        addtoCart(products[i]);

        cartNumbers(products[i]);

        })
}

// When the website is reload, the number of items in the cart at the header still remains
function onLoadCartNo() {
    var productNo = localStorage.getItem('cartNumbers');
    
    if (productNo) {
        document.querySelector('.cart-tooltip').textContent = productNo;
    }
}

// This function is to store the number of time users click the "Add to cart" button in the local storage
function cartNumbers(products) {
    var productNo = localStorage.getItem('cartNumbers');

    //convert the productNo from string to integer
    productNo = parseInt(productNo);

    if (productNo) {
        localStorage.setItem('cartNumbers', productNo + 1);
         document.querySelector('.cart-tooltip').textContent = productNo + 1;
    }
    else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart-tooltip').textContent = 1;
    }
}

// This function is to get the array of the products added into cart
function addtoCart(products){
    let but = event.target
    let but_parent = but.parentElement
    let but_gparent = but_parent.parentElement
    let but_ggparent = but_gparent.parentElement
    let itemName = but_ggparent.children[3].innerText
    let itemPrice = but_ggparent.children[4].innerText.slice(2)
    console.log(itemPrice)
    let itemImage = but_ggparent.children[0].src
    let inCartno = 0
    products = {name:itemName,tag:itemImage,price:itemPrice,inCart:inCartno}
    setItems(products)
}

// This function is to sort and set the amount of each item added into cart
function setItems(products) {
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

// This function is used to calculate the total cost
function totalCost(products) {
    let cartCost = localStorage.getItem('totalCost');
    products.price = parseFloat(products.price)
    if (cartCost != null) {
        cartCost = parseFloat(cartCost);
        localStorage.setItem("totalCost", JSON.stringify(cartCost + products.price));
    }
    else {
        localStorage.setItem("totalCost", JSON.stringify(products.price));
    }
}

// This function is used to display cart in browser
function dislpayCart() {
    let cartCost = localStorage.getItem('totalCost');
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");

    // This is to replce the inner HTML with information of the product chosen by the user so that it will show on the browser
    console.log(cartItems);
    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
              <div class="cart-row">
            <div class="cart-item cart-column">
                
                <img class="cartimage" src="${item.tag}" width="100" height="100">
                <span class="carttitle">${item.name}</span>
        </div>
            <span class="cart-price cart-column">RM${item.price}</span>
        <div class="cart-quantity cart-column">
            <span class="cart-qty-input"> ${item.inCart}</span>
            <ion-icon name="trash-outline" class="removebtn" id="${item.name}"></ion-icon>
        </div>
        </div>
            `;
        });

        productContainer.innerHTML += `
            <div class="grandTotalContainer">
                <h4 class="grandTotalTitle">
                    Grand Total
                </h4>
                <h4 class="grandTotal">
                   RM${parseFloat(cartCost).toFixed(2)}
                </h4>
        `;
    }

}

// This function is to clear the cart
function clearcart() {
    if(confirm("Are you sure you want to clear cart?")== 1){
        // remove items from local storage
        localStorage.removeItem("productsInCart");
        localStorage.removeItem("cartNumbers");
        localStorage.removeItem("totalSST");
        localStorage.removeItem("totalCost");
        localStorage.removeItem("deliveryFee");
        localStorage.removeItem("grandttl");
        // reload browser
        window.location.reload();
        }
}

//-------------------- This is for Payment------------------------------------------------
function paymentCart() {
    let cartCost = localStorage.getItem('totalCost');
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let finprodContainer = document.querySelector(".finalprod");
    console.log(cartItems);
    
    // This is to replce the inner HTML with information of the product chosen by the user so that it will show on the browser
    if (cartItems && finprodContainer) {
        finprodContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            finprodContainer.innerHTML += `

            <tr class="prod-row" id="productRow">
            <td class="image">
                <img src="${item.tag}" width="50px">
            </td>
            <td class="product">
                <span>${item.name}</span>
            </td>
            <td class="price"><span>RM${item.price}<span></td>
            <td class="quantity">
                <span>${item.inCart}</span>
            </td>
            <td class="total">
            <span>
                RM${(parseFloat(item.inCart) * parseFloat(item.price)).toFixed(2)}
                </span>
            </td>
            </tr>
            `;
        });

    }

    // This is used to calculate the SST
    let totalSstCost;
    totalSstCost = cartCost * 1.06;
    totalSstCost = parseFloat(totalSstCost).toFixed(2);
    localStorage.setItem("totalSST", totalSstCost);

    // This is used to indicate the delivery fees from the delivery method the user has chosen 
    // and calculate the GrandTotal
    let x = document.forms["custInfo"]["deliveryChoice"].value;

    let deliFee;
    let delfee = 5;
    let noFee = 0;
    let grndTtl;

    // this is to validate if the delivery method chosen and the cartCost 
    if (x == "Courier Delivery" && cartCost<=250) {

            localStorage.setItem("deliveryFee", delfee);
            deliFee = localStorage.getItem('delchoice');
            document.querySelector('#delFees').textContent = '5.00';
            grndTtl = parseFloat(totalSstCost) + delfee;
            grndTtl = grndTtl.toFixed(2);
            localStorage.setItem("grandttl", grndTtl);

    }
    else if (x == "Self Pick-Up" || cartCost >250) {
        localStorage.setItem("deliveryFee", delfee);
        deliFee = localStorage.getItem('delchoice');
        document.querySelector('#delFees').textContent = '0.00';
        grndTtl = parseFloat(totalSstCost) + noFee;
        grndTtl = grndTtl.toFixed(2);
        localStorage.setItem("grandttl", grndTtl);

        
    }

    // This is to turn on only the required forms
    if (x == "Courier Delivery") {
         document.getElementById("addressBox").disabled=false;
        document.getElementById("deliveryMethod").disabled=false;
        document.getElementById("preferredTime").disabled = true;
        document.getElementById("preferreDate").disabled = true;
    }
    else if (x == "Self Pick-Up") {
        
        document.getElementById("addressBox").disabled=true;
        document.getElementById("deliveryMethod").disabled=true;
        document.getElementById("preferredTime").disabled = false;
        document.getElementById("preferreDate").disabled=false;
    }

    // To show the results od total, sst and grand total on the browser
    document.querySelector('#total').textContent = parseFloat(cartCost).toFixed(2);
    document.querySelector('#sst').textContent = totalSstCost;
    document.querySelector('#grandTotal').textContent = grndTtl;

}

// This function is to remove items from local storage and reload when submit is clicked in the payment
function end() {
    document.forms[1].onsubmit = function () {
        // check if all the neccessary criterias have been filled
        if (this.checkValidity()) alert("Thank you for your purchase!");
        // remove items from local storage
        localStorage.removeItem("productsInCart");
        localStorage.removeItem("cartNumbers");
        localStorage.removeItem("totalSST");
        localStorage.removeItem("totalCost");
        localStorage.removeItem("deliveryFee");
        localStorage.removeItem("grandttl");
      return true;
   }
}

//call the onLoadCartNo() function
onLoadCartNo();
//call the displayCart() function
dislpayCart();

// declare variables
let removeCartItem = document.getElementsByClassName('removebtn');

// get cart item from local storage and convert to JSON
let cartItems = localStorage.getItem("productsInCart");
cartItems = JSON.parse(cartItems);

// get the cart quantity from local storage and convert to integer
let cartqty = localStorage.getItem("cartNumbers");
cartqty =parseInt(cartqty);

//get total price from local storage and convert to float
let totalprice = localStorage.getItem("totalCost");
totalprice = parseFloat(totalprice)
console.log(typeof(totalprice))

// Loop the cart items to idenify which item in array to remove 
for (let i = 0; i < removeCartItem.length; i++){
    removeCartItem[i].addEventListener('click',() => {
        updateCart(removeCartItem[i]);
        remove_cart(removeCartItem[i]);
    })
}

// This function is to update the cart after the item is removed
function updateCart(removecart) {
    let remove_price = cartItems[removecart.id].price
    console.log(remove_price)
    remove_price = parseFloat(remove_price)
    let remove_qty = cartItems[removecart.id].inCart
    remove_qty = parseInt(remove_qty)
    remove_price = remove_price * remove_qty
    totalprice = totalprice - remove_price
    cartqty = cartqty - remove_qty
    localStorage.setItem("totalCost",JSON.stringify(totalprice))
    localStorage.setItem("cartNumbers",JSON.stringify(cartqty))
}

// This function is to remove the item from the cart
function remove_cart(removecart) {
    let r_btn_parent = removecart.parentElement;
    let r_btn_gparent = r_btn_parent.parentElement;
    delete cartItems[removecart.id]
    localStorage.setItem("productsInCart",JSON.stringify(cartItems))
    r_btn_gparent.remove();
    // reload browser
     window.location.reload();
}

//call the paymentCart() function
paymentCart();
