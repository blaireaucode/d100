/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {mapDispatchToProps, mapStateToProps} from 'helpers/default_props'
import ItemNeeded from "./ItemNeeded";
import InputFieldHeader from "./InputFieldHeader";
import {get_items_from_table} from "../helpers/helpers_equipment";
import TableTitle from "./TableTitle";

class TableNeeded extends Component {

    items = [];

    constructor(props) {
        super(props);
        this.items = get_items_from_table('needed', ItemNeeded);
    }

    render() {
        return (
            <div className={'table_item'}>
                <TableTitle>Table N - Needed</TableTitle>
                <InputFieldHeader width={'6ch'} value={'D100'}/>
                <InputFieldHeader width={'27ch'} value={'Name'}/>
                <InputFieldHeader width={'50ch'} value={'Detail'}/>
                <InputFieldHeader width={'6ch'} value={'GP'}/>
                <br/>
                {this.items}
            </div>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(TableNeeded)
