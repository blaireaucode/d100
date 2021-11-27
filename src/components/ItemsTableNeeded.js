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
import needed_table from "../tables/table_n_needed.json";
import ItemNeeded from "./ItemNeeded";
import InputFieldHeader from "./InputFieldHeader";

class ItemsTableneeded extends Component {

    items = [];

    constructor(props) {
        super(props);
        // list of items in table w (ftm)
        const table = needed_table;
        let i = 0;
        for (let item of table) {
            const v = item.d100;
            if (v === 'none') continue;
            const cn = (i % 2 === 0) ? 'item_table_odd':'';
            const op = <span key={v}>
                        <ItemNeeded id={v} class_name={cn}/><br/>
                       </span>;
            this.items.push(op);
            i += 1;
        }
    }

    render() {
        return (
            <span>
                <b>-- Table A (needed) --</b>
                <br/>
                <InputFieldHeader width={'8ch'} value={'d100'}/>
                <InputFieldHeader width={'30ch'} value={'Name'}/>
                <InputFieldHeader width={'65ch'} value={'Detail'}/>
                <InputFieldHeader width={'6ch'} value={'GP'}/>
                <br/>
                {this.items}
            < /span>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsTableneeded)
