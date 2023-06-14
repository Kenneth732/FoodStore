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
        <main>
        <div class="containers">
           <div class="content-content">
              <div class='grid'>
                 <div class="item-holder">
                    <div class="item">
                      <img src="/assets/desert.png" />
                      <div class="label">label</div>
                    </div>
                </div>
                <div class="item-holder">
                    <div class="item">
                      <img src="/assets/desert.png" />
                      <div class="label">label</div>
                    </div>
                </div>
              </div>
           </div>
        </div>
    </main>
                `;
    })
    document.querySelector('#output').innerHTML = output;
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