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
import {update_g_characteristic} from "../helpers/helpers_update";

const c_e = <Icon icon="akar-icons:circle"/>;
const c_s = <Icon icon="mdi:star-circle-outline"/>;
const c_h = <Icon icon="mdi:circle-half-full"/>;
const c_f = <Icon icon="akar-icons:circle-fill"/>;
const c_u = <Icon icon="entypo:arrow-with-circle-up"/>;

class InputTrack extends Component {

    static defaultProps = {
        width: 80,
        align: 'left',
        class_name: 'field_input',
        max: 12
    }

    handleChange = (i) => {
        i = i + 1;
        const fn = this.props.field_name;
        const current = parseFloat(this.props.game.characteristics[fn]);
        //console.log('current and click', current, i);
        let v = i;
        if (i > current && i <= current + 1) v = current + 0.5;
        if (i < current && i >= current - 1) v = current - 0.5;
        if (i === 1) {
            if (current > 2) v = 0;
        }
        const g = update_g_characteristic(this.props.game, fn, v);
        this.props.set_game(g)
    }

    render() {
        // input : props.characteristic props.field_name
        const c = this.props.game.characteristics;
        const fn = this.props.field_name;
        let value = parseFloat(c[fn]);

        // class name (for style)
        let align = this.props.align;
        let cn = this.props.class_name;

        // number of tick
        let tics = [];
        let i = 0;
        //console.log('v', value)
        while (i < this.props.max) {
            if (value <= i) {
                if (value === 0 && i === 0) tics.push(c_s); // first is a star
                else if (i === this.props.max - 1) tics.push(c_u)
                else tics.push(c_e); // empty
            } else {
                if (value > i && value < i + 1) tics.push(c_h); // half pip
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

export default connect(mapStateToProps, mapDispatchToProps)(InputTrack);
