'use strict'

// Global Variables

let products = []
let urlGetAllProducts = 'https://dummyjson.com/products?limit=100'

// DOM Refs

const elmTitle = document.querySelector('#title')
const elmPrice = document.querySelector('#price')
const elmBrand = document.querySelector('#brand')
const elmStock = document.querySelector('#stock')

const elmProductsList = document.querySelector('#products-list')
const elmAddProductPanel = document.querySelector('#add-product-panel')
const elmUpdateProductPanel = document.querySelector('#update-product-panel')

// Events

document.addEventListener('DOMContentLoaded', () => fetchAndDisplayProducts() )

// Core Function

const fetchAndDisplayProducts = async () => {
  products = await fetchAllProducts()
  displayProducts()
}

const fetchAllProducts = async () => {
  const response = await fetch(urlGetAllProducts)
  const data = await response.json()
  return data.products
}

const beforeAddProduct = async () => {

  toggleDisableButtons()

  const title = document.querySelector('#add-product-input-title')
  const price = document.querySelector('#add-product-input-price')
  const stock = document.querySelector('#add-product-input-stock')

  await addProduct(
    title.value,
    parseFloat(price.value),
    )

  toggleDisableButtons()

  title.value = ''
  price.value = ''
  stock.value = ''

  hideAddProductPanel()
}

const beforeUpdateProduct = async () => {
  toggleDisableButtons()

  const id = document.querySelector('#update-product-input-id')
  const title = document.querySelector('#update-product-input-title')
  const price = document.querySelector('#update-product-input-price')
  const stock = document.querySelector('#update-product-input-stock')

  await updateProduct(
    parseInt(id.value),
    title.value,
    parseFloat(price.value),
    parseFloat(stock.value),
    )

  toggleDisableButtons()

  id.value = ''
  title.value = ''
  price.value = ''
  stock.value = ''

  hideUpdateProductPanel()

  afterUpdateProduct()
}

const afterUpdateProduct = () => {
  fetchAndDisplayProducts()
}

const displayAndPopulateUpdatePanel = async (productId) => {
  showUpdateProductPanel()
  const response = await fetch(`https://dummyjson.com/products/${productId}`)
  const data = await response.json()
  document.querySelector('#update-product-input-id').value = data.id
  document.querySelector('#update-product-input-title').value = data.title
  document.querySelector('#update-product-input-price').value = data.price
  document.querySelector('#update-product-input-stock').value = data.stock
}

const displayProducts = () => {
  let html =
      `
      <div class="products-header">
        <div class="fake-h3">Products List</div>
        <div style="cursor: pointer" class="addButton" onclick="showAddProductPanel()">➕</div>
      </div>
      <table>
          <tr id="mainLine">
              <th id="mainTitle">ID</th>
              <th id="mainTitle">Title</th>
              <th id="mainTitle">Brand</th>
              <th id="mainTitle">Price</th>
              <th id="mainTitle">Stock</th>
              <th id="mainTitle">Delete</th>
              <th id="mainTitle">Update</th>
          </tr>`;
  for (let i=0; i<products.length; i++) {
    html += `
    <tr>
      <th>${products[i].id}</th>
      <th class="titleTh">${products[i].title}</th>
      <th>${products[i].brand}</th>
      <th>${products[i].price}</th>
      <th>${products[i].stock}</th>
      <th onclick="beforeDeleteProduct(event,${products[i].id})">🗑️</th>
      <th onclick="displayAndPopulateUpdatePanel(${products[i].id})">🖊️</th>
    </tr>
    `
  }
  html += '</table>';
  elmProductsList.innerHTML = html;
}

//----------

const beforeDeleteProduct = async (e, productId) => {
  e.stopPropagation()
  await deleteProduct(productId)
  fetchAndDisplayProducts()
}

// ----------

const toggleDisableButtons = () => {
  const allButtons = document.querySelectorAll('button')
  allButtons.forEach((button)=>{
    button.toggleAttribute('disabled')
  })
}

// --

const showAddProductPanel = () => {
  elmAddProductPanel.classList.remove('hidden')
}

const hideAddProductPanel = () => {
  elmAddProductPanel.classList.add('hidden')
}

const showUpdateProductPanel = () => {
  elmUpdateProductPanel.classList.remove('hidden')
}

const hideUpdateProductPanel = () => {
  elmUpdateProductPanel.classList.add('hidden')
}

//-----------------------------------------------------------------------------------------

const getProduct = async () => {
  const response = await fetch('https://dummyjson.com/products/1',{method:'GET'})
  const data = await response.json()
  console.log(data)
}

//-----------------------------------------------------------------------------------------

const deleteProduct = async (productId) => {
  const response = await fetch(`https://dummyjson.com/products/${productId}`,{method:'DELETE'})
  const data = await response.json()
  console.log(data)
}

// ----------------------------------------------------------------------------------------

const addProduct = async (title, price, stock) => {

  const productToAdd = {
    title: title,
    price: price,
    stock: stock,
  }
  
  const addOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify( productToAdd )
  }

  const response = await fetch('https://dummyjson.com/products/add', addOptions)
  const data = await response.json()
  console.log(data)
}

//-----------------------------------------------------------------------------------------

const updateProduct = async (id, title, price, stock) => {

  const updatesToProduct = {
    title: title,
    price: price,
    stock: stock,
    /* other product data */
  }
  
  const updateOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify( updatesToProduct )
  }

  const response = await fetch(`https://dummyjson.com/products/${id}`, updateOptions)
  const data = await response.json()
  console.log(data)
}

//-----------------------------------------------------------------------------------------