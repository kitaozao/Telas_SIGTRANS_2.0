/**
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var CURRENT_URL = window.location.href.split('?')[0],
    $BODY = $('body'),
    $MENU_TOGGLE = $('#menu_toggle'),
    $SIDEBAR_MENU = $('#sidebar-menu'),
    $SIDEBAR_FOOTER = $('.sidebar-footer'),
    $LEFT_COL = $('.left_col'),
    $RIGHT_COL = $('.right_col'),
    $NAV_MENU = $('.nav_menu'),
    $FOOTER = $('footer');

// Sidebar
$(document).ready(function() {
    // TODO: This is some kind of easy fix, maybe we can improve this
    var setContentHeight = function () {
        // reset height
        $RIGHT_COL.css('min-height', $(window).height());

        var bodyHeight = $BODY.outerHeight(),
            footerHeight = $BODY.hasClass('footer_fixed') ? 0 : $FOOTER.height(),
            leftColHeight = $LEFT_COL.eq(1).height() + $SIDEBAR_FOOTER.height(),
            contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

        // normalize content
        contentHeight -= $NAV_MENU.height() + footerHeight;

        $RIGHT_COL.css('min-height', contentHeight);
    };

    $SIDEBAR_MENU.find('a').on('click', function(ev) {
        var $li = $(this).parent();

        if ($li.is('.active')) {
            $li.removeClass('active active-sm');
            $('ul:first', $li).slideUp(function() {
                setContentHeight();
            });
        } else {
            // prevent closing menu if we are on child menu
            if (!$li.parent().is('.child_menu')) {
                $SIDEBAR_MENU.find('li').removeClass('active active-sm');
                $SIDEBAR_MENU.find('li ul').slideUp();
            }
            
            $li.addClass('active');

            $('ul:first', $li).slideDown(function() {
                setContentHeight();
            });
        }
    });

    // toggle small or large menu
    $MENU_TOGGLE.on('click', function() {
        if ($BODY.hasClass('nav-md')) {
            $SIDEBAR_MENU.find('li.active ul').hide();
            $SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
        } else {
            $SIDEBAR_MENU.find('li.active-sm ul').show();
            $SIDEBAR_MENU.find('li.active-sm').addClass('active').removeClass('active-sm');
        }

        $BODY.toggleClass('nav-md nav-sm');

        setContentHeight();
    });

    // check active menu
    $SIDEBAR_MENU.find('a[href="' + CURRENT_URL + '"]').parent('li').addClass('current-page');

    $SIDEBAR_MENU.find('a').filter(function () {
        return this.href == CURRENT_URL;
    }).parent('li').addClass('current-page').parents('ul').slideDown(function() {
        setContentHeight();
    }).parent().addClass('active');

    // recompute content when resizing
    $(window).smartresize(function(){  
        setContentHeight();
    });

    setContentHeight();

    // fixed sidebar
    if ($.fn.mCustomScrollbar) {
        $('.menu_fixed').mCustomScrollbar({
            autoHideScrollbar: true,
            theme: 'minimal',
            mouseWheel:{ preventDefault: true }
        });
    }
});
// /Sidebar

// Panel toolbox
$(document).ready(function() {
    $('.collapse-link').on('click', function() {
        var $BOX_PANEL = $(this).closest('.x_panel'),
            $ICON = $(this).find('i'),
            $BOX_CONTENT = $BOX_PANEL.find('.x_content');
        
        // fix for some div with hardcoded fix class
        if ($BOX_PANEL.attr('style')) {
            $BOX_CONTENT.slideToggle(200, function(){
                $BOX_PANEL.removeAttr('style');
            });
        } else {
            $BOX_CONTENT.slideToggle(200); 
            $BOX_PANEL.css('height', 'auto');  
        }

        $ICON.toggleClass('fa-chevron-up fa-chevron-down');
    });

    $('.close-link').click(function () {
        var $BOX_PANEL = $(this).closest('.x_panel');

        $BOX_PANEL.remove();
    });
});
// /Panel toolbox

// Tooltip
$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip({
        container: 'body'
    });
});
// /Tooltip

// Progressbar
if ($(".progress .progress-bar")[0]) {
    $('.progress .progress-bar').progressbar();
}
// /Progressbar

// Switchery
$(document).ready(function() {
    if ($(".js-switch")[0]) {
        var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
        elems.forEach(function (html) {
            var switchery = new Switchery(html, {
                color: '#26B99A'
            });
        });
    }
});
// /Switchery

// iCheck
$(document).ready(function() {
    if ($("input.flat")[0]) {
        $(document).ready(function () {
            $('input.flat').iCheck({
                checkboxClass: 'icheckbox_flat-green',
                radioClass: 'iradio_flat-green'
            });
        });
    }
});
// /iCheck

// Table
$('table input').on('ifChecked', function () {
    checkState = '';
    $(this).parent().parent().parent().addClass('selected');
    countChecked();
});
$('table input').on('ifUnchecked', function () {
    checkState = '';
    $(this).parent().parent().parent().removeClass('selected');
    countChecked();
});

var checkState = '';

$('.bulk_action input').on('ifChecked', function () {
    checkState = '';
    $(this).parent().parent().parent().addClass('selected');
    countChecked();
});
$('.bulk_action input').on('ifUnchecked', function () {
    checkState = '';
    $(this).parent().parent().parent().removeClass('selected');
    countChecked();
});
$('.bulk_action input#check-all').on('ifChecked', function () {
    checkState = 'all';
    countChecked();
});
$('.bulk_action input#check-all').on('ifUnchecked', function () {
    checkState = 'none';
    countChecked();
});

function countChecked() {
    if (checkState === 'all') {
        $(".bulk_action input[name='table_records']").iCheck('check');
    }
    if (checkState === 'none') {
        $(".bulk_action input[name='table_records']").iCheck('uncheck');
    }

    var checkCount = $(".bulk_action input[name='table_records']:checked").length;

    if (checkCount) {
        $('.column-title').hide();
        $('.bulk-actions').show();
        $('.action-cnt').html(checkCount + ' Records Selected');
    } else {
        $('.column-title').show();
        $('.bulk-actions').hide();
    }
}

// Accordion
$(document).ready(function() {
    $(".expand").on("click", function () {
        $(this).next().slideToggle(200);
        $expand = $(this).find(">:first-child");

        if ($expand.text() == "+") {
            $expand.text("-");
        } else {
            $expand.text("+");
        }
    });
});

// NProgress
if (typeof NProgress != 'undefined') {
    $(document).ready(function () {
        NProgress.start();
    });

    $(window).load(function () {
        NProgress.done();
    });
}
/**
 * Resize function without multiple trigger
 * 
 * Usage:
 * $(window).smartresize(function(){  
 *     // code here
 * });
 */
(function($,sr){
    // debouncing function from John Hann
    // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
    var debounce = function (func, threshold, execAsap) {
      var timeout;

        return function debounced () {
            var obj = this, args = arguments;
            function delayed () {
                if (!execAsap)
                    func.apply(obj, args);
                timeout = null; 
            }

            if (timeout)
                clearTimeout(timeout);
            else if (execAsap)
                func.apply(obj, args);

            timeout = setTimeout(delayed, threshold || 100); 
        };
    };

    // smartresize 
    jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');
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
    heatmap.set('radius', heatmap.get('radius') ? null : 20);
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
            new google.maps.LatLng(-24.993976, -53.460323),
            new google.maps.LatLng(-24.992053, -53.463883),
            new google.maps.LatLng(-24.993152, -53.466029),
            new google.maps.LatLng(-24.989748, -53.464988),
            new google.maps.LatLng(-24.992062, -53.469183),
            new google.maps.LatLng(-24.995699, -53.467488),
            new google.maps.LatLng(-24.997537, -53.462166),


            new google.maps.LatLng(-24.994340000000000,-53.478789999999800),
            new google.maps.LatLng(-24.987040000000000,-53.477409999999900),
            new google.maps.LatLng(-24.991330000000000,-53.479869999999800),
            new google.maps.LatLng(-24.989791300000000,-53.484327399999800),
            new google.maps.LatLng(-24.990718099999800,-53.478809900000000)
            //14 novembro
        ];
    };

};



