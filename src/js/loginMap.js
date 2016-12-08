/**
 * Created by mhi on 18/11/16.
 */
var points =[];
var imagens=[];
var truck=[];
var cars=[];
var motorcicle=[];
var bicicle=[];
var marker;
var map;


var Caminhao = [
    [2,-24.971415, -53.488866],
    [1,-24.967748, -53.484577],
    [1,-24.965997, -53.506810],
    [1,-24.953055, -53.499274],
    [2,-24.955024, -53.471808],
    [1,-24.955157, -53.453813],
    [3,-24.969280, -53.465208],
    [3,-24.973284, -53.455041],
    [0,-24.986769, -53.449808],
    [3,-24.964469, -53.405695],
    [3,-24.965939, -53.404125],
    [0,-24.948662, -53.417848],
    [0,-24.933603, -53.433630],
    [2,-24.928224, -53.433669],
    [2,-24.924567, -53.437974],
    [2,-24.926907, -53.442167],
    [1,-24.937246, -53.443750]
];

var Carros=[
    [2,-24.945027, -53.433655],
    [3,-24.946035, -53.448111],
    [0,-24.964574, -53.431578],
    [2,-24.954547, -53.432703],
    [0,-24.970973, -53.443998],
    [1,-24.972460, -53.454863],
    [3,-24.963393, -53.454354],
    [1,-24.979791, -53.469987],
    [2,-24.975431, -53.470735],
    [0,-24.965104, -53.469980]
];

var Motos = [
    [1,-24.981137, -53.478901],
    [0,-24.989415, -53.481123],
    [3,-24.989998, -53.483730],
    [1,-24.988578, -53.482615],
    [3,-24.987004, -53.475764],
    [0,-24.984982, -53.480235],
    [1,-24.976482, -53.470794],
    [1,-24.973331, -53.470644],
    [1,-24.971604, -53.466005],
    [3,-24.970452, -53.465899],
    [1,-24.970264, -53.470436],
    [1,-24.962647, -53.464824],
    [1,-24.959320, -53.460693],
    [2,-24.956655, -53.458461],
    [3,-24.956655, -53.458461],
    [2,-24.951619, -53.455233],
    [2,-24.948073, -53.453881],
    [2,-24.946278, -53.455061],
    [1,-24.943921, -53.463529],
    [1,-24.943649, -53.467778],
    [2,-24.943469, -53.471340],
    [3,-24.943304, -53.473775],
    [0,-24.942695, -53.482579],
    [3,-24.949369, -53.490378],
    [3,-24.985699, -53.443639],
    [3,-24.982957, -53.443843],
    [3,-24.970933, -53.442863],
    [2,-24.965564, -53.449987]
];

var Bicicleta =[

    [3,-24.971561, -53.454853],
    [3,-24.986519, -53.446694],
    [0,-24.989768, -53.453266],
    [2,-24.964425, -53.466590],
    [3,-24.961530, -53.464795],
    [3,-24.961058, -53.454130],
    [0,-24.951947, -53.448216],
    [1,-24.945199, -53.438322]
];

function addMarkers(points,imagem,markers) {

    for (var i = 0; i < points.length; i++) {
        var point = points[i];
        markers[i]= new google.maps.Marker({
            position: {lat: point[1], lng: point[2]},
            draggable:false,
            icon : imagem,
            setDraggable: false
        });

    }
}


function loginMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: {lat: -24.9554503, lng: -53.4552361},
        mapTypeControl  : true,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    });

    imagens[0]={
        url: '../production/images/Icons/Caminhao.png'
    };
    imagens[1]={
        url: '../production/images/Icons/Carro.png'
    };
    imagens[2]={
        url: '../production/images/Icons/Moto.png'
    };
    imagens[3]={
        url: '../production/images/Icons/Bicicleta.png'
    };

    addMarkers(Caminhao,imagens[0],truck);
    addMarkers(Carros,imagens[1],cars);
    addMarkers(Motos,imagens[2],motorcicle);
    addMarkers(Bicicleta,imagens[3],bicicle);


    for(var i=0; i<truck.length;i++ ){
        truck[i].setMap(map);
    }
    for(var i=0; i<cars.length;i++ ){
        cars[i].setMap(map);
    }
    for(var i=0; i<motorcicle.length;i++ ){
        motorcicle[i].setMap(map);
    }
    for(var i=0; i<bicicle.length;i++ ){
        bicicle[i].setMap(map);
    }

}



