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

class ItemFind extends Component {

    static defaultProps = {
        class_name: ''
    }

    render() {
        const item = get_item_in_table('find', this.props.id, false);
        return (
            <div className={this.props.class_name}>
                <C width={'6ch'}>{item.d100}</C>
                <C width={'6ch'}>{item.time}</C>
                <C width={'96ch'}>{item.detail}</C>
                <C width={'1ch'}/>
                <ItemGet {...this.props} item_type={'find'} buy={false}/>
            < /div>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ItemFind)
