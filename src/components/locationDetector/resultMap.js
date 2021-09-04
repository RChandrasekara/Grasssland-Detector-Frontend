import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Loader from "react-loader-spinner";
import './modalStyles.css';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

function ResultMap(props) {

    const [loading, setLoading]=useState(true);
    const [resultImageUrl, setResultImageUrl]=useState('');

    const getGrasslands = () =>{
        const formData = new FormData();
        formData.append('userId',props.userId);
        formData.append('images',props.ndviMap);
        formData.append('images',props.roadMap);
        axios.post(`${apiUrl}/get-location`,formData,{
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data', 
            }
            }).then((res)=>{
                setResultImageUrl(res.data.result);
                sessionStorage.setItem("prevResultMap",res.data.result);
                setLoading(false);
        }).catch((error)=>{
            console.log(error);
        })
    }

    const getPreviousResultMap=()=>{
        console.log("Prev state map : "+sessionStorage.getItem("prevResultMap"));
        if(sessionStorage.getItem("prevResultMap")==undefined){
            return true;
        }
        return false;
    }

    useEffect(()=>{
        getGrasslands();
    },[props.count]);

    return (
      <>
        <Modal
          show={props.show}
          onHide={props.handleClose}
          backdrop="static"
          keyboard={false}
          centered
          dialogClassName="my-modal"
        >
          <Modal.Header>
            <Modal.Title>Grassland Map</Modal.Title>
          </Modal.Header>
          <Modal.Body>
                <div className="center-item">
                    {(loading || resultImageUrl=='' || sessionStorage.getItem("prevResultMap") ==  resultImageUrl)?
                        <Loader
                            type="Puff"
                            color="#212121"
                            height={100}
                            width={100}
                        />
                    :<img src={resultImageUrl} alt="Processing" />
                    }
                </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={props.handleClose} >Close X</Button>
            {/* <Button variant="danger" onClick={()=>{window.location.reload();}} >Close</Button> */}
          </Modal.Footer>
        </Modal>
      </>
    );
  }

export default ResultMap;