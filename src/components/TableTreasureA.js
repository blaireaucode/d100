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
import ItemTreasure from "./ItemTreasure";
import {get_items_from_table} from "../helpers/helpers_equipment";
import TableTitle from "./TableTitle";

class TableTreasureA extends Component {

    items = [];

    constructor(props) {
        super(props);
        this.items = get_items_from_table('treasureA', ItemTreasure);
    }

    render() {
        return (
            <div className={'table_item'}>
                <TableTitle>Table TA - Treasures A</TableTitle>
                <InputFieldHeader width={'8ch'} value={'D100'}/>
                <InputFieldHeader width={'22ch'} value={'Name'}/>
                <InputFieldHeader width={'52ch'} value={'Detail'}/>
                <InputFieldHeader width={'6ch'} value={'gp'}/>
                <br/>
                {this.items}
            </div>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(TableTreasureA)
