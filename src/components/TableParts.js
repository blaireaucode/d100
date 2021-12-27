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
import InputFieldHeader from "./InputFieldHeader";
import ItemPart from "./ItemPart";
import {get_items_from_table} from "../helpers/helpers_equipment";
import TableTitle from "./TableTitle";

class TableParts extends Component {

    items = [];

    constructor(props) {
        super(props);
        this.items = get_items_from_table('parts', ItemPart);
    }

    render() {
        return (
            <div className={'table_item'}>
                <TableTitle>Table P - Parts</TableTitle>
                <InputFieldHeader width={'6ch'} value={'P1'}/>
                <InputFieldHeader width={'6ch'} value={'P2'}/>
                <InputFieldHeader width={'6ch'} value={'P3'}/>
                <InputFieldHeader width={'6ch'} value={'P4'}/>
                <InputFieldHeader width={'16ch'} value={'Name'}/>
                <InputFieldHeader width={'43ch'} value={'Detail'}/>
                <InputFieldHeader width={'6ch'} value={'gp'}/>
                <br/>
                {this.items}
            </div>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(TableParts)
