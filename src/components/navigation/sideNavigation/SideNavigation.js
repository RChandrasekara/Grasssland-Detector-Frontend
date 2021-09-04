import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './sidenavigationstyles.css';

function setComponent(componentName){
    console.log(componentName);
}

function SideNavigation(){
    return(
        <div className='navigation-container'>
            <Link className='navigation-item-1' to="/home/">Introduction</Link>
            <Link className='navigation-item-1' to="/home/location-detector">Find location</Link>
            <Link className='navigation-item-1' to="/home/history">History</Link>
            <Link className='navigation-item-1' to="/home/about">About</Link>
        </div>
    );
}

export default SideNavigation;