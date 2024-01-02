'use strict'

const productContainer = document.querySelector('#productContainer');


const singleProduct = async (id) => {
    
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        const products = data.products;
        
        const layer = document.createElement('div');
        productContainer.appendChild(layer);

        document.title = data.title;
        
        let html = `
        
        <section class="py-5">
        <div class="container px-4 px-lg-5 my-5">
            <div class="row gx-4 gx-lg-5 align-items-center">
                <div class="col-md-6">
                    <img class="card-img-top mb-5 mb-md-0" src="${data.thumbnail}"
                        alt="${data.title}"
                        title="${data.title}"/>
                </div>

                <div class="col-md-6">
                    <h1 class="display-5 fw-bolder">${data.title}</h1>
                    <div class="fs-5 mb-5">
                        <span>${data.price} $</span>
                        <span class="text-decoration-line-through">${data.discountPercentage}%
                        off</span>
                    </div>
                    <p class="lead">
                        ${data.description}
                    </p>
                    <div class="d-flex">
                        <button class="btn btn-outline-dark flex-shrink-0" type="button" onclick="addToCart(${data.id})">
                            <i class="bi-cart-fill me-1"></i>
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row row-cols-1 row-cols-md-3 g-4">
        `
    
        for (let i=0; i<data.images.length; i++){
            html += `
            <div class="col">
                <div class="card h-100">
                    <img class="card-img-top IMAGES" src="${data.images[i]}" title="${data.title}" alt="${data.title}" />
                </div>
            </div>`
        }
    html += `</div></section>`
    layer.innerHTML = html;
}

//query string and URL using

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const productID = urlParams.get('id');

singleProduct(productID);









