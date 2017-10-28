var map;
  // we craete a class to instaniate all of the places



function viewModel() {
  var self= this;
  self.places = ko.observableArray([
    new place(
			"Kingdom Centre",
			{lat: 24.7111837, lng: 46.67340100000001},
			"img/Kingdom_Center_.jpg",
			true),
		new place(
			"Al Faisaliyah Center",
			{lat: 24.6905765, lng: 46.68509700000004},
			"img/faisaleh.jpg",
			true),
		new place(
			"Burj Rafal",
			{lat: 24.7925009, lng: 46.632335799999964},
			"img/Projects-Rafal-02.jpg",
			true),
		new place(
			"KAFD World Trade Center",
			{lat: 24.76195599999999, lng: 46.64043370000002},
			"img/1stGrade-Panora Park- Financial Plaza (22)PhotoGala.jpg",
			true),
		new place(
			"Nakheel Tower",
			{lat: 24.7488774, lng: 46.65273419999994},
			"img/70659410.jpg",
			true)
  ]);
  self.filter
}//end

// google map error function
  function mapError(){
    alert('Google Maps is temporairly unavailable. Try again later');
  }

  function initMap(){
    var mapElemnt = document.getElementById('googleMap');
    var uluru = {lat: 24.7135517, lng: 46.67529569999999};
    map = new google.maps.Map(mapElemnt, {
      center: uluru,
      zoom: 13,
      mapTypeControlOptions: {
        position: google.maps.ControlPosition.LEFT_BOTTOM
      }
    });

  }

  function place(name, coordin, img, visible){
    var self = this;
    self.name= ko.observable(name);
    self.coordin = ko.observable(coordin);
    self.img = ko.observable(img);
    self.visible = ko.observable(visible);
    // google maps marker
    self.marker = null;
  }



  // creating a marker for the place
  function addMarker(place){
    var marker = new google.maps.Marker({
      position: place.coordin,
      map: map,
      animation: null
    });


  var infoWindow = new google.maps.InfoWindow({
    content: '<div class="info"><div class="info-text"><p class="title">'+place.wikiTitle+'</p><p class="address">'+place.name+'</p></div><div class="bus-img"><img src="'+place.img+'" alt="place img"></div>'
  });

  //click listener
  marjer.addListener('click', function(){
    places().forEach(function(place){
      place.infoWindow.close();
    });
    infoWindow.open(map, marker);
    toggleBounce(marker);
    setTimeout(function(){
      marker.setAnimation(null);
    }, 700);
  });

  // adding the info window and marker to the place
  place.infoWindow = infoWindow;
  place.marker= marker;
}

//animation function for marker
function toggleBounce(m){
  if(m.getAnimation() !== null){
    m.setAnimation(null);
  } else {
    m.setAnimation(google.maps.Animation.BOUNCE)
  }
}
