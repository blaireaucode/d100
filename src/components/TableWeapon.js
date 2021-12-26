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
import ItemWeapon from "./ItemWeapon";
import InputFieldHeader from "./InputFieldHeader";
import {get_items_from_table} from "../helpers/helpers_equipment";
import TableTitle from "./TableTitle";

class TableWeapon extends Component {

    items = [];

    constructor(props) {
        super(props);
        this.items = get_items_from_table('weapon', ItemWeapon);
    }

    render() {
        return (
            <span>
                <TableTitle>Table W - Weapons</TableTitle>
                <InputFieldHeader width={'8ch'} value={'D100'}/>
                <InputFieldHeader width={'20ch'} value={'Name'}/>
                <InputFieldHeader width={'6ch'} value={'Hands'}/>
                <InputFieldHeader width={'6ch'} value={'Type'}/>
                <InputFieldHeader width={'5ch'} value={'Dmg'}/>
                <InputFieldHeader width={'5ch'} value={'GP'}/>
                <InputFieldHeader width={'8ch'} value={'fix cost'}/>
                <br/>
                {this.items}
            < /span>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(TableWeapon)
