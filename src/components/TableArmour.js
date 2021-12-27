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
import {get_items_from_table} from "../helpers/helpers_equipment";
import TableTitle from "./TableTitle";
import C from "../helpers/C";

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
            <div className={'table_item'}>
                <TableTitle>Table A - Armours</TableTitle>
                <InputFieldHeader width={'10ch'} value={'D100'}/>
                <InputFieldHeader width={'32ch'} value={'Name'}/>
                <InputFieldHeader width={'12ch'} value={'Slot'}/>
                <InputFieldHeader width={'6ch'} value={'AS'}/>
                <InputFieldHeader width={'6ch'} value={'GP'}/>
                <C width={'2ch'}/>
                <InputFieldHeader width={'10ch'} value={'fix cost'}/>
                <br/>
                {this.items}
            < /div>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(TableArmour)
