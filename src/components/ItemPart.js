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
import {get_item_in_table} from "../helpers/helpers_equipment"
import C from "../helpers/C";
import ItemGet from "./ItemGet";

class ItemPart extends Component {

    static defaultProps = {
        class_name: ''
    }

    render() {
        const item = get_item_in_table('parts', this.props.id, false);
        return (
            <span className={this.props.class_name}>
                <C width={'6ch'}>{item.P1 === "none" ? "-----" : item.P1}</C>
                <C width={'6ch'}>{item.P2 === "none" ? "-----" : item.P2}</C>
                <C width={'6ch'}>{item.P3 === "none" ? "-----" : item.P3}</C>
                <C width={'6ch'}>{item.P4 === "none" ? "-----" : item.P4}</C>
                <C width={'16ch'}>{item.name}</C>
                <C width={'70ch'}>{item.detail}</C>
                <C width={'6ch'}>{item.gp}</C>
                <ItemGet {...this.props} item_type={'parts'}/>
            < /span>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ItemPart)
