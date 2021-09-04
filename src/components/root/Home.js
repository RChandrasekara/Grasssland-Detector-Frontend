import React from 'react';
import TopNavigation from '../navigation/topNavigation/TopNavigation';
import SideNavigation from '../navigation/sideNavigation/SideNavigation';
import Introduction from '../introduction/Introduction';
import LoactionDetector from '../locationDetector/LocationDetector';
import { Route } from 'react-router-dom';
import History from '../history/History';
import About from '../about/About';

const homeContainer = {
    display :'flex',
    flexDirection : 'row'
}

function Home(){
    return(
        <div >
            <TopNavigation />
            <div style={homeContainer}>
                <SideNavigation />

                <Route
                    exact
                    path="/home" 
                    component={Introduction} />

                <Route
                    exact
                    path="/home/location-detector" 
                    component={LoactionDetector} />

                <Route
                    exact
                    path="/home/history" 
                    component={History} />

                <Route
                    exact
                    path="/home/about" 
                    component={About} />

            </div>
        </div>
    )
}

export default Home;