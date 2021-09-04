import React, { useEffect } from 'react';
import './introductionStyles.css';
import { Check2All } from 'react-bootstrap-icons';


const introductionContainer = {
    width : '80vw',
    maxWidth : '80vw',
    marginLeft: '2vw',
    marginRight: '2vw'
}

const image = {
    width : '45vw',
    height : '45vh'
}

function Introduction(){

    return(
        <div style={introductionContainer}>
            <h1 className="topic-container">Grass Land Detector</h1>
            <div className="objective-container-new">
                <p>An application to detect suitable grassland for livestock to proper livestock management</p>
            </div>
			<div className="intro-container">
                <div>
                    <img src="/Assets/ndvi.jpg" alt="resource not found" style={image}/>
                </div>
                <div>
                    <div className="list-container">
                        <ul>
                            <li><Check2All /> Using <a href="https://www.sentinel-hub.com/" target="_blank">Sentinel-hub</a> data</li>
                            <li><Check2All /> Using <a href="https://leafletjs.com/" target="_blank">leaflet</a> map API</li>
                            <li><Check2All /> Using NDVI to detect grasslands</li>
                            <li><Check2All /> Generating output images with processed data</li>
                            <li><Check2All /> Storing detected data</li>
                        </ul>
                    </div>
                </div>
			</div>
        </div>
    )
}

export default Introduction;