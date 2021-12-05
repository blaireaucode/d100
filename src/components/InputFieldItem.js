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
        type: "text",
        width: 80,
        id: 'header',
        class_name: 'field_input',
        items: false,
        read_only: false,
        align: 'left'
    }

    handleChange = ({target}) => {
        const fn = this.props.field_name;
        const v = target.value;
        const g = update_g_item(this.props.game, this.props.id, fn, v);
        this.props.set_game(g);
    };

    render() {
        const items = this.props.items === false ? this.props.game.items : this.props.items;
        const fn = this.props.field_name;
        let value = '';
        let ro = this.props.read_only;

        if (this.props.id in items) {
            const item = items[this.props.id];
            if (fn in item) {
                value = item[fn];
                // special case : hands
                if (fn === 'hands') {
                    if (value === 1) value = '|';
                    else if (value === 2) value = '||';
                    else value = '';
                }
            }
        }
        // special case for the first column in 'equipped items'
        if ((fn === 'd10') && (value > 10)) value = '';

        return (
            <Input className={this.props.class_name}
                   disableUnderline={true}
                   type={this.props.type}
                   name={fn}
                   value={value}
                   style={{width: this.props.width}}
                   inputProps={{style: {textAlign: this.props.align}}}
                   readOnly={ro}
                   onChange={this.handleChange}
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputFieldItem);
