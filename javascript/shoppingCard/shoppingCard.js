'use strict'

//Selectors
const container = document.querySelector("#container");
const cartCounter = document.querySelector("#cartCounter");
const fetchButton = document.querySelector("#fetchButton");
const brandsDropdown = document.querySelector("#brandsDropdown");

const url = "https://dummyjson.com/products?limit=100";

fetchButton.addEventListener('click', () => fetchAndDisplayProducts('https://dummyjson.com/products?limit=100') );

//--------------------------------------------------------------------------------------------------------------------------------------------
//Main Fetch
//--------------------------------------------------------------------------------------------------------------------------------------------

const fetchAndDisplayProducts = async (url) => {
    const products = await fetchProducts(url);
    showProductFromServer(products);
}

const fetchProducts = async (url) => {
    // fetch products
    const response = await fetch(url);
    const data = await response.json();
    const products = data.products;
    return products;
}

const showProductFromServer = async (products) => {
    
    hideEverything();

    for (let i=0; i<products.length; i++) {
        
        const card = document.createElement('div');
        container.appendChild(card);
        
        card.innerHTML += `
        <div class="card-body">
        <img 
        src="${products[i].thumbnail}" 
        title="${products[i].title}" 
        alt="${products[i].title}" 
        class="card-img-top">
        
        <h5 class="card-title">${products[i].title}</h5>
        <h6 class="card-brand">${products[i].brand}</h6>
        <h6 class="card-category">category: ${products[i].category}</h6>
        <p class="card-text">${products[i].description}
        <h6 class="card-rating">${products[i].rating} <i class="fa fa-star" aria-hidden="true"></i></h6></p>
        
        <h6 class="card-price">price: ${products[i].price}$</h6>
        
        <p class="btn btn-primary" onclick="addToCart(${products[i].id})">Add To Cart</p>
        <p class="btn btn-secondary" onclick="singleProduct(${products[i].id})">Show Details</p>
        </div>
        `
    }
}

//-----------------------------------------------------------------------------------------------------------------------------------------
//Filter By Category
//-----------------------------------------------------------------------------------------------------------------------------------------

const fetchCategories = async () => {
    const response = await fetch('https://dummyjson.com/products/categories');
    const categories = await response.json();
    
    const elmCategoriesContainer = document.querySelector('#categoriesContainer');
    let html = `
    <a id="categoriesContainer" class="nav-link dropdown-toggle active" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Categories</a>
    <ul class="dropdown-menu">
    `;
    
    for (let i = 0; i < categories.length; i++) {
        html += `<li><a class="dropdown-item" onclick="showProductByCategory('${categories[i]}')">${categories[i]}</a></li>`;
    }
    html += '</ul>';
    
    elmCategoriesContainer.innerHTML = html;
};

const handleCategoryChange = () => {
        const elmCategoriesDropdown = document.querySelector('#categories');
        const categoryName = elmCategoriesDropdown.value;
        fetchAndDisplayProducts(`https://dummyjson.com/products/category/${categoryName}`);
};

const showProductByCategory = async (category) => {
    const response = await fetch(url);
    const data = await response.json();
    const products = data.products;
    hideEverything();

    for (let i=0; i<products.length; i++) {

        if (category===products[i].category) {
        
        
        const card = document.createElement('div');
        container.appendChild(card);
        
        card.innerHTML += `
                <div class="card-body">
                    <img 
                    src="${products[i].thumbnail}" 
                    title="${products[i].title}" 
                    alt="${products[i].title}" 
                    class="card-img-top">
                    
                    <h5 class="card-title">${products[i].title}</h5>
                    <h6 class="card-brand">${products[i].brand}</h6>
                    <h6 class="card-category">category: ${products[i].category}</h6>
                    <p class="card-text">${products[i].description}
                    <h6 class="card-rating">${products[i].rating} <i class="fa fa-star" aria-hidden="true"></i></h6></p>
                    
                    <h6 class="card-price">price: ${products[i].price}$</h6>
                    
                    <p class="btn btn-primary" onclick="addToCart(${products[i].id})">Add To Cart</p>
                    <p class="btn btn-secondary" onclick="singleProduct(${products[i].id})">Show Details</p>
                </div>
                `
        }
    }
}

//------------------------------------------------------------------------------------------------------------------------------------------
//CART!!!
//------------------------------------------------------------------------------------------------------------------------------------------

const fetchProductById = async (productId) => {
    const response = await fetch(`https://dummyjson.com/products/${productId}`)
    const product = await response.json()
    return product
}

let cart = [];

function addToCart(productId) {
    cart.push(productId)
    window.localStorage.setItem('cart', JSON.stringify(cart) );
    renderCart()
}

function removeFromCart(productId) {
    cart = cart.filter( (id) => id !== productId )
    window.localStorage.setItem('cart', JSON.stringify(cart));
    renderCart()
}

async function renderCart() {
    const response = await fetch(url);
    const data = await response.json();
    const products = data.products;
    hideEverything();

    if (cart.length === 0) { 
    container.innerHTML = '<div class="emptyCartDiv"><img class="emptyCartLogo" src="./images/emptyCart.jpg" title="Empty Cart" alt="Empty Cart"></div>';
    return
    }


    let totalPrice = 0
    const temp = []
    for (let i=0; i<cart.length; i++) {
    temp.push ( await fetchProductById(cart[i]) )
    totalPrice += temp[i].price
    }

    for (let i=0; i<cart.length; i++) {

        for (let i=0; i<products.length; i++) {
            for (let j=0; j<cart.length; j++) {
                if (products[i].id === cart[j]) {

                    const card = document.createElement('div');
                    container.appendChild(card);

                    card.innerHTML += `
                            <div class="card-body">
                                <img 
                                src="${products[i].thumbnail}" 
                                title="${products[i].title}" 
                                alt="${products[i].title}" 
                                class="card-img-top">

                                <h5 class="card-title">${products[i].title}</h5>
                                <h6 class="card-brand">${products[i].brand}</h6>
                                <p class="card-text">${products[i].description}</p>
                                <h6 class="card-price">price: ${products[i].price}$</h6>

                                <p class="btn btn-danger" onclick="removeFromCart(${products[i].id})">Delete</p>
                            </div>
                        `
                    }
                }
        }
    }
    container.innerHTML += `
    <br><br>
    <div class="card">
        <h5 class="card-header">Featured</h5>
        <div class="card-body">
            <h5 class="card-title">Total Price is:</h5>
            <p class="card-text"><h1>${totalPrice}$$</h1></p>
            <a href="#" class="btn btn-dark" onclick="alert('Next Time I Will Do This')">Go To Checkout</a>
        </div>
    </div>
`
    cartCounter.innerHTML = cart.length;
}

function loadCartFromLS() {

    const cartString = window.localStorage.getItem('cart');

    if (cartString) {
        cart = JSON.parse(cartString)
    } else {
        cart = []
    }

    renderCart()
}

loadCartFromLS();

 //------------------------------------------------------------------------------------------------------------------------------------------
//Open Product Page
 //------------------------------------------------------------------------------------------------------------------------------------------

const singleProduct = async (productID) => { 
    window.open(`product.html?id=${productID}`); //open in new tab and use query string
}

//------------------------------------------------------------------------------------------------------------------------------------------
//Open Log-In Page
//------------------------------------------------------------------------------------------------------------------------------------------
const logIn = async () => { 
    window.open(`../manageProduct/manageProductLogin.html`);
}

//------------------------------------------------------------------------------------------------------------------------------------------
//Filter By Brands
//------------------------------------------------------------------------------------------------------------------------------------------

const fetchBrands = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const products = data.products;
    
    const elmBrandsContainer = document.querySelector('#brandsContainer');
    let html = `
    <a id="brandsContainer" class="nav-link dropdown-toggle active" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Brands</a>
    <ul class="dropdown-menu">
    `;
    
    for (let i = 0; i < products.length; i++) {
        html += `<li><a class="dropdown-item" onclick="showProductByBrand('${products[i].brand}')">${products[i].brand}</a></li>`;
    }
    html += '</ul>';
    
    elmBrandsContainer.innerHTML = html;
};

const handleBrandChange = () => {
        const elmBrandsDropdown = document.querySelector('#brandsContainer');
        const brandName = elmBrandsDropdown.value;
        fetchAndDisplayProducts(url);
};

const showProductByBrand = async (brand) => {
    const response = await fetch(url);
    const data = await response.json();
    const products = data.products;

    hideEverything();

    for (let i=0; i<products.length; i++) {

    if (brand===products[i].brand) {
    
        const card = document.createElement('div');
        container.appendChild(card);
        
        card.innerHTML += `
                <div id="productNumber-${products[i].id}" class="card-body">
                    <img 
                    src="${products[i].thumbnail}" 
                    title="${products[i].title}" 
                    alt="${products[i].title}" 
                    class="card-img-top">

                    <h5 class="card-title">${products[i].title}</h5>
                    <h6 class="card-brand">${products[i].brand}</h6>
                    <h6 class="card-category">category: ${products[i].category}</h6>
                    <p class="card-text">${products[i].description}
                    <h6 class="card-rating">${products[i].rating} <i class="fa fa-star" aria-hidden="true"></i></h6></p>

                    <h6 class="card-price">price: ${products[i].price}$</h6>

                    <p class="btn btn-primary" onclick="addToCart(${products[i].id})">Add To Cart</p>
                    <p class="btn btn-secondary" onclick="singleProduct(${products[i].id})">Show Details</p>
                </div>
        `
        }
    }
}

 //------------------------------------------------------------------------------------------------------------------------------------------
 //Filter By High Recommendation
 //------------------------------------------------------------------------------------------------------------------------------------------

const showProductByRecommendation = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const products = data.products;
    
    hideEverything();

    for (let i=0; i<products.length; i++) {

    if (products[i].price<600 && products[i].rating>4.5) {
    
    const card = document.createElement('div');
    container.appendChild(card);
    
    card.innerHTML += `
            <div class="card-body">
                <img 
                src="${products[i].thumbnail}" 
                title="${products[i].title}" 
                alt="${products[i].title}" 
                class="card-img-top">
                
                <h5 class="card-title">${products[i].title}</h5>
                <h6 class="card-brand">${products[i].brand}</h6>
                <h6 class="card-category">category: ${products[i].category}</h6>
                <p class="card-text">${products[i].description}</p>
                <h6 class="card-rating">${products[i].rating} <i class="fa fa-star" aria-hidden="true"></i></h6></p>
                
                <h6 class="card-price">price: ${products[i].price}$</h6>
                
                <p class="btn btn-primary" onclick="addToCart(${products[i].id})">Add To Cart</p>
                <p class="btn btn-secondary" onclick="singleProduct(${products[i].id})">Show Details</p>
            </div>
            `
        }
}
}

//------------------------------------------------------------------------------------------------------------------------------------------
//Read Me Page
//------------------------------------------------------------------------------------------------------------------------------------------


const readME = () => {
    hideEverything();
    const card = document.createElement('div');
    container.appendChild(card);

    card.innerHTML += `
    <div class="card container">
        <div class="card-header">
            Read Me
        </div>
        <div class="card-body border-danger">
            <h5 class="card-title">Read Me Page</h5>
            <p class="card-text">
                I used BOOTSTRAP to save a lot of time working and coding HTML & CSS to spend the most time coding with JavaScript.
            </p>
            <p class="card-text active">
                The essence of the project is the use of the FETCH function and asynchronous work.
                The source of the database is "dummyjson.com/products" and from there work through basic design and use variables from
                the database to the page in a single page application configuration.
                <br><br>

                The most recommended tab refers to the combination of a high rating (4.5+) and a low price (-600)
            </p>
            <p class="btn btn-primary" onclick="showProductFromServer()">Back To The Shop</p>
            <p class="btn btn-danger" onclick="hideEverything()">Close Everything</p>
        </div>
    </div>`
}

//------------------------------------------------------------------------------------------------------------------------------------------
//Small Functions
//------------------------------------------------------------------------------------------------------------------------------------------

function troll() {
    alert("לחץ על הכפתורים למעלה לא עלי!!!");
}

function love() {
    alert("שם ואגדה לפניך!");
}

const hideEverything = () => {
    container.innerHTML ="";
}

//------------------------------------------------------------------------------------------------------------------------------------------