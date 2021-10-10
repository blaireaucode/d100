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
import * as up from 'helpers/update_helpers'

class CharacterInputField extends Component {

    handleChange = ({target}) => {
        const g = up.update_g_character_field(this.props.game, this.props.character.id, this.props.field_name, target.value)
        this.props.set_game(g)
    };

    render() {
        let cn = 'field_input';
        if (this.props.type === 'number')
            cn += ' field_input_nb'
        const value = this.props.character[this.props.field_name];
        let a = '';
        if (this.props.field_name === 'life') a = '💙'; //❤️ 🤍♡
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

export default connect(mapStateToProps, mapDispatchToProps)(CharacterInputField);
