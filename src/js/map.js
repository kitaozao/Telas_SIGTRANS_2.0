/**
 * Created by natal on 16/11/16.
 */

var map,
    cascavel = {lat: -24.9554503, lng: -53.4552361},
    heatmap;

/**
 * The CenterControl adds a control to the map that recenters the map on
 * Chicago.
 * @constructor
 * @param {!Element} controlDiv
 * @param {!google.maps.Map} map
 * @param {?google.maps.LatLng} center
 */
function MapControl(controlDiv, map, center) {

    var control = this;

    // Set the center property upon construction
    control.center_ = center;
    controlDiv.style.clear = 'both';

    // Set CSS for the control border
    var goCenterUI = document.createElement('div');
    goCenterUI.id = 'goCenterUI';
    goCenterUI.title = 'Click to recenter the map';
    controlDiv.appendChild(goCenterUI);

    // Set CSS for the toggleHeatmap control border
    var toggleHmUI = document.createElement('div');
    toggleHmUI.id = 'toggleHmUI';
    toggleHmUI.title = 'Clique para mostrar o mapa de calor';
    controlDiv.appendChild(toggleHmUI);

    // Set CSS for the control interior
    var goCenterText = document.createElement('div');
    goCenterText.id = 'goCenterText';
    goCenterText.innerHTML = 'Center';
    goCenterUI.appendChild(goCenterText);


    // Set CSS for the control interior
    var toggleHmText = document.createElement('div');
    toggleHmText.id = 'toggleHmText';
    toggleHmText.innerHTML = 'Heatmap';
    toggleHmUI.appendChild(toggleHmText);

    // Setup the click event listeners: simply set the map to Chicago.
    // Set up the click event listener for 'Center Map': Set the center of the map
    // to the current center of the control.

    goCenterUI.addEventListener('click', function() {
        var currentCenter = control.getCenter();
        map.setCenter(currentCenter);
        map.setZoom(13);
    });

    // Set up the click event listener for 'Set Center': Set the center of the
    // control to the current center of the map.
    toggleHmUI.addEventListener('click', function() {
        // var newCenter = map.getCenter();
        control.toggleHeatmap();
    });

};

/**
 * Define a property to hold the center state.
 * @private
 */
MapControl.prototype.center_ = null;

/**
 * Gets the map center.
 * @return {?google.maps.LatLng}
 */
MapControl.prototype.getCenter = function() {
    return this.center_;
};

/**
 * Sets the map center.
 * @param {?google.maps.LatLng} center
 */
MapControl.prototype.setCenter = function(center) {
    this.center_ = center;
};

MapControl.prototype.toggleHeatmap = function() {
    heatmap.setMap(heatmap.getMap() ? null : map);
};

function initMap(){

    var mapOptions = {
        center          : cascavel,
        zoom            : 13,
        mapTypeControl  : true,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    };

    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    var controlButtons = document.createElement('div');
    var controlFunc = new MapControl(controlButtons, map, cascavel);

    controlButtons.index = 1;
    controlButtons.style['padding-top'] = '10px';
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(controlButtons);

    heatmap = new google.maps.visualization.HeatmapLayer({
        data: getPoints(),
        map: map
    });

    function getPoints() {
        return [
            //14 Novembro
            new google.maps.LatLng(-24.971415, -53.488866),
            new google.maps.LatLng(-24.967748, -53.484577),
            new google.maps.LatLng(-24.965997, -53.506810),
            new google.maps.LatLng(-24.953055, -53.499274),
            new google.maps.LatLng(-24.955024, -53.471808),
            new google.maps.LatLng(-24.955157, -53.453813),
            new google.maps.LatLng(-24.969280, -53.465208),
            new google.maps.LatLng(-24.973284, -53.455041),
            new google.maps.LatLng(-24.986769, -53.449808),
            new google.maps.LatLng(-24.964469, -53.405695),
            new google.maps.LatLng(-24.965939, -53.404125),
            new google.maps.LatLng(-24.948662, -53.417848),
            new google.maps.LatLng(-24.933603, -53.433630),
            new google.maps.LatLng(-24.928224, -53.433669),
            new google.maps.LatLng(-24.924567, -53.437974),
            new google.maps.LatLng(-24.926907, -53.442167),
            new google.maps.LatLng(-24.937246, -53.443750),
            new google.maps.LatLng(-24.971561, -53.454853),
            new google.maps.LatLng(-24.986519, -53.446694),
            new google.maps.LatLng(-24.989768, -53.453266),
            new google.maps.LatLng(-24.964425, -53.466590),
            new google.maps.LatLng(-24.961530, -53.464795),
            new google.maps.LatLng(-24.961058, -53.454130),
            new google.maps.LatLng(-24.951947, -53.448216),
            new google.maps.LatLng(-24.945199, -53.438322),
            new google.maps.LatLng(-24.945027, -53.433655),
            new google.maps.LatLng(-24.946035, -53.448111),
            new google.maps.LatLng(-24.964574, -53.431578),
            new google.maps.LatLng(-24.954547, -53.432703),
            new google.maps.LatLng(-24.970973, -53.443998),
            new google.maps.LatLng(-24.972460, -53.454863),
            new google.maps.LatLng(-24.963393, -53.454354),
            new google.maps.LatLng(-24.979791, -53.469987),
            new google.maps.LatLng(-24.975431, -53.470735),
            new google.maps.LatLng(-24.965104, -53.469980),
            new google.maps.LatLng(-24.982250000000000,-53.480469999999800),
            new google.maps.LatLng(-24.981137, -53.478901),
            new google.maps.LatLng(-24.989415, -53.481123),
            new google.maps.LatLng(-24.989998, -53.483730),
            new google.maps.LatLng(-24.988578, -53.482615),
            new google.maps.LatLng(-24.987004, -53.475764),
            new google.maps.LatLng(-24.984982, -53.480235),
            new google.maps.LatLng(-24.976482, -53.470794),
            new google.maps.LatLng(-24.973331, -53.470644),
            new google.maps.LatLng(-24.971604, -53.466005),
            new google.maps.LatLng(-24.970452, -53.465899),
            new google.maps.LatLng(-24.970264, -53.470436),
            new google.maps.LatLng(-24.962647, -53.464824),
            new google.maps.LatLng(-24.959320, -53.460693),
            new google.maps.LatLng(-24.956655, -53.458461),
            new google.maps.LatLng(-24.956655, -53.458461),
            new google.maps.LatLng(-24.951619, -53.455233),
            new google.maps.LatLng(-24.948073, -53.453881),
            new google.maps.LatLng(-24.946278, -53.455061),
            new google.maps.LatLng(-24.943921, -53.463529),
            new google.maps.LatLng(-24.943649, -53.467778),
            new google.maps.LatLng(-24.943469, -53.471340),
            new google.maps.LatLng(-24.943304, -53.473775),
            new google.maps.LatLng(-24.942695, -53.482579),
            new google.maps.LatLng(-24.949369, -53.490378),
            new google.maps.LatLng(-24.985699, -53.443639),
            new google.maps.LatLng(-24.982957, -53.443843),
            new google.maps.LatLng(-24.970933, -53.442863),
            new google.maps.LatLng(-24.965564, -53.449987),
            new google.maps.LatLng(-24.994340000000000,-53.478789999999800),
            new google.maps.LatLng(-24.987040000000000,-53.477409999999900),
            new google.maps.LatLng(-24.991330000000000,-53.479869999999800),
            new google.maps.LatLng(-24.989791300000000,-53.484327399999800),
            new google.maps.LatLng(-24.990718099999800,-53.478809900000000)
            //14 novembro
        ];
    };

};



