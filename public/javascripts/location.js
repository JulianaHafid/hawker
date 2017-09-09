function initMap() {
  var uluru = {lat: 1.312482, lng: 103.837926};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
});
}
