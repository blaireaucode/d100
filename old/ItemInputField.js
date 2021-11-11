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
import {mapDispatchToProps, mapStateToProps} from '../src/helpers/default_props'
import {update_g_item_field} from '../src/helpers/update_helpers'

class ItemInputField extends Component {

    handleChange = ({target}) => {
        const g = update_g_item_field(this.props.game, this.props.character_id, this.props.item.id, this.props.field_name, target.value);
        this.props.set_game(g);
    };

    render() {
        let cn = 'field_input';
        if (this.props.type === 'number')
            cn += ' field_input_nb'
        let a = '';
        //const character = this.props.game.team[this.props.character_id];
        //console.log('char', character)
        const value = this.props.item[this.props.field_name];
        if (this.props.field_name === 'cost') a = '💰'; //❤️ 🤍♡
        return (
            <Input className={cn}
                   disableUnderline={true}
                   type={this.props.type}
                   name={this.props.field_name}
                   value={value}
                   onChange={this.handleChange}
                   startAdornment={a}
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemInputField);
