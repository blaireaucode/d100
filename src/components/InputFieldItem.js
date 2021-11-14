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
import {mapDispatchToProps, mapStateToProps} from 'helpers/default_props'
import {update_g_item} from "../helpers/equipment_helpers";

class InputFieldItem extends Component {

    static defaultProps = {
        type: "txt",
        width: 80,
        id: 'header',
        equipped: false,
        items: false,
        read_only: false
    }

    handleChange = ({target}) => {
        const fn = this.props.field_name;
        const v = target.value;
        const g = update_g_item(this.props.game, this.props.id, fn, v);
        this.props.set_game(g);
    };

    render() {
        // input : props.characteristic props.field_name
        const items = this.props.items === false ? this.props.game.items : this.props.items;
        const fn = this.props.field_name;
        let value = fn;
        let ro = this.props.read_only;

        // class name (for style)
        let cn = 'field_input';

        // start adornment
        let a = '';

        if (this.props.id !== 'header') {
            //console.log('items, item', items, this.props.id)
            const item = items[this.props.id];
            if (fn in item) {
                value = item[fn];
                // special case : hands
                if (fn === 'hands') {
                    if (value === 1) value = '✋';
                    else value = '✋✋';
                }
            } else { // field does not exist
                value = '';
                ro = true;
            }
        } else { // this is an header
            ro = true;
            cn = 'field_input_header';
            if (fn === 'gp') a = '💰';
            if (fn === 'cost') a = '💰';
        }

        //console.log('input field', this.props.id, fn, value);

        return (
            <Input className={cn}
                   disableUnderline={true}
                   type={this.props.type}
                   name={fn}
                   value={value}
                   style={{width: this.props.width}}
                   readOnly={ro}
                   onChange={this.handleChange}
                   startAdornment={a}
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputFieldItem);
