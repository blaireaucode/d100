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
import {create_D100_rolling_dices, getRandomInt, open_dice_ui} from "../helpers/helpers_dice";
import {new_attack, update_g_encounter_field} from "../helpers/helpers_encounter";
import AttackToggle from "./AttackToggle";
import {clear_if_not_none} from "../helpers/helpers_ui";
import C from "../helpers/C";
import CollapsibleHelp from "./CollapsibleHelp";

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
        const att = this.props.game.encounter.attack;
        const a = new_attack('none', att.dmg, att.who_attack);
        const g = update_g_encounter_field(this.props.game, 'attack', a);
        this.props.set_game(g);
    }

    render() {
        const e = this.props.game.encounter;
        let str_res = '';
        let att = '';
        if (e.attack.d100 !== 'none') { // attack exist
            att = e.attack.d100;
            if (att <= e.av)
                str_res = <span className={'success'}>Hit 💥 </span>
            else str_res = <span className={'fail'}>miss</span>
            str_res = <span> ➜ &nbsp; {str_res}</span>
        }
        // clear
        const clear = clear_if_not_none(this, e.attack.d100);
        return (
            <span>

                <C width={'20ch'}>
                    {clear}
                    Monster attacks &nbsp;
                    <AttackToggle/>
                </C>
                <L onClick={this.roll_attack}>🎲 D100</L>
                <C width={'2ch'}/>
                {att}
                <C width={'1ch'}/>
                {str_res}
                <C width={'1ch'}/>
                <CollapsibleHelp text={'(?)'}>
                    If the monster attempted to escape and has remained, start a new combat round from Step 1, otherwise it will make an attack. Roll 1d100 equal to, or less than the monsters Attack Value (AV), and if the result scores a hit go to step 6, otherwise start a new combat round from step 1.
                </CollapsibleHelp>
            </span>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttackRollEncounter)
