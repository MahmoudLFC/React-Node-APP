import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import warningImg from "../assets/images/warning.png";

const DeleteModal = (props:any) => {
  const handleDeletedItem = async () => {
    const { data: response } = await props.modelService.remove(
      props.deletedItem._id
    );
    toast.success("Deleted successfully");
    return props.onCloseModal("delete", response);
  };
  return (
    <Modal show={props.open} onHide={() => props.onCloseModal("close")}>
      <Modal.Header closeButton>
      <div className="modal-header border-0">
        <h5 className="modal-title mt-0 fw-bold" id="myModalLabel">
          {/* <img src={deleteImg} alt="delete"/>  */}
          Delete '{props.titleMsg}'
        </h5>
      </div>
      </Modal.Header>
      <Modal.Body>
      <div className="modal-body border-0">
        <img src={warningImg} className="mx-auto d-block" alt="delete" />
        <h3 className="text-center pt-3 fw-bold">Are you sure?</h3>
        <p className="text-center">
          {props.descriptionMsg
            ? props.descriptionMsg
            : `You will not be able to recover this ${props.eventType} and the data associated with this ${props.eventType} intitled with "${props.titleMsg}"`}
        </p>
      </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => props.onCloseModal("close")}>
          Close
        </Button>
        <Button variant="primary" onClick={handleDeletedItem}>Understood</Button>
      </Modal.Footer>
    </Modal>
  );
};

DeleteModal.propTypes = {
  open: PropTypes.bool,
  onCloseModal: PropTypes.func,
  handleTableChange: PropTypes.func,
  deletedItem: PropTypes.object,
  modelService: PropTypes.object,
  titleMsg: PropTypes.string,
  descriptionMsg: PropTypes.string,
  eventType: PropTypes.string,
};

export default DeleteModal;
