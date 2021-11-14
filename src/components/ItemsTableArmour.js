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
import armour_table from "../tables/table_a_armour.json";
import ItemArmour from "./ItemArmour";

class ItemsTableArmour extends Component {

    items = [];

    constructor(props) {
        super(props);
        // list of items in table w (ftm)
        const table = armour_table;
        for (let item of table) {
            const v = item.d100;
            if (v === 'none') continue;
            const op = <span key={v}>
                        <ItemArmour id={v}/><br/>
                       </span>;
            this.items.push(op);
        }
    }

    render() {
        return (
            <span>
                Armours
                <p/>
                {this.items}
            < /span>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsTableArmour)
