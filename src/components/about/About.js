import React from 'react';
import './about.css';

const introductionContainer = {
    width : '80vw',
    maxWidth : '80vw',
    marginLeft: '2vw',
    marginRight: '2vw'
}

function About(){

    return(
        <div style={introductionContainer}>
            <h1 className="topic-container">About</h1>
            <div className="objective-container">
                <span>Objective</span>
                <p>The main objective of this system is to detect suitable grassland for livestock to proper livestock management.</p>
            </div>
			<div className="aim-container">
                <span>Aim</span>
				<ul>
					<li>Identify the higher NDVI (NORMALIZED DIFFERENCE VEGETATION INDEX) valued crops fields</li>
					<li>Software interface with openCV to access the selected NDVI values using the GPS (GLOBAL POSITIONING SYSTEM) technology</li>
                    <li>Can view early search records</li>
				</ul>
			</div>
            <div className="map-intro-container">
                <div className="img-container">
                    <img className="img-wrapper-1" src='/Assets/ndvi_screenshot.png' alt="Resource not found"/>
                </div>
                <div className="img-container">
                    <p>NDVI is recognized as the indication to identify variation of the spectral bands without any assumptions
                    regarding the regarding the ground coverage groups, types of soil, or climate changes. In the NDVI computing
                    process, near infrared domain and visible domain of the electromagnetic spectrum will be considered where the
                    definite wavelengths will be absorbed, and others get reflected as sunlight.</p>
                </div>
            </div>
        </div>
    )
}

export default About;