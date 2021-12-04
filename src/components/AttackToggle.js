/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import L from 'helpers/L'
import {mapDispatchToProps, mapStateToProps} from 'helpers/default_props'
import {update_g_encounter_field} from "../helpers/update_helpers";
import {new_attack} from "../helpers/encounter_helpers";

class AttackToggle extends Component {

    constructor(props) {
        super(props);
        this.toggle_attack = this.toggle_attack.bind(this);
    }

    toggle_attack() {
        const att = this.props.game.encounter.attack;
        const w = att.who_attack === 'encounter' ? 'character' : 'encounter';
        const a = new_attack('none', 'none', w);
        let g = update_g_encounter_field(this.props.game, 'attack', a);
        this.props.set_game(g);
    }

    render() {
        const e = this.props.game.encounter;
        const text = e.attack.who_attack === 'encounter' ? '↺' : '↺';//'↺🛡' : '↺🗡';
        return (
            <L onClick={this.toggle_attack}>{text}</L>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttackToggle)
