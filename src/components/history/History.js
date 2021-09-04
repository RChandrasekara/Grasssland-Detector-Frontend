import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Alert, Button, Modal } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import Loader from "react-loader-spinner";
import { useHistory } from 'react-router-dom';
import "./history.css";

import Example from './deleteHistoryItem';
import MapZoomView from './mapZoomView';

const apiUrl = process.env.REACT_APP_API_URL;

const historyContainer = {
    width : '80vw',
    maxWidth : '80vw',
    overflow: 'scroll',
}

const iconCenter = {
    textAlign: 'center',
}

function History(){

    const [searchHistory, setSearchHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [empty, setEmpty] = useState(true);
    const history = useHistory();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [mapShow, setMapShow] = useState(false);
    const handleMapClose = () => setMapShow(false);
    const handleMapShow = () => setMapShow(true);

    const [deleteItem, setDeleteItem] = useState(false);
    const [temp, setTemp] = useState(false);

    const getUserId = ()=>{
        return localStorage.getItem("id");
    }

    const getSearchHistory=()=>{
        setLoading(true);
        let requestBody = {
            "userId" : getUserId()
        }
        console.log(apiUrl)
        axios.post(`${apiUrl}/prev-search`,requestBody,{
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json', 
            }
        }).then((res)=>{
            if(res.status == 200){
                if(res.data.length != 0){
                    setSearchHistory(res.data);
                    setEmpty(false);
                }
                if(res.data.length == 0){
                    setEmpty(true);
                }
                setLoading(false);
            }
        }).catch((error)=>{
            console.log(error);
        })
    }

    const openMapZoom = () =>{
        handleMapShow();
        handleClose();
    }

    const deleteSearchHistory=(id)=>{
        handleShow();
        handleMapClose();
        let requestBody = {
            "userId" : getUserId(),
            "searchId" : id
        }
        axios.delete(`${apiUrl}/prev-search`,
            {
                data : requestBody
            },
            {
            headers: {
                'Content-Type': 'application/json', 
            }
        }).then((res)=>{
            if(res.status == 200){
                getSearchHistory();
            }
        }).catch((error)=>{
            console.log(error);
        })
    }

    function handleModalValue (fromModal){
        handleClose();
        setDeleteItem(fromModal.msg);
    };

    function renderContent(){
        if(loading){
            return(
                <div style={historyContainer}>
                    <div className="horizontal-center">
                        <div className="vertical-center">
                            <Loader
                                type="Puff"
                                color="#212121"
                                height={100}
                                width={100}
                            />
                        </div>
                    </div>
                </div>
            );
        }
        if(!loading && empty){
            return(
                <div style={historyContainer}>
                    <div className="horizontal-center">
                        <div className="vertical-center">
                            <div className="div-1">
                                <div>
                                    <h2>Empty previous searches</h2>
                                </div>
                                <div className="btn-1-container">
                                    <button className="btn-1" onClick={() => history.push('/home/location-detector')}>New Search</button>    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return(
            <div style={historyContainer}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Date and Time</th>
                        <th>Search Map</th>
                        <th>Result Map</th>
                        <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchHistory.map((item, index)=>{
                            return(
                                <tr key={item.id}>
                                    <td>{index+1}</td>
                                    <td className="table-tem-center">{item.searchTime}</td>
                                    <td>
                                        <img className="img-wrapper-2" src={item.requestMap} onClick={()=>{window.open(item.requestMap);}}/>
                                    </td>
                                    <td><img className="img-wrapper-2" src={item.resultMap} onClick={()=>{window.open(item.resultMap);}} /></td>
                                    <td style={iconCenter} className="table-tem-center">
                                        <div>
                                            <Trash color="tomato" onClick={()=>{deleteSearchHistory(item.id)}} />
                                        </div>
                                        {/* <Example 
                                            show={show}
                                            handleClose={()=>{handleClose()}}
                                            onClick={handleModalValue}
                                        /> */}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }

    
    useEffect(()=>{
        getSearchHistory();
    },[temp]);

    return(
        renderContent()
    );
}

export default History;