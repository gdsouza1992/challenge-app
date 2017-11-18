import React, { Component } from 'react';
// import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Glyphicon, Button } from 'react-bootstrap';
import ReactBsTable, {BootstrapTable, TableHeaderColumn, BootstrapButton} from 'react-bootstrap-table';

const _ = require('lodash');

class InventoryTable extends Component {

    onInventoryEditClick(row) {
        this.props.createModal('edit', this.makeModalData(row));
    }

    onInventoryDeleteClick(row) {
        this.props.createModal('delete', this.makeModalData(row));
    }

    onAddItemClick = () => {
        this.props.createModal('add', {});
    }

    revertSortFunc(a, b, order) {
        if (order === 'desc') {
            return a.itemStock.stockCount - b.itemStock.stockCount;
        }
        return b.itemStock.stockCount - a.itemStock.stockCount;
    }

    makeModalData(row) {
        return {
            itemId: row.id,
            itemName: row.name,
            itemQuantity: row.itemStock ? row.itemStock.stockCount : 0
        }
    }

    quantityFormatter(cell) {
        return cell ? cell.stockCount : 0;
    }

    cellEditButton = (cell, row, enumObject, rowIndex) => {
        return (
            <Button type="button" onClick={() => this.onInventoryEditClick(row)}>
                <Glyphicon glyph="pencil" />
            </Button>
        );
    }

    cellDeleteButton = (cell, row, enumObject, rowIndex) => {
        return (
            <Button type="button" onClick={() => this.onInventoryDeleteClick(row)}>
                <Glyphicon glyph="trash" />
            </Button>
        );
    }

    render() {
        if (_.isEmpty(this.props.inventory)) {
            return (
                null
            );
        }
        return (
            <div>
                <div className="row margin-bottom-10">
                    <div className="col-xs-6">
                        <div className="text-left">
                            <h2>Inventory Items</h2>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="text-right margin-top-20">
                            <Button className='btn btn-primary' onClick={this.onAddItemClick}>ADD NEW ITEM</Button>
                        </div>
                    </div>
                </div>

                <BootstrapTable data={this.props.inventory} hover height='auto' pagination>
                    <TableHeaderColumn isKey dataField='id' hidden>Product ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='name' dataSort>Product Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='itemStock' dataSort={true} sortFunc={this.revertSortFunc} dataFormat={ this.quantityFormatter }>Quantity</TableHeaderColumn>
                    <TableHeaderColumn dataField='button' dataFormat={this.cellEditButton}>Edit</TableHeaderColumn>
                    <TableHeaderColumn dataField='button' dataFormat={this.cellDeleteButton}>Delete</TableHeaderColumn>
                </BootstrapTable>
            </div>

        );
    }
}
export default InventoryTable;
