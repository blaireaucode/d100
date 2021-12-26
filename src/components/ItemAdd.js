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
import {Select} from "@material-ui/core"
import weapon_table from "../tables/table_w_weapon.json";
import L from 'helpers/L';
import {get_weapon_in_table} from "../helpers/helpers_equipment";

class ItemAdd extends Component {

    options = [];

    constructor(props) {
        super(props);
        this.add_item = this.add_item.bind(this);
        this.select_item = this.select_item.bind(this);
        // list of items in table w (ftm)
        const table = weapon_table;
        for (let item of table) {
            const v = item.d100;
            const op = <option key={v} value={v}>{v} {item.name}</option>;
            this.options.push(op);
        }
        this.state = {current: table[0]};
    }


    select_item(e) {
        const w = get_weapon_in_table(e.target.value);
        this.setState({current: w});
    }

    add_item(e) {

    }

    render() {
        const item = this.state.current;
        return (
            <span>
                Weapons &nbsp; &nbsp;
                <Select value={item.d100}
                        defaultValue={'none'}
                        onChange={this.select_item}
                        className={'select'}>
                    {this.options}
                </Select> &nbsp; &nbsp;
                <L onClick={this.add_item}>add {item.name}</L>
            < /span>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ItemAdd)
