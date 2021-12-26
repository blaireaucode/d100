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
            <span>
                <TableTitle>Table N - Needed</TableTitle>
                <InputFieldHeader width={'8ch'} value={'Dta100'}/>
                <InputFieldHeader width={'30ch'} value={'Name'}/>
                <InputFieldHeader width={'65ch'} value={'Detail'}/>
                <InputFieldHeader width={'6ch'} value={'GP'}/>
                <br/>
                {this.items}
            < /span>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(TableNeeded)
