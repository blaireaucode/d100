/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import Input from '@material-ui/core/Input'
import Checkbox from '@material-ui/core/Checkbox'
import {mapDispatchToProps, mapStateToProps} from 'helpers/default_props'
import * as up from 'helpers/helpers_update'

class InputFieldCharacter extends Component {

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
        const v = this.props.type === 'bool' ? target.checked : target.value;
        const g = up.update_g_characteristic(this.props.game, fn, v);
        this.props.set_game(g)
    };

    render() {
        // input : props.characteristic props.field_name
        const c = this.props.game.characteristics;
        const fn = this.props.field_name;
        let value = c[fn];

        // class name (for style)
        let align = this.props.align;
        let cn = this.props.class_name;
        if (this.props.type === 'number') {
            cn += ' field_input_nb';
            value = parseInt(value) + this.props.mod;
            //console.log('value', fn, value, this.props.mod);
            //align = 'right';
        }

        // start adornment
        let a = '';

        // special case
        // if (fn === 'life') a = '💙'; //❤️ 🤍♡
        //console.log('w', this.props.width);
        if (this.props.type === 'bool') {
            return (
                <Checkbox
                    className={cn}
                    name={fn}
                    checked={value}
                    style={{width: '2ch'}}
                    onChange={this.handleChange}
                />
            )
        }
        return (
            <Input className={cn}
                   disableUnderline={true}
                   type={this.props.type}
                   name={fn}
                   value={value}
                   style={{width: this.props.width}}
                   inputProps={{style: {textAlign: align}}}
                   readOnly={this.props.read_only}
                   onChange={this.handleChange}
                   startAdornment={a}
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputFieldCharacter);
