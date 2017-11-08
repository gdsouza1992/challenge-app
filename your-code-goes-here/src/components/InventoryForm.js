import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addInventoryAction, editInventoryAction, deleteInventoryAction } from '../actions/inventoryActions';

class InventoryForm extends Component {
    constructor(props) {
        super(props);
        const { formData } = this.props;
        this.state = {
            itemName: formData.modalData.itemName || '',
            itemId: formData.modalData.itemId,
            itemQuantity: formData.modalData.itemQuantity || 0,
            formType: formData.modalType,
            validationError: false,
            changedData: []
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.formSubmit) {
            if (this.state.itemName == '' && this.formType != 'delete') {
                this.setState({
                    validationError: true
                });
                this.props.onResetFormSubmit();
            } else {
                this.handleSubmit(this.state);
                this.props.closeModal();
            }
        }
    }

    handleItemNameChange = (event) => {
        const { changedData } = this.state;
        changedData.push('editNameAction');
        this.setState({
            validationError: false
        });
        this.setState({ changedData });
        this.setState({ itemName: event.target.value });
    }

    handleItemQuantityChange = (event) => {
        const { changedData } = this.state;
        changedData.push('editQuantityAction');
        this.setState({ changedData });
        this.setState({ itemQuantity: event.target.value });
    }

    handleSubmit = (formData) => {
        switch(formData.formType) {
            case 'edit':
                this.props.editInventoryAction(formData);
                break;
            case 'add':
                this.props.addInventoryAction(formData);
                break;
            case 'delete':
                this.props.deleteInventoryAction(formData);
                break;
            default:
                break;
        }
        this.props.onResetFormSubmit();

        this.setState({ changedData: [] });
    }

    render() {
        const errorSpan = this.state.validationError ? <span>'Item Name cannot be empty'</span> : null;

        if (this.state.formType == 'delete') {
            return null;
        }

        return (
            <div className="modal-body">
                <form>
                    <div className="row">
                        <div id="itemNameLabel" className="col-xs-6">
                            Name:
                        </div>
                        <div id="itemQuantityLabel" className="col-xs-6">
                            Quantity:
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-6">
                            <input id="itemNameInput" type="text" value={this.state.itemName} onChange={this.handleItemNameChange} />
                        </div>
                        <div className="col-xs-6">
                            <input id="itemQuantity" type="number" value={this.state.itemQuantity} onChange={this.handleItemQuantityChange} />
                        </div>
                    </div>
                </form>
                {errorSpan}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        inventory: state.inventory
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addInventoryAction, editInventoryAction, deleteInventoryAction }, dispatch);
}

InventoryForm.propTypes = {
    formData: PropTypes.object,
    formSubmit: PropTypes.bool,
    onResetFormSubmit: PropTypes.func,
    closeModal: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(InventoryForm);
