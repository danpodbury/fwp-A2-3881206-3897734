import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// Adapted from: https://react-bootstrap.github.io/components/modal/

export function ConfirmationModal({buttonText, body, onConfirm, confirmText, confirmStyling = "btn-danger", buttonStyling = "btn-danger"}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleConfirmation = () => {
    handleClose();
    onConfirm();
  };


  return (
    <div>
      <Button className={buttonStyling} onClick={handleShow}>
        {buttonText}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{buttonText}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {body}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button className={confirmStyling} onClick={handleConfirmation}>
            {confirmText}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}