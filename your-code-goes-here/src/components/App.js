import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import { fetchInventoryAction } from '../actions/inventoryActions';
import { openModalAction } from '../actions/modalActions';

import InventoryChart from './InventoryChart';
import InventoryTable from './InventoryTable';
import InventoryModal from './InventoryModal';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            modalType: '',
            modalData: {}
        };
    }

    componentDidMount() {
        this.props.fetchInventoryAction();
    }

    createModal = (type, rowData) => {
        this.props.openModalAction(type, rowData);
    }

    render() {
        return (
            <div>
                <InventoryChart {...this.props} />
                <InventoryTable {...this.props} createModal={this.createModal} />
                <InventoryModal
                    isModalOpen={this.state.isModalOpen}
                    modalType={this.state.modalType}
                    modalData={this.state.modalData}
                />
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
    return bindActionCreators({ fetchInventoryAction, openModalAction }, dispatch);
}

App.propTypes = {
    fetchInventoryAction: PropTypes.func,
    openModalAction: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
