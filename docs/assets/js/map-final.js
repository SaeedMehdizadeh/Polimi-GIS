import 'ol/ol.css';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';
import { Map, View, Overlay } from 'ol';
import { Tile, Image, Group, Vector } from 'ol/layer';
import { OSM, ImageWMS, BingMaps, StadiaMaps } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import { GeoJSON } from 'ol/format';
import { fromLonLat } from 'ol/proj';
import { ScaleLine, FullScreen, MousePosition } from 'ol/control';
import LayerSwitcher from 'ol-layerswitcher';
import { createStringXY } from 'ol/coordinate';
import { Style, Stroke } from 'ol/style';


let osm = new Tile({
    title: 'OpenStreetMap',
    type: 'base',
    visible: true,
    source: new OSM()
});


var NLZ = new Image({
    title: 'NLZ',
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_16:Merged_NLZ_LZ'}
    }),
    opacity: 0.5,
    visible:false,
});
var ndvi = new Image({
    title: 'Ndvi',
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_16:ndvi'}
    }),
    opacity: 0.5,
    visible:false,
});

var trainpoints = new Image({
    title: 'Training Points',
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_16:TrainingPointsSampled'}
    }),
    opacity: 0.9,
    visible:false 
});

var testpoints = new Image({
    title: 'Testing Points',
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_16:TestingPointsSampled'}
    }),
    opacity: 0.9,
    visible:false 
});



var LSclipped = new Image({
    title:'Landslides',
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_16:LZ'}
    }),
    visible:false
});


var PlanCurvature1 = new Image({
    title:'Plan Curvature',
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_16:plan'}
    }),
    visible:false
});


var Slope1 = new Image({
    title:'Slope',
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_16:slope'}
    }),
    visible:true,
});


var aspect5 = new Image({
    title:'Aspect',
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_16:aspect'}
    }),
    visible:false,
});


var dtm_clipped11 = new Image({
    title:'Dtm',
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_16:dtm'}
    }),
    visible:false,
});

var dusaf1 = new Image({
    title:'Dusaf',
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_16:dusaf'}
    }),
    visible:false,
});


var faults2 = new Image({
    title:'Faults',
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_16:faults'}
    }),
    visible:false,
});


var resampled_susceptibility = new Image({
    title:'Susceptibility Resampled',
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_16:susceptibility_resampled'}
    }),
    visible:false,
});


var rivers1 = new Image({
    title:'Rivers',
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_16:rivers'}
    }),
    visible:false,
});


var roads1 = new Image({
    title:'Roads',
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_16:roads'}
    }),
    visible:false,
});


var susceptibility1 = new Image({
    title:'Susceptibility',
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_16:susceptibility'}
    }),
    visible:false,
});

var susceptibility_reclassified1 = new Image({
    title:'Susceptibility Reclassified',
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_16:susceptibility_reclassified'}
    }),
    visible:false,
});


var ProfileCurvature = new Image({
    title:'Profile Curvature',
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_16:profile'}
    }),
    visible:false,
});



//Create the layer groups and add the layers to them

let basemapLayers = new Group({
    title: "Base Maps",
    layers: [osm]
});

let overlayLayers = new Group({
    title: 'Overlay Layers',
    layers: [ndvi, LSclipped, NLZ, PlanCurvature1, ProfileCurvature, Slope1, aspect5, dtm_clipped11, dusaf1, faults2, resampled_susceptibility, rivers1, roads1, susceptibility1, susceptibility_reclassified1,trainpoints,testpoints]
    })




/*
let osm1= new Tile({
    title: "Open Street Map",
    type: "base",
    visible: true,
    source: new OSM()
});
let colombiaBoundary = new Image({
    title: "Colombia Boundary",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gis:COL_adm0', 'STYLES': 'restricted' }
    })
});
var colombiaDepartments = new Image({
    title: "Colombia Departments",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gis:COL_adm1' }
    }),
    opacity: 0.5
});

var colombiaRoads = new Image({
    title: "Colombia Roads",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gis:COL_roads' }
    }),
    visible: false
});
var colombiaRivers = new Image({
    title: "Colombia Rivers",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gis:COL_rivers' }
    }),
    minResolution: 1000,
    maxResolution: 5000
});


*/
// Map Initialization


const initialZoom = 11.5;
const initialCoordinates = [9.8532, 46.2712];
let map = new Map({
    target: document.getElementById('map'),
    layers: [basemapLayers, overlayLayers],
    view: new View({
        center: fromLonLat(initialCoordinates), //We have to convert from EPSG:4326 to EPSG:3857 because openlayers uses it by default!
        zoom: initialZoom
    })
});

// Add the map controls:
map.addControl(new ScaleLine()); //Controls can be added using the addControl() map function
map.addControl(new FullScreen());
map.addControl(
    new MousePosition({
        coordinateFormat: createStringXY(4),
        projection: 'EPSG:4326',
        className: 'custom-control',
        placeholder: '0.0000, 0.0000'
    })
);

var layerSwitcher = new LayerSwitcher({});
map.addControl(layerSwitcher);

//OPTIONAL
//Add the Bing Maps layers
var BING_MAPS_KEY = "AqbDxABFot3cmpxfshRqLmg8UTuPv_bg69Ej3d5AkGmjaJy_w5eFSSbOzoHeN2_H";
var bingRoads = new Tile({
    title: 'Bing Maps—Roads',
    type: 'base',
    visible: false,
    source: new BingMaps({
        key: BING_MAPS_KEY,
        imagerySet: 'Road'
    })
});
var bingAerial = new Tile({
    title: 'Bing Maps—Aerial',
    type: 'base',
    visible: false,
    source: new BingMaps({
        key: BING_MAPS_KEY,
        imagerySet: 'Aerial'
    })
});
basemapLayers.getLayers().extend([bingRoads, bingAerial]);

//Add the Stadia Maps layers
var stadiaWatercolor = new Tile({
    title: "Stadia Watercolor",
    type: "base",
    visible: false,
    source: new StadiaMaps({
        layer: 'stamen_watercolor'
    })
})
var stadiaToner = new Tile({
    title: "Stadia Toner",
    type: "base",
    visible: false,
    source: new StadiaMaps({
        layer: 'stamen_toner'
    })
})
basemapLayers.getLayers().extend([stadiaWatercolor, stadiaToner]);

/*
//Add the WFS layer
let vectorSource = new VectorSource({});
const vectorLayer = new Vector({
    title: "Colombia water areas",
    source: vectorSource,
    style: new Style({
        stroke: new Stroke({
            color: 'rgb(255, 102, 0)',
            width: 4
        })
    }),
    zIndex: 10
});
overlayLayers.getLayers().extend([vectorLayer]);
*/

// This allows to use the function in a callback!
function loadFeatures(response) {
    vectorSource.addFeatures(new GeoJSON().readFeatures(response))
}
/*
// This is not a good practice, but works for the jsonp.
window.loadFeatures = loadFeatures;

var base_url = "https://www.gis-geoserver.polimi.it/geoserver/gis/ows?";
var wfs_url = base_url;
wfs_url += "service=WFS&"
wfs_url += "version=2.0.0&"
wfs_url += "request=GetFeature&"
wfs_url += "typeName=gis%3ACOL_water_areas&"
wfs_url += "outputFormat=text%2Fjavascript&"
wfs_url += "srsname=EPSG:3857&"
wfs_url += "format_options=callback:loadFeatures"

// This will request the WFS layer once the map is rendered.
// Uses the map event 'postrender': https://openlayers.org/en/v8.2.0/apidoc/module-ol_MapEvent-MapEvent.html#event:postrender
map.once('postrender', (event) => {
    // Load the WFS layer
    $.ajax({ url: wfs_url, dataType: 'jsonp' });
})
*/
//Add the code for the Pop-up
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

var popup = new Overlay({
    element: container
});
map.addOverlay(popup);

// This ensures that JQuery ($) is already available in the page.
$(document).ready(function () {
    map.on('singleclick', function (event) {
        //This iterates over all the features that are located on the pixel of the click (can be many)
        var feature = map.forEachFeatureAtPixel(event.pixel, function (feature, layer) {
            return feature;
        });
/*
        //If there is a feature, open the popup by setting a position to it and put the data from the feature
        if (feature != null) {
            var pixel = event.pixel;
            var coord = map.getCoordinateFromPixel(pixel);
            popup.setPosition(coord);
            content.innerHTML =
                '<h5>Colombia Water Areas</h5><br><b>Name: </b>' +
                feature.get('NAME') +
                '</br><b>Description: </b>' +
                feature.get('HYC_DESCRI');
        } else {
            //Only if the colombiaRoads layer is visible, do the GetFeatureInfo request
            if (colombiaRoads.getVisible()) {
                var viewResolution = (map.getView().getResolution());
                var url = colombiaRoads.getSource().getFeatureInfoUrl(event.coordinate, viewResolution, 'EPSG:3857', { 'INFO_FORMAT': 'text/html' });

                if (url) {
                    var pixel = event.pixel;
                    var coord = map.getCoordinateFromPixel(pixel);
                    popup.setPosition(coord);
                    //We do again the AJAX request to get the data from the GetFeatureInfo request
                    $.ajax({ url: url })
                        .done((data) => {
                            //Put the data of the GetFeatureInfo response inside the pop-up
                            //The data that arrives is in HTML
                            content.innerHTML = data;
                        });
                }
            }
        }
            */
    });
});


// The click event handler for closing the popup.
closer.onclick = function () {
    popup.setPosition(undefined);
    closer.blur();
    return false;
};


// Adding map event for pointermove
map.on('pointermove', function (event) {
    var pixel = map.getEventPixel(event.originalEvent);
    var hit = map.hasFeatureAtPixel(pixel);
    map.getTarget().style.cursor = hit ? 'pointer' : '';
});
