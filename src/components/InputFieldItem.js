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
        //const v = this.props.type === 'number' ? parseInt(target.value):target.value;
        const g = update_g_item(this.props.game, this.props.id, fn, v);
        this.props.set_game(g);
    };

    render() {
        // input : props.characteristic props.field_name
        const items = this.props.items === false ? this.props.game.items : this.props.items;
        const fn = this.props.field_name;
        let value = '';
        let ro = this.props.read_only;
        let ctype = this.props.type;

        // class name (for style)
        let align = this.props.align;
        let cn = this.props.class_name;
        //console.log('input field ', fn, ctype)
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
            <Input className={cn}
                   disableUnderline={true}
                   type={ctype}
                   name={fn}
                   value={value}
                   style={{width: this.props.width}}
                   inputProps={{style: {textAlign: align}}}
                   readOnly={ro}
                   onChange={this.handleChange}
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputFieldItem);
