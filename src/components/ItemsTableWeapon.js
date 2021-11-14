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
import weapon_table from "../tables/table_w_weapon.json";
import ItemWeapon from "./ItemWeapon";

class ItemsTableWeapon extends Component {

    items = [];

    constructor(props) {
        super(props);
        // list of items in table w (ftm)
        const table = weapon_table;
        for (let item of table) {
            const v = item.d100;
            if (v === 'none') continue;
            const op = <span key={v}>
                        <ItemWeapon id={v}/><br/>
                       </span>;
            this.items.push(op);
        }
    }

    render() {

        return (
            <span>
                Weapons
                <p/>
                {this.items}
            < /span>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsTableWeapon)