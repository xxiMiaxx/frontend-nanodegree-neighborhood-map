var map;
// we craete a class to instaniate all of the places
function place(name, coordin, img, visible, catagory) {
    var self = this;
    self.name = ko.observable(name);
    self.coordin = ko.observable(coordin);
    self.img = ko.observable(img);
    self.visible = ko.observable(visible);
    // google maps marker
    self.markerObject = null;
}


function viewModel() {
    var self = this;
    // array of all the places
    self.places = ko.observableArray([
        new place(
            "Kingdom Centre", {
                lat: 24.7111837,
                lng: 46.67340100000001
            },
            "img/Kingdom_Center_.jpg",
            true,
            "mall hotel office"),
        new place(
            "Al Faisaliyah Center", {
                lat: 24.6905765,
                lng: 46.68509700000004
            },
            "img/faisaleh.jpg",
            true,
            "mall hotel office"),
        new place(
            "Burj Rafal", {
                lat: 24.7925009,
                lng: 46.632335799999964
            },
            "img/Projects-Rafal-02.jpg",
            true,
            "hotel lunch dinner"),
        new place(
            "KAFD World Trade Center", {
                lat: 24.76195599999999,
                lng: 46.64043370000002
            },
            "img/1stGrade-Panora Park- Financial Plaza (22)PhotoGala.jpg",
            true,
            "mall hotel offices office company"),
        new place(
            "Nakheel Tower", {
                lat: 24.7488774,
                lng: 46.65273419999994
            },
            "img/70659410.jpg",
            true,
            "hotel")
    ]);
    // getting the input from the input box
    self.filterString = ko.observable('');

    self.submit = function () {
      var filterString =  self.filterString();
        for (var i = 0; i < self.places().length; i++) {
            var name = self.places()[i].name();
            self.places()[i].visible((name.indexOf(filterString) > -1) ? true : false);
        }
        undoMarker(filterString); //doing/undoing based on marker visible value
        infoWindow.close();
    };

    self.listClick = function (location) {
        //loop in the markers array to match marker with location
        for (var i = 0; i < markers.length; i++) {
            if (markers[i].loc == location) {
                markers[i].setAnimation(4);
                popUpInfoWindow(location);
            }
        }
    };

} //end
// erasing markers once filtered
function undoMarker(filterString) {
    for (var i = 0; i < markers.length; i++) {
        var name = markers[i].loc.name();
        if (name.indexOf(filterString) > -1) {
            markers[i].setVisible(true);
        } else {
            markers[i].setVisible(false);
        }
    }
}
//knockoutbinding with index.html
ko.applyBindings(new viewModel());
// google map error function
function mapError() {
    alert('Google Maps is temporairly unavailable. Try again later');
}
var markers = [];
var vm = ko.dataFor(document.body);

function initMap() {
    infoWindow = new google.maps.InfoWindow({
        content: 'emptyStringHypothatically'
    });
    var mapElemnt = document.getElementById('googleMap');
    var uluru = {
        lat: 24.7135517,
        lng: 46.67529569999999
    };
    //set where we want the map to be
    map = new google.maps.Map(mapElemnt, {
        center: uluru,
        zoom: 13,
        mapTypeControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM
        }
    });
    //creating markers for every place
    for (var i = 0; i < vm.places().length; i++) {
        var loc = vm.places()[i];
        var marker = new google.maps.Marker({
            position: loc.coordin(),
            map: map,
            loc: loc,
            animation: null
        });
        loc.markerObject = marker;
        marker.addListener('click', onClickMarker); // when a marker is clicked run the function that animates
        markers.push(marker);
    }

}
// a function that animates what happens when a marker is clicked
function onClickMarker() {
    var self = this;
    self.setAnimation(4);
    popUpInfoWindow(self.loc);
}

var infoWindow = null;

function popUpInfoWindow(loc) {
    var name = loc.name();
    var img = loc.img();

    infoWindow.close();
    // in case of WIKI API error
    var wikiError = setTimeout(function () {
        //error message
        infoWindow.setContent("<p>ERROR !! wiki content out of service</p>");
        infoWindow.open(map, loc.markerObject);
    }, 5000);

    // wiki API
    $.ajax({
        dataType: "jsonp",
        url: "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=" + name,
        success: function (data) {
            var Article = data.query.pages;
            // we need articales first key so
            for (var firstKey in Article)
                break;
            // to get the first paragraph of the Article
            var extract = Article[firstKey].extract;
            //display the paragraph above a marker
            infoWindow.setContent('<div class="info"><div class="info-text"><p class="title">' + name + '</p><p class="address">' + extract + '</p></div><div class="bus-img"><img src="' + img + '" alt="place img"></div>');
            infoWindow.open(map, loc.markerObject);
            clearTimeout(wikiError);
        }
    });
} //end popup
