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
            new google.maps.LatLng(-24.989280000000000,-53.477849999999800),
            new google.maps.LatLng(-24.995370000000000,-53.482149999999800),
            new google.maps.LatLng(-24.988560000000000,-53.476349999999800),
            new google.maps.LatLng(-24.989599999999900,-53.477010000000000),
            new google.maps.LatLng(-24.989229999999900,-53.476790000000000),
            new google.maps.LatLng(-24.987500000000000,-53.475670000000000),
            new google.maps.LatLng(-24.987860000000000,-53.475900000000000),
            new google.maps.LatLng(-24.987620000000000,-53.485880000000000),
            new google.maps.LatLng(-24.982690000000000,-53.481839999999800),
            new google.maps.LatLng(-24.989200000000000,-53.488599999999800),
            new google.maps.LatLng(-24.984069999999900,-53.482750000000000),
            new google.maps.LatLng(-24.982089999999900,-53.481450000000000),
            new google.maps.LatLng(-24.992139999999900,-53.486739999999800),
            new google.maps.LatLng(-24.989400000000000,-53.488169999999800),
            new google.maps.LatLng(-24.994190000000000,-53.479810000000000),
            new google.maps.LatLng(-24.994270000000000,-53.479300000000000),
            new google.maps.LatLng(-24.994050000000000,-53.480879999999900),
            new google.maps.LatLng(-24.983120000000000,-53.481059999999900),
            new google.maps.LatLng(-24.984500000000000,-53.481980000000000),
            new google.maps.LatLng(-24.982250000000000,-53.480469999999800),
            new google.maps.LatLng(-24.986619999999800,-53.478160000000000),
            new google.maps.LatLng(-24.991190000000000,-53.480840000000000),
            new google.maps.LatLng(-24.987990000000000,-53.486510000000000),
            new google.maps.LatLng(-24.991070000000000,-53.484879999999800),
            new google.maps.LatLng(-24.989764000000000,-53.485551999999800),
            new google.maps.LatLng(-24.988340000000000,-53.487130000000000),
            new google.maps.LatLng(-24.989643699999800,-53.486430200000000),
            new google.maps.LatLng(-24.989350000000000,-53.480010000000000),
            new google.maps.LatLng(-24.988090000000000,-53.482289999999900),
            new google.maps.LatLng(-24.988920000000000,-53.480759999999800),
            new google.maps.LatLng(-24.988499999999800,-53.481540000000000),
            new google.maps.LatLng(-24.994340000000000,-53.478789999999800),
            new google.maps.LatLng(-24.986290000000000,-53.482120000000000),
            new google.maps.LatLng(-24.983550000000000,-53.480289999999800),
            new google.maps.LatLng(-24.984919999999800,-53.481220000000000),
            new google.maps.LatLng(-24.982399999999800,-53.479559999999900),
            new google.maps.LatLng(-24.984999999999900,-53.484400000000000),
            new google.maps.LatLng(-24.985430000000000,-53.483649999999800),
            new google.maps.LatLng(-24.985859999999800,-53.482889999999800),
            new google.maps.LatLng(-24.987970000000000,-53.479070000000000),
            new google.maps.LatLng(-24.987559999999800,-53.479840000000000),
            new google.maps.LatLng(-24.989039999999900,-53.477139999999800),
            new google.maps.LatLng(-24.988820000000000,-53.477550000000000),
            new google.maps.LatLng(-24.989650000000000,-53.476039999999900),
            new google.maps.LatLng(-24.991530000000000,-53.487070000000000),
            new google.maps.LatLng(-24.990720000000000,-53.484250000000000),
            new google.maps.LatLng(-24.989889900000000,-53.484672900000000),
            new google.maps.LatLng(-24.986709999999800,-53.481360000000000),
            new google.maps.LatLng(-24.983979999999800,-53.479540000000000),
            new google.maps.LatLng(-24.981819999999900,-53.478130000000000),
            new google.maps.LatLng(-24.985350000000000,-53.480440000000000),
            new google.maps.LatLng(-24.982589999999800,-53.478650000000000),
            new google.maps.LatLng(-24.988859999999800,-53.484409999999800),
            new google.maps.LatLng(-24.989419999999900,-53.488979999999800),
            new google.maps.LatLng(-24.991790000000000,-53.487710000000000),
            new google.maps.LatLng(-24.984520000000000,-53.485270000000000),
            new google.maps.LatLng(-24.983190000000000,-53.484360000000000),
            new google.maps.LatLng(-24.996079999999900,-53.482830000000000),
            new google.maps.LatLng(-24.993010000000000,-53.481389999999800),
            new google.maps.LatLng(-24.986870000000000,-53.484589999999900),
            new google.maps.LatLng(-24.994050000000000,-53.480879999999900),
            new google.maps.LatLng(-24.993510000000000,-53.481140000000000),
            new google.maps.LatLng(-24.989480000000000,-53.483220000000000),
            new google.maps.LatLng(-24.988550000000000,-53.483699999999800),
            new google.maps.LatLng(-24.989979999999900,-53.482949999999900),
            new google.maps.LatLng(-24.984929999999800,-53.485599999999800),
            new google.maps.LatLng(-24.991927499999900,-53.481929999999800),
            new google.maps.LatLng(-24.991962500000000,-53.481890000000000),
            new google.maps.LatLng(-24.992500000000000,-53.481650000000000),
            new google.maps.LatLng(-24.994050000000000,-53.480879999999900),
            new google.maps.LatLng(-24.990002857142800,-53.482937142857000),
            new google.maps.LatLng(-24.982279999999900,-53.482610000000000),
            new google.maps.LatLng(-24.985230000000000,-53.477260000000000),
            new google.maps.LatLng(-24.984819999999900,-53.478009999999800),
            new google.maps.LatLng(-24.988379999999900,-53.476709999999800),
            new google.maps.LatLng(-24.988700000000000,-53.487740000000000),
            new google.maps.LatLng(-24.991800000000000,-53.486130000000000),
            new google.maps.LatLng(-24.989370000000000,-53.487400000000000),
            new google.maps.LatLng(-24.995719999999800,-53.482480000000000),
            new google.maps.LatLng(-24.981490000000000,-53.479990000000000),
            new google.maps.LatLng(-24.986080000000000,-53.475740000000000),
            new google.maps.LatLng(-24.987459999999800,-53.476640000000000),
            new google.maps.LatLng(-24.987140000000000,-53.480589999999900),
            new google.maps.LatLng(-24.984400000000000,-53.478780000000000),
            new google.maps.LatLng(-24.985769999999800,-53.479689999999800),
            new google.maps.LatLng(-24.990020000000000,-53.483020000000000),
            new google.maps.LatLng(-24.990983333333300,-53.476653333333300),
            new google.maps.LatLng(-24.993179999999800,-53.480190000000000),
            new google.maps.LatLng(-24.994119999999800,-53.480359999999800),
            new google.maps.LatLng(-24.993639999999900,-53.480269999999800),
            new google.maps.LatLng(-24.989780000000000,-53.479230000000000),
            new google.maps.LatLng(-24.988389999999900,-53.478310000000000),
            new google.maps.LatLng(-24.984300000000000,-53.475299999999800),
            new google.maps.LatLng(-24.985650000000000,-53.476500000000000),
            new google.maps.LatLng(-24.992249999999800,-53.480029999999900),
            new google.maps.LatLng(-24.992709999999800,-53.480110000000000),
            new google.maps.LatLng(-24.987040000000000,-53.477409999999900),
            new google.maps.LatLng(-24.991330000000000,-53.479869999999800),
            new google.maps.LatLng(-24.991790000000000,-53.479959999999800),
            new google.maps.LatLng(-24.983650000000000,-53.483510000000000),
            new google.maps.LatLng(-24.988000000000000,-53.475639999999800),
            new google.maps.LatLng(-24.986190000000000,-53.478920000000000),
            new google.maps.LatLng(-24.991050000000000,-53.481780000000000),
            new google.maps.LatLng(-24.995010000000000,-53.481810000000000),
            new google.maps.LatLng(-24.991520000000000,-53.481870000000000),
            new google.maps.LatLng(-24.989010000000000,-53.475580000000000),
            new google.maps.LatLng(-24.994660000000000,-53.481470000000000),
            new google.maps.LatLng(-24.994299999999900,-53.481119999999800),
            new google.maps.LatLng(-24.987669000000000,-53.476247999999800),
            new google.maps.LatLng(-24.988136000000000,-53.477094000000000),
            new google.maps.LatLng(-24.989526000000000,-53.487313000000000),
            new google.maps.LatLng(-24.987255000000000,-53.485247999999800),
            new google.maps.LatLng(-24.985957599999900,-53.485066199999800),
            new google.maps.LatLng(-24.990041999999900,-53.482548999999800),
            new google.maps.LatLng(-24.989488399999900,-53.486515099999800),
            new google.maps.LatLng(-24.989438889999800,-53.486871239999900),
            new google.maps.LatLng(-24.989578850000000,-53.486894270000000),
            new google.maps.LatLng(-24.989557959999900,-53.486012010000000),
            new google.maps.LatLng(-24.989698760000000,-53.486033550000000),
            new google.maps.LatLng(-24.989609120000000,-53.485642519999800),
            new google.maps.LatLng(-24.989730000000000,-53.484769800000000),
            new google.maps.LatLng(-24.989791300000000,-53.484327399999800),
            new google.maps.LatLng(-24.989933600000000,-53.484350100000000),
            new google.maps.LatLng(-24.989851200000000,-53.483896100000000),
            new google.maps.LatLng(-24.990185499999900,-53.481596699999800),
            new google.maps.LatLng(-24.990314189999900,-53.481662489999800),
            new google.maps.LatLng(-24.990325500000000,-53.480630300000000),
            new google.maps.LatLng(-24.990452200000000,-53.480693199999800),
            new google.maps.LatLng(-24.990464800000000,-53.479687100000000),
            new google.maps.LatLng(-24.990588599999800,-53.479725799999800),
            new google.maps.LatLng(-24.990601900000000,-53.478757399999900),
            new google.maps.LatLng(-24.990718099999800,-53.478809900000000)
            //14 novembro
        ];
    };

};


