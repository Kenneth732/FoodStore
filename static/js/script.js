function initMap() {
    // Create a new map instance
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.7128, lng: -74.0060 }, // Set the initial map center coordinates
        zoom: 12, // Set the initial zoom level
    });
}

// Load the Google Maps API asynchronously
function loadScript() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=8fc1466c5amsh955a2ac503f2736p1a82dbjsn125112e0993f&callback=initMap`;
    document.head.appendChild(script);
}

// Call the loadScript function to load the API
loadScript();

let form = document.querySelector('#form');
let btn = document.querySelector('#btn');
let itemData = [];

let cartItems = [];
let totalPrice = 0;

function addToCart(event) {
  const itemId = event.target.dataset.id;
  const itemPrice = parseFloat(event.target.dataset.price);

  // Check if the item is already in the cart
  const itemInCart = cartItems.find(item => item.id === itemId);
  if (itemInCart) {
    // If the item is already in the cart, increase its quantity by 1
    itemInCart.quantity++;
  } else {
    // If the item is not in the cart, add it with a quantity of 1
    const newItem = {
      id: itemId,
      quantity: 1,
    };
    cartItems.push(newItem);
  }

  // Add the price of the item to the total price
  totalPrice += itemPrice;

  // Update the UI with the updated cart information
  updateCartUI();
}

function updateCartUI() {
  // Update the cart display
  document.querySelector('#cart-items').textContent = cartItems.length;
  document.querySelector('#total-price').textContent = `$${totalPrice.toFixed(2)}`;
}


function handleFetch() {

        fetch('http://localhost:3000/foodData')
        .then(res => res.json())
        .then((data) => {
            userData = data;
            handleRender(userData);
        })    
}

function handleRender(items) {
  let output = '';
  items.map(item => {
    output += `
      <div class="cardx">
        <div class="card-img">
          <img src='${item.img}' class='items' />
        </div>
        <div class="card-info">
          <p class="text-title">${item.title}</p>
          <p class="text-body">${item.description}</p>
        </div>
        <div class="card-footer">
          <span class="text-title">$${item.price}</span>
          <div class="card-button">
            <button class="add-to-cart" data-id="${item.id}" data-price="${item.price}">Add to Cart</button>
          </div>
        </div>
      </div>
    `;
  })
  document.querySelector('#output').innerHTML = output;

  // Add event listeners to the "Add to Cart" buttons
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
  });
}

function searchItem(){

    let itemToSearch = document.querySelector('searchInput').value.toLowerCase()
    let findItem = userData.filter(item => item.toLowerCase().includes(itemToSearch))
    handleRender(findItem);
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    searchItem();
})
handleFetch();


