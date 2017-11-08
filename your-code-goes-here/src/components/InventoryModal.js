import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

import { closeModalAction } from '../actions/modalActions';

import InventoryForm from './InventoryForm';

class InventoryModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formSubmitClick: false
        };
    }

    onResetFormSubmit = () => {
        this.setState({
            formSubmitClick: false
        });
    }

    handleSaveClicked = () => {
        this.setState({
            formSubmitClick: true
        });
    }

    handleModalCloseRequest = () => {
        this.props.closeModalAction();
    }

    render() {
        const { isModalOpen, modalType, modalData } = this.props.modalState;
        let modalTitle;
        let modalConfirmButton;

        if (modalType == 'delete') {
            modalTitle = `Are you sure you want to delete "${modalData.itemName}" ?`;
            modalConfirmButton = 'DELETE';
        }

        if (modalType == 'edit') {
            modalTitle = 'Edit Item';
            modalConfirmButton = 'EDIT';
        }

        if (modalType == 'add') {
            modalTitle = 'Add Item';
            modalConfirmButton = 'ADD';
        }

        const modalForm = (<InventoryForm formData={this.props.modalState} formSubmit={this.state.formSubmitClick} onResetFormSubmit={this.onResetFormSubmit} closeModal={this.handleModalCloseRequest} />);


        return (
            <Modal
                className="Modal__Bootstrap modal-dialog"
                closeTimeoutMS={150}
                isOpen={isModalOpen}
                onRequestClose={this.handleModalCloseRequest}
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" onClick={this.handleModalCloseRequest}>
                            <span aria-hidden="true">&times;</span>
                            <span className="sr-only">CANCEL</span>
                        </button>
                        <h4 className="modal-title">{modalTitle}</h4>
                    </div>

                        {modalForm}

                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" onClick={this.handleModalCloseRequest}>CANCEL</button>
                        <button type="button" className="btn btn-primary" onClick={this.handleSaveClicked}>{modalConfirmButton}</button>
                    </div>
                </div>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {
        modalState: state.modal
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ closeModalAction }, dispatch);
}

InventoryModal.propTypes = {
    isModalOpen: PropTypes.bool,
    modalType: PropTypes.string,
    modalData: PropTypes.object,
    modalState: PropTypes.object,
    closeModalAction: PropTypes.func
};
export default connect(mapStateToProps, mapDispatchToProps)(InventoryModal);
