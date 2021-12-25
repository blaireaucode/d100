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
import {get_item_in_table} from "../helpers/equipment_helpers";
import C from "../helpers/C";
import ItemGet from "./ItemGet";

class ItemWeapon extends Component {

    static defaultProps = {
        class_name: ''
    }

    render() {
        const item = get_item_in_table('weapon', this.props.id, false);
        return (
            <span className={this.props.class_name}>
                <C width={'8ch'}>{item.d100}</C>
                <C width={'20ch'}>{item.name}</C>
                <C width={'6ch'}>{item.hands}</C>
                <C width={'6ch'}>{item.type}</C>
                <C width={'5ch'}>{item.dmg}</C>
                <C width={'5ch'}>{item.gp}</C>
                <C width={'8ch'}>{item.fix_cost}</C>
                <ItemGet {...this.props} item_type={'weapon'}/>
            < /span>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ItemWeapon)
