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

class EncounterInputField extends Component {

    static defaultProps = {
        type: "txt",
        read_only : false
    }

    handleChange = ({target}) => {
        const g = up.update_g_encounter_field(this.props.game, this.props.field_name, target.value)
        this.props.set_game(g)
    };

    render() {
        // input : props.characteristic props.field_name
        const c = this.props.game.encounter;
        const fn = this.props.field_name;
        const value = c[fn];

        let cn = 'field_input';
        if (this.props.type === 'number')
            cn += ' field_input_nb'

        let a = '';
        if (this.props.field_name === 'life') a = '💙'; //❤️ 🤍♡
        return (
            <Input className={cn}
                   disableUnderline={true}
                   type={this.props.type}
                   name={this.props.field_name}
                   value={value}
                   readOnly={this.props.read_only}
                   onChange={this.handleChange}
                   startAdornment={a}
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EncounterInputField);
