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
import * as up from 'helpers/update_helpers'

class InputFieldCharacter extends Component {

    static defaultProps = {
        type: "txt",
        read_only: false
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
        const value = c[fn];

        // class name (for style)
        let cn = 'field_input';
        if (this.props.type === 'number')
            cn += ' field_input_nb';

        // start adornment
        let a = '';

        // special case
        // if (fn === 'life') a = '💙'; //❤️ 🤍♡
        if (this.props.type === 'bool') {
            return (
                <Checkbox
                    className={cn}
                    name={fn}
                    checked={value}
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
                   readOnly={this.props.read_only}
                   onChange={this.handleChange}
                   startAdornment={a}
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputFieldCharacter);
