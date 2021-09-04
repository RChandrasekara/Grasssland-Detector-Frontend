import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const customModal ={
    width: '100vw',
    height: '100vh'
   }

function MapZoomView(props){
    return (
        <>
          <Modal
            show={props.show}
            onHide={props.handleClose}
            keyboard={false}
            fullscreen={true}
          >
            <Modal.Header closeButton>
              <Modal.Title>Map View</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img src={props.imageLink} />
            </Modal.Body>
          </Modal>
        </>
    );
}

export default MapZoomView;