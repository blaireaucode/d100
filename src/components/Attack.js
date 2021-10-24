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
import {get_current_action, get_current_character, update_attack, update_defend} from "../helpers/encounter_helpers"
import FieldInput from "./CharacterInputField"
import FightActionRoll from "./FightActionRoll"
import Grid from '@material-ui/core/Grid'
import {open_dice_ui} from 'helpers/dice_helpers'

class Attack extends Component {

    constructor(props) {
        super(props);
        this.roll_attack = this.roll_attack.bind(this);
        this.roll_defend = this.roll_defend.bind(this);
    }

    roll_attack() {
        /*
        let g = update_attack(this.props.game, this.props.id);
        g = open_dice_ui(g, g.room.action.dice);
        this.props.set_game(g);
        */
    }

    roll_defend() {
        /*
        let g = update_defend(this.props.game, this.props.id);
        g = open_dice_ui(g, g.room.action.dice);
        this.props.set_game(g);
         */
    }

    render() {

        return (
            <span>
                Attack
            </span>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Attack)
