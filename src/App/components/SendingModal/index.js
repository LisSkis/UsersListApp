import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import Loadable from 'react-loading-overlay';

const SendingModal = ({ actionType, modalStyle, loadingStyle }) => (
  <Modal.Dialog className={modalStyle}>
    <Modal.Body>
      <Loadable
        active={true}
        spinner
        text={`User is being ${actionType === 'add' ? 'added' : 'edited'}...`}
        background="#fff"
        color="#000"
        >
        <div className={loadingStyle}/>
      </Loadable>
    </Modal.Body>
  </Modal.Dialog>
)

export default SendingModal;

SendingModal.propTypes = {
  actionType: PropTypes.string.isRequired,
  modalStyle: PropTypes.string.isRequired,
  loadingStyle: PropTypes.string.isRequired,
};
