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
  