import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

function Example(props) {
    return (
      <>
        <Modal
          show={props.show}
          onHide={props.handleClose}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header>
            <Modal.Title>Do you really want to delete?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            This action cannot be undone!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
              No
            </Button>
            <Button variant="danger" onClick={()=>{props.onClick({msg: true})}}>Delete</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

export default Example;