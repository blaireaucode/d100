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
import Clear from "./Clear";
import {create_D100_rolling_dices, getRandomInt, open_dice_ui} from "../helpers/dice_helpers";
import {update_g_encounter_field} from "../helpers/update_helpers";
import F from 'helpers/F';
import {new_attack} from "../helpers/encounter_helpers";
import EncounterInputField from "./EncounterInputField";
import AttackToggle from "./AttackToggle";

class AttackRollEncounter extends Component {

    constructor(props) {
        super(props);
        this.roll_attack = this.roll_attack.bind(this);
        this.clear = this.clear.bind(this);
    }

    roll_attack() {
        const att = this.props.game.encounter.attack;
        const total = getRandomInt(1, 100);
        const a = new_attack(total, att.dmg, 'encounter');
        let g = update_g_encounter_field(this.props.game, 'attack', a);
        // rolling dice
        const dices = create_D100_rolling_dices(total);
        g = open_dice_ui(g, total, dices);
        this.props.set_game(g);
    }

    clear() {
        const a = new_attack('none', 'none', 'encounter');
        const g = update_g_encounter_field(this.props.game, 'attack', a);
        this.props.set_game(g);
    }

    render() {
        const e = this.props.game.encounter;
        let str_res = '';
        let dex_res = '';
        let att = '';
        if (e.attack.d100 !== 'none') { // attack exist
            att = e.attack.d100;
            if (att <= e.av)
                str_res = <span className={'attack_hit'}>Hit !</span>
            else str_res = <span className={'attack_miss'}>miss</span>
        }
        // clear
        const clear = e.attack.d100 === 'none' ? '' : <Clear onClick={this.clear}/>;
        return (
            <span>
                Monster is attacking &nbsp; <AttackToggle/>  &nbsp; <L onClick={this.roll_attack}>D100 &#127922;</L>
                &nbsp;&nbsp;&nbsp;
                {att}
                &nbsp;&nbsp;&nbsp;
                {clear}
                &nbsp;&nbsp;&nbsp;
                <F>
                    Monster Attack Value (AV): <EncounterInputField type={'number'} field_name={'av'}/>
                    {str_res}
                </F>

            </span>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttackRollEncounter)
