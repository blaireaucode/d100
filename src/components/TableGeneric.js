/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {mapDispatchToProps, mapStateToProps} from 'helpers/default_props';
import {get_items_from_table2, get_items_header_from_table} from "../helpers/helpers_equipment";
import TableTitle from "./TableTitle";

class TableGeneric extends Component {

    items = [];
    items_header = [];

    constructor(props) {
        super(props);
        const tn = this.props.table_name;
        this.items = get_items_from_table2(tn);
        this.items_header = get_items_header_from_table(tn);
    }

    render() {
        return (
            <div className={'table_item'}>
                <TableTitle>{this.props.title}</TableTitle>
                {this.items_header}
                <br/>
                {this.items}
            </div>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(TableGeneric)
