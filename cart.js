    let listCart = [];

    function checkCart(){
            var cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('listCart='));
            if(cookieValue){
                listCart = JSON.parse(cookieValue.split('=')[1]);
            }
            console.log(cookieValue);
            console.log(listCart);
    }
    checkCart();
    addCartToHTML();

    function updateCartCount() {
        const cartCountSpan = document.getElementById('cart-count');
        if (cartCountSpan) {
            // Calculate the total quantity from the listCart array
            const totalQuantity = listCart.reduce((total, product) => total + product.quantity, 0);
            cartCountSpan.innerText = totalQuantity.toString();
        }
    }

    function addCartToHTML(){
        // clear data default
        let listCartHTML = document.querySelector('.returnCart .list');
        listCartHTML.innerHTML = '';

        let totalQuantityHTML = document.querySelector('.totalQuantity');
        let totalPriceHTML = document.querySelector('.totalPrice');
        let totalQuantity = 0;
        let totalPrice = 0;
        // if has product in Cart
        if(listCart){
            listCart.forEach(product => {
                if(product){
                    let newCart = document.createElement('div');
                    newCart.classList.add('item');
                    newCart.innerHTML = 
                        `<img src="${product.image}">
                        <div class="info">
                            <div class="name">${product.name}</div>
                            <div class="price">&#8369;${product.price}/piece</div>
                        </div>
                        <div class="quantity">${product.quantity}</div>
                        <div class="returnPrice">&#8369;${product.price * product.quantity}</div>`;
                    listCartHTML.appendChild(newCart);
                    totalQuantity = totalQuantity + product.quantity;
                    totalPrice = totalPrice + (product.price * product.quantity);
                }
            })
        }
    
        totalQuantityHTML.innerText = totalQuantity;
        totalPriceHTML.innerText = 'PHP ' + totalPrice;

         // Update the cart count in the HTML
    updateCartCount();
    }