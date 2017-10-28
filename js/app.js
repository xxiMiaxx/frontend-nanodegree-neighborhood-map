var map;
  // we craete a class to instaniate all of the places
  function places(name, address){
    var place = this;
    place.name = name;
    place.address= address;
    // place.
  }


// var data = [{
//   name: "",
//   address: {
//     lanttitude:
//     longitude:
//   }
// },
// {
//   name: "",
//   address: {
//     lanttitude:
//     longitude:
//   }
// },
// {
//   name: "",
//   address: {
//     lanttitude:
//     longitude:
//   }
// },
// {
//   name: "",
//   address: {
//     lanttitude:
//     longitude:
//   }
// },
// {
//   name: "",
//   address: {
//     lanttitude:
//     longitude:
//   }
// }];
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

  function place(name, coordin, wikiTitle, visible){
    var self = this;
    self.name= ko.observable(name);
    self.coordin = ko.observable(coordin);
    self.wikiTitle = ko.observable(wikiTitle);
    self.visible = ko.observable(visible);
    // google maps marker
    self.marker = null;
  }
