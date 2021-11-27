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
import * as up from 'helpers/update_helpers'
import {MenuItem, Select} from "@material-ui/core"

class InputFieldSelectCharacter extends Component {

    static defaultProps = {
        type: "txt",
        width: 80,
        read_only: false,
        align: 'left',
        mod: 0,
        class_name: 'field_input'
    }

    handleChange = ({target}) => {
        const fn = this.props.field_name;
        let v = target.value;
        const g = up.update_g_characteristic(this.props.game, fn, v);
        this.props.set_game(g);
    };

    render() {
        const c = this.props.game.characteristics;
        const fn = this.props.field_name;
        let value = c[fn];

        // class name (for style)
        let align = this.props.align;
        let cn = this.props.class_name;
        if (this.props.type === 'number') {
            cn += ' field_input_nb';
            value = parseInt(value) + this.props.mod;
        }

        // items
        const menuitems = [];
        for (const it of this.props.items) {
            menuitems.push(<MenuItem value={it}
                                     key={it}
                                     className={'field_input_small_select'}>
                {it}
            </MenuItem>);
        }

        return (
            <Select className={cn}
                    disableUnderline={true}
                    type={this.props.type}
                    name={fn}
                    value={value}
                    style={{width: this.props.width}}
                    inputProps={{style: {textAlign: align}}}
                    readOnly={this.props.read_only}
                    onChange={this.handleChange}>
                {menuitems}
            </Select>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputFieldSelectCharacter);
