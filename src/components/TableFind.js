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
import ItemFind from "./ItemFind";
import {get_items_from_table} from "../helpers/helpers_equipment";
import TableTitle from "./TableTitle";

class TableFind extends Component {

    items = [];

    constructor(props) {
        super(props);
        this.items = get_items_from_table('find', ItemFind);
    }

    render() {
        return (
            <div className={'table_item'}>
                <TableTitle>Table F - Find</TableTitle>
                <InputFieldHeader width={'6ch'} value={'D100'}/>
                <InputFieldHeader width={'6ch'} value={'Time'}/>
                <InputFieldHeader width={'96ch'} value={'Detail'}/>
                <br/>
                {this.items}
            </div>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(TableFind)
