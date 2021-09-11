import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents, WMSTileLayer } from 'react-leaflet';
import L, { map } from 'leaflet';
import {SimpleMapScreenshoter} from 'leaflet-simple-map-screenshoter';
import { saveAs } from 'file-saver';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import './locationdetector.css';
import { Check2All } from 'react-bootstrap-icons';
import ResultMap from './resultMap';

const sentinelhubUrl = process.env.REACT_APP_SENTINELHUB_URL;
const sentinelBaseUrl = process.env.REACT_APP_SENTINEL_BASE_URL;
const sentinelProcessingUrl = process.env.REACT_APP_SENTINEL_PROCESSING_URL;

const mapContainer = {
    width : '80vw',
}

function LoactionDetector(){
    const [center, setCenter] = useState('');
    const [mapScreenShotterVar, setMapScreenShotterVar] = useState('');
    const [loading, setLoading] = useState(false);
    const [roadMap, setRoadMap] = useState(null);
    const [ndviMap, setNdviMap] = useState(null);
    const [count, setCount] = useState(0);

    const [zoomLevel, setZoomLevel] = useState(null);
    const [mapRef, setMapRef] = useState(null);

    const formData = new FormData();

    const getLocation = () =>{
        if(roadMap != null  && ndviMap != null){
            console.log("Two Images");
        }
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getUserId = ()=>{
        return localStorage.getItem("id");
    }

    const getRoadMap = () =>{
        mapScreenShotterVar.takeScreen('blob').then(blob => {
            const file = new File([blob], 'roadMap.png', { type: blob.type })
            setRoadMap(file);
        }).catch(e => {
            console.log(e.toString());
            setLoading(false);
            console.log(loading);
        });
    }

    const getNdviMap = () =>{
        mapScreenShotterVar.takeScreen('blob').then(blob => {
            const file = new File([blob], 'NdviMap.png', { type: blob.type })
            setNdviMap(file);
        }).catch(e => {
            console.log(e.toString());
            setLoading(false);
            console.log(loading);
        });
    }

    const getGrasslands = () =>{
        let item = [center.lat, center.lng];
        sessionStorage.setItem("center", item);
        sessionStorage.setItem("zoom", zoomLevel);
        handleShow();
        let temp = count + 1;
        setCount(temp);
        
    }

    const resetHandler = ()=>{
        setNdviMap(null);
        setRoadMap(null);
    }

    let pluginOptions = {
        cropImageByInnerWH: true, // crop blank opacity from image borders
        hidden: false, // hide screen icon
        preventDownload: false, // prevent download on button click
        domtoimageOptions: {}, // see options for dom-to-image
        position: 'topleft', // position of take screen icon
        screenName: 'screen', // string or function
        // iconUrl: ICON_SVG_BASE64, // screen btn icon base64 or url
        hideElementsWithSelectors: ['.leaflet-control-container'], // by default hide map controls All els must be child of _map._container
        mimeType: 'image/png', // used if format == image,
        caption: null, // string or function, added caption to bottom of screen
        captionFontSize: 15,
        captionFont: 'Arial',
        captionColor: 'black',
        captionBgColor: 'white',
        captionOffset: 5,
        // callback for manually edit map if have warn: "May be map size very big on that zoom level, we have error"
        // and screenshot not created
        onPixelDataFail: async function({ node, plugin, error, mapPane, domtoimageOptions }) {
            // Solutions:
            // decrease size of map
            // or decrease zoom level
            // or remove elements with big distanses
            // and after that return image in Promise - plugin._getPixelDataOfNormalMap
            return plugin._getPixelDataOfNormalMap(domtoimageOptions)
        }
    }

    

    const generateMap = ()=>{

    let osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    });

    let baseUrl = sentinelBaseUrl;
    
    let sentinelHub = L.tileLayer.wms(baseUrl, {
        tileSize: 512,
        attribution: `&copy; <a href=${sentinelhubUrl} target="_blank">Sentinel Hub</a>`,
                    urlProcessingApi: sentinelProcessingUrl,
        maxcc:20, 
        minZoom:12, 
        maxZoom:16,
        preset:"NDVI", 
        layers:"NDVI", 
        time:"2021-02-01/2021-08-07", 
    });

    let baseMaps = {
        'OpenStreetMap': osm
    };

    let overlayMaps = {
        'Sentinel Hub WMS': sentinelHub
    };

    let map = L.map('devTestingDemo', {
        center: [52.912162, -1.184224], // lat/lng in EPSG:4326
        zoom: 14,
        layers: [osm, sentinelHub]
    });

    // setCenter('bounds' + JSON.stringify(map.getPanes()));
    var simpleMapScreenshoter = L.simpleMapScreenshoter(pluginOptions).addTo(map);

    setMapScreenShotterVar(simpleMapScreenshoter);

    setCenter(map.getCenter());
    setZoomLevel(map.getZoom());

    L.control.layers(baseMaps, overlayMaps).addTo(map);

    setMapRef(map);

    }

    function getMapBounds(){
        setZoomLevel(mapRef.getZoom());
        setCenter(mapRef.getCenter());
    };

    useEffect(()=>{
        generateMap()
    },[]);

    return(
        <div style={mapContainer}>
            <div id="devTestingDemo" onClick={()=>{getMapBounds()}}>
            </div>
            <div className="btn-container">
                <div className="btn-container-vertical">
                    {(ndviMap == null)
                        ?<button className="btn-getmap" onClick={getNdviMap}>Get NDVI Map</button>
                        :<button className="btn-getmap-disabled" disabled={true}>Get NDVI Map <Check2All /></button>
                    }
                    {(roadMap == null)
                        ?<button className="btn-getmap" onClick={getRoadMap}>Get Road Map</button>
                        :<button className="btn-getmap-disabled" disabled={true}>Get Road Map <Check2All /></button>
                    }
                </div>
                    {(ndviMap != null && roadMap != null)
                    ?<button className="btn-detect" onClick={getGrasslands}>Find Grasslands</button>
                    :<button className="btn-disabled" disabled={true}>Find Grasslands</button>
                    }
                    <ResultMap 
                        show={show}
                        handleClose={()=>{handleClose()}}
                        userId={getUserId()}
                        loading={true}
                        ndviMap={ndviMap}
                        roadMap={roadMap}
                        count={count}
                    />
                    <button className="btn-reset" onClick={resetHandler}>Reset</button>
            </div>
        </div>
    )
}

export default LoactionDetector;