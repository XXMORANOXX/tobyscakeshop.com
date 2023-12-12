let products = [];
let cart = [];
let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');

const productFileMap = {};

// Assuming first 24 IDs are for 'Cakes_Categories.html'
for (let i = 1; i <= 24; i++) {
    productFileMap[i] = 'Cakes_Categories.html';
}

// Assuming next 15 IDs are for 'Pastries.html'
for (let i = 25; i <= 39; i++) {
    productFileMap[i] = 'Pastries.html';
}

const addDataToHTML = () => {
    // remove datas default from HTML
    listProductHTML.innerHTML = '';

    // add new datas
    if (products.length > 0) {
        // Check the pathname to determine which range of products to display
        let startIdx, endIdx;
        if (window.location.pathname.includes('Cakes_Categories.html')) {
            startIdx = 0;
            endIdx = 23;
        } else if (window.location.pathname.includes('Pastries.html')) {
            startIdx = 24;
            endIdx = 38;
        }
        else if (window.location.pathname.includes('index.html')) {
            startIdx = 24;
            endIdx = 26;
        } 

        // Display only the relevant range of products
        const productsToDisplay = products.slice(startIdx, endIdx + 1);

        productsToDisplay.forEach(product => {
                let newProduct = document.createElement('div');
                newProduct.dataset.id = product.id;
                newProduct.classList.add('item');
                newProduct.innerHTML = 
                `<img src="${product.image}" alt="${product.name} class="product-image">
                <h3>${product.name}</h3>
                <div class="price">&#8369;${product.price}</div>
                <button class="addCart">Add To Cart</button>`;
                listProductHTML.appendChild(newProduct);

                // Attach click event to each product image for modal display
            const productImage = newProduct.querySelector('img');
            productImage.addEventListener('click', () => openModal(product));
            });
        }
    };

    // Function to save the cart data to cookies
    const saveCart = () => {
    document.cookie = `listCart=${JSON.stringify(cart)}; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;`;
    };

    // Function to open modal when a product image is clicked
const openModal = (product) => {
    const modal = document.getElementById('myModal');
    const modalImg = document.getElementById('modalImg');
    const captionText = document.getElementById('caption');

    modal.style.display = 'block';
    modalImg.src = product.image;
    captionText.innerHTML = product.name;

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
};

// Close the modal when the close button is clicked
const closeModal = () => {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
};

// Attach click event to the close button
const closeBtn = document.querySelector('.closebtn');
closeBtn.addEventListener('click', closeModal);


    listProductHTML.addEventListener('click', (event) => {
        let positionClick = event.target;
        if(positionClick.classList.contains('addCart')){
            let id_product = positionClick.parentElement.dataset.id;
            addToCart(id_product);
        }
    })
    const addToCart = (product_id) => {
        let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
        let product = products.find((value) => value.id == product_id);
        if (cart.length <= 0) {
            cart = [{
                product_id: product_id,
                quantity: 1,
                name: product.name,
                price: product.price,
                image: product.image
            }];
        } else if (positionThisProductInCart < 0) {
            cart.push({
                product_id: product_id,
                quantity: 1,
                name: product.name,
                price: product.price,
                image: product.image
            });
        } else {
            cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
        }
        
        // Update the product list based on the file name
        const fileName = productFileMap[product_id];
        if (fileName) {
            const productListHTML = document.querySelector(`.${fileName} .listProduct`);
            addDataToHTML(productListHTML);
        }
        saveCart();
        addCartToHTML();
        addCartToMemory();
    }
const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if(cart.length > 0){
        cart.forEach(item => {
            totalQuantity = totalQuantity +  item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;

            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];
            listCartHTML.appendChild(newItem);
            newItem.innerHTML = `
            <div class="image">
                    <img src="${info.image}">
                </div>
                <div class="name">
                ${info.name}
                </div>
                <div class="totalPrice">&#8369;${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${item.quantity}</span>
                    <span class="plus">></span>
                </div>
            `;
        })
    }
    iconCartSpan.innerText = totalQuantity;
}

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changeQuantityCart(product_id, type);
    }
})
const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if(positionItemInCart >= 0){
        let info = cart[positionItemInCart];
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                break;
        
            default:
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                }else{
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    saveCart();
    addCartToHTML();
    addCartToMemory();
}

const initApp = () => {
    // get data product
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();

        // get data cart from memory
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        } 
    })
}
initApp();

