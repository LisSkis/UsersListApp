import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';

import { closeErrorModal } from '../../actions';

import styles from '../style.css';

class ErrorModal extends Component {
  constructor(props) {
    super(props);

    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleModalClose() {
    this.props.dispatch(closeErrorModal());
  }

  render() {
    return (
      <Modal.Dialog className={styles['modal']}>
        <Modal.Body>
          {this.props.modalMessage}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    )
  }
}

const MapStateToProps = (state) => {
  return {
    modalMessage: state.errorModal.message,
  }
}

export default connect(MapStateToProps)(ErrorModal);

ErrorModal.propTypes = {
  modalMessage: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};
