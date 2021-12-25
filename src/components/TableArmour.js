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
import ItemArmour from "./ItemArmour";
import InputFieldHeader from "./InputFieldHeader";
import {get_items_from_table} from "../helpers/equipment_helpers";
import TableTitle from "./TableTitle";

class TableArmour extends Component {

    static defaultProps = {
        id: ''
    }
    items = [];

    constructor(props) {
        super(props);
        this.items = get_items_from_table('armour', ItemArmour);
    }

    render() {
        if (this.props.id !== '') {
            this.items = get_items_from_table('armour', ItemArmour, this.props.id);
        }
        return (
            <span>
                <TableTitle>Table A - Armours</TableTitle>
                <InputFieldHeader width={'8ch'} value={'D100'}/>
                <InputFieldHeader width={'25ch'} value={'Name'}/>
                <InputFieldHeader width={'7ch'} value={'Slot'}/>
                <InputFieldHeader width={'5ch'} value={'AS'}/>
                <InputFieldHeader width={'5ch'} value={'GP'}/>
                <InputFieldHeader width={'8ch'} value={'fix cost'}/>
                <br/>
                {this.items}
            < /span>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(TableArmour)
