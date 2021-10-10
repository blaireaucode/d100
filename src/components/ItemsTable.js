/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React, {Component} from 'react'
import Select from '@material-ui/core/Select'
import {connect} from 'react-redux'
import {mapDispatchToProps, mapStateToProps} from 'helpers/default_props'
import {columns_tables, equipment_tables} from 'helpers/equipment_helpers'
import DataTable from "react-data-table-component"
import ItemDescriptionCell from 'components/ItemDescriptionCell'

const table_list = [
    <option key="1" value="equipment">Equipment</option>,
    <option key="2" value="armors">Armors</option>,
    <option key="3" value="weapons">Weapons</option>
];

const customStyles = {
    headRow: {
        style: {
            backgroundColor: '#282c34'
        },
    },
    rows: {
        style: {
            backgroundColor: '#282c34',
            color: '#eee',
            '&:hover': {
                backgroundColor: '#181c20',
            }
        }
    },
    headCells: {
        style: {
            backgroundColor: '#282c34',
            color: '#eee'
        }
    },
    /*
    headRow: {
        style: {
            borderTopStyle: 'solid',
            borderTopWidth: '1px',
            borderTopColor: defaultThemes.default.divider.default,
        },
    },
    headCells: {
        style: {
            '&:not(:last-of-type)': {
                borderRightStyle: 'solid',
                borderRightWidth: '1px',
                borderRightColor: defaultThemes.default.divider.default,
            },
        },
    },
    cells: {
        style: {
            '&:not(:last-of-type)': {
                borderRightStyle: 'solid',
                borderRightWidth: '1px',
                borderRightColor: defaultThemes.default.divider.default,
            },
        },
    },
    */
};

class ItemsTable extends Component {

    constructor(props) {
        super(props);
        this.state = {current_table: 'equipment'};
        this.handle_change = this.handle_change.bind(this);
        this.cellClick = this.cellClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.menu = '';
    }

    handleClose() {
    }

    cellClick(p) {
        console.log('click', p)
    }

    handle_change(event) {
        this.setState({current_table: event.target.value});
    }

    render() {
        const table = equipment_tables[this.state.current_table];
        const columns = columns_tables[this.state.current_table];
        let sindex = 0;
        columns.forEach((element, index, columns) => {
            if (element.selector === "description") {
                sindex = index;
            }
        });
        columns[sindex].cell = row => {
            if (row.description.length > 70)
                return <span>{row.description.substr(0, 70)}...</span>;
            else
                return <span>{row.description}</span>;
        }
        return (
            <span>
                <Select value={this.state.current_table}
                        onChange={this.handle_change}>
                    {table_list}
                </Select>
                <p/>
                <div style={{width: '90%'}}>
                    <DataTable
                        noHeader
                        columns={columns}
                        expandableRows
                        expandableRowsComponent={<ItemDescriptionCell/>}
                        expandOnRowClicked
                        data={table}
                        customStyles={customStyles}
                        fixedHeader={true}
                        //highlightOnHover={true}
                        //overflowY={true}
                        //dense
                        //conditionalRowStyles={conditionalRowStyles}
                        //onRowClicked={this.cellClick}
                    />
                    {/*<DataGrid rows={table} columns={columns} pageSize={10}/>*/}
                </div>
            < /span>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsTable)
