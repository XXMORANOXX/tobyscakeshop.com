let navbar = document.querySelector('.navbar'); //navbar

document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
}

let search = document.querySelector('.search'); //search

document.querySelector('#search-btn').onclick=() =>{
    search.classList.toggle('active');
}

let iconCart = document.querySelector('#cart-btn');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let iconCartSpan = document.querySelector('#cart-btn span');

iconCart.addEventListener('click', () => {
  body.classList.toggle('showCart');
})
closeCart.addEventListener('click', () => {
  body.classList.toggle('showCart');
})


// For Log In Page
var x = document.getElementById("login");
        var y = document.getElementById("register");
        var z = document.getElementById("btn");

        function register(){
            x.style.left = "-400px";
            y.style.left = "50px";
            z.style.left = "110px";
        }
        function login(){
            x.style.left = "50px";
            y.style.left = "450px";
            z.style.left = "0";
        }
  
//For review section
        function myFunction() {
          var dots = document.getElementById("dots");
          var moreText = document.getElementById("more");
          var btnText = document.getElementById("myBtn");
        
          if (dots.style.display === "none") {
            dots.style.display = "inline";
            btnText.innerHTML = "Read more";
            moreText.style.display = "none";
          } else {
            dots.style.display = "none";
            btnText.innerHTML = "Read less";
            moreText.style.display = "inline";
          }
        }