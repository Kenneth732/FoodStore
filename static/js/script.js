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

// function handleRender(items) {
//     let output = '';
//     items.map(item => {
//         output += `
//         <div class="cardx">
//         <div class="card-img">
//         <img src='${item.img}' class='items' />
//         </div>
//         <div class="card-info">
//           <p class="text-title">Product title </p>
//           <p class="text-body">Product description and details</p>
//         </div>
//         <div class="card-footer">
//         <span class="text-title">$499.49</span>
//         <div class="card-button">
//           <svg class="svg-icon" viewBox="0 0 20 20">
//             <path  d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"></path>
//             <path d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"></path>
//             <path d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"></path>
//           </svg>
//         </div>
//       </div></div>
//                 `;
//     })
//     document.querySelector('#output').innerHTML = output;
// }

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


