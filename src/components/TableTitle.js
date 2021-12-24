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
import ItemTreasure from "./ItemTreasure";
import {get_items_from_table} from "../helpers/equipment_helpers";

class TableTitle extends Component {

    items = [];

    constructor(props) {
        super(props);
        this.items = get_items_from_table('treasureA', ItemTreasure);
    }

    render() {
        return (
            <span>
                <hr color={'#333'} size={1}/>
                <b>{this.props.children}</b>
                <br/>
            < /span>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(TableTitle)
