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
import C from "../helpers/C";
import ItemGet from "./ItemGet";

class ItemSingle extends Component {
    render() {
        const t = this.props.item_type;
        const id = t[0] === 'P' ? t + this.props.id : this.props.id;
        const item = get_item_in_table(t, id, false);
        let attributes = [];
        for (const att in item) {
            if (att === 'name') continue;
            if (att === 'detail') continue;
            if (this.props.item_type[0] === 'P' && att === 'd100') continue;
            let t = '';
            let w = item[att].toString().length + 5 + att.length;
            if (att !== 'name' && att !== 'detail')
                t = <span className={'field_name'}>{att}<br/></span>;
            if (att === 'gp') {
                t = <span className={'field_name'}>💰 GP <br/></span>;
                w += 3;
            }
            w = w + 'ch';
            if (att === 'reroll_market') continue;
            attributes.push(<span className={'field_color'} key={att}>
                                <C width={w}>{t} {item[att]} &nbsp;</C>
                                <C width={'1ch'}/>
                            </span>);
        }
        const name = 'name' in item ? <span className={'field_color'}>
                        <C width={'75ch'}>{item['name']}</C>
                     </span> : '';
        const detail = 'detail' in item ?
            <span className={'field_color'}>
                            <C width={'100ch'}>{item['detail']}</C>
                        </span> : '';
        return (<div className={'item_generic'}>
            {name}<p/>
            {detail}
            <p/>
            {attributes}
            <p/>
            <C width={'15ch'}><ItemGet {...this.props} id={this.props.id} item_type={'parts'}/></C>
        </div>);
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ItemSingle)
