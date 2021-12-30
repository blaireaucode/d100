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
import {Icon} from '@iconify/react';
import {update_g_item} from "../helpers/helpers_equipment";

const c_e = <Icon icon="ph:square"/>;
const c_h = <Icon icon="ph:square-half-fill" rotate={2}/>;
const c_f = <Icon icon="ph:square-fill"/>;
const c_b = <Icon icon="ant-design:close-square-filled"/>;

class InputItemTrack extends Component {

    static defaultProps = {
        width: 80,
        align: 'left',
        class_name: 'field_input',
        max: 6,
        field_name: 'damaged'
    }

    handleChange = (i) => {
        i = i + 1;
        const items = this.props.items === false ? this.props.game.items : this.props.items;
        const fn = this.props.field_name;
        const item = items[this.props.id];
        const current = parseFloat(item[fn]);
        //console.log('current and click', current, i);
        let v = i;
        if (i > current && i <= current + 1) v = current + 0.5;
        if (i < current && i >= current - 1) v = current - 0.5;
        if (i === 1) {
            if (current > 2) v = 0;
        }
        const g = update_g_item(this.props.game, this.props.id, fn, v);
        this.props.set_game(g)
    }

    render() {
        // input : props.characteristic props.field_name
        const items = this.props.items === false ? this.props.game.items : this.props.items;
        const fn = this.props.field_name;
        let item = ''
        if (this.props.id in items) {
            item = items[this.props.id];
        } else return '';
        //console.log('item', item)
        let value = parseFloat(item[fn]);

        // number of tick
        let tics = [];
        let i = 0;
        //console.log('v', value)
        while (i < this.props.max) {
            if (i >= value) {
                tics.push(c_e);
            } else {
                if (value > i && value < i + 1) tics.push(c_h); // half pip
                else if (i === this.props.max-1 && value === i+1)  tics.push(c_b);
                else tics.push(c_f); // full
            }
            i++;
        }
        i = 0;
        while (i < this.props.max) {
            const j = i;
            tics[i] = <span key={i} className={'track_symbol'}
                            onClick={() => {
                                this.handleChange(j)
                            }}>{tics[i]}</span>;
            i++;
        }

        return (<span> {tics} </span>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputItemTrack);
