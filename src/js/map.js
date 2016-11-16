/**
 * Created by mhi on 11/11/16.
 */
/**
 * Created by MHI on 06/10/2016.
 */
var markers=[];

var points = [
    [-24.96572,-53.41048, 4],
    [-24.96454,-53.40946, 5],
    [-24.96465,-53.40719, 3],
    [-24.96484,-53.40645, 2],
    [-24.96471,-53.40692, 1]
];


var image = 'images/Icons/Caminhao.png';

function addMarkers() {

    for (var i = 0; i < points.length; i++) {
        var point = points[i];
        markers[i]= new google.maps.Marker({
            position: {lat: point[0], lng: point[1]},
            draggable:false,
            zIndex: point[2],
            icon: image
        });
    }
}

function initMap() {

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: {lat: -24.96454, lng: -53.40946}
    });

    addMarkers();

    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }


}