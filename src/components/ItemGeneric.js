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
import {get_item_in_table} from "../helpers/helpers_equipment";
import {table_item_props} from "../helpers/helpers_table";
import C from "../helpers/C";
import ItemGet from "./ItemGet";

class ItemGeneric extends Component {

    static defaultProps = {
        class_name: ''
    }

    render() {
        const tn = this.props.table_name;
        const item = get_item_in_table(tn, this.props.id, false);
        let attributes = [];
        const properties = table_item_props[tn];
        for (const p of properties) {
            const value = item[p.att];
            attributes.push(<C width={p.w} key={p.att}>{value}</C>)
        }
        return (
            <div className={this.props.class_name}>
                {attributes}
                <ItemGet {...this.props} item_type={tn}/>
            </div>
        );

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ItemGeneric)
