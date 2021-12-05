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
import {create_D100_rolling_dices, getRandomInt, open_dice_ui} from "../helpers/dice_helpers";
import {update_g_encounter_field} from "../helpers/update_helpers";
import {new_attack} from "../helpers/encounter_helpers";
import AttackToggle from "./AttackToggle";
import {clear_if_not_none} from "../helpers/ui_helpers";
import C from "../helpers/C";
import {get_item_at_slot, is_attack_hit} from "../helpers/equipment_helpers";

class AttackRollPlayer extends Component {

    constructor(props) {
        super(props);
        this.roll_attack = this.roll_attack.bind(this);
        this.clear = this.clear.bind(this);
    }

    roll_attack() {
        const att = this.props.game.encounter.attack;
        const total = getRandomInt(1, 100);
        const a = new_attack(total, att.dmg, att.who_attack);
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
        const c = this.props.game.characteristics;
        let txt = '';
        const weapon = get_item_at_slot(this.props.game, 5); // 5 = Hands
        let att_type = 'str';
        if (weapon === 'none') return 'no weapon, flee!';
        if (weapon.type.includes('R')) { // Hand Weapons (H)
            att_type = 'dex';
        }
        // FIXME what when both D and R ?? keep max ?
        let att = '';
        if (e.attack.d100 !== 'none') { // attack exist
            att = e.attack.d100;
            if (is_attack_hit(c, att_type, att))
                txt = <span className={'attack_hit'}>Hit 💥 </span>
            else txt = <span className={'attack_miss'}>missed</span>
            txt = <span> ➜ &nbsp; {txt}</span>
        }
        // clear
        const clear = clear_if_not_none(this, e.attack.d100);
        return (
            <span>
                <C width={'20ch'}>
                    {clear}
                    Attacks &nbsp;
                    <AttackToggle/>
                </C>
                <L onClick={this.roll_attack}>🎲 D100</L>
                <C width={'2ch'}/>
                {att}
                <C width={'1ch'}/>
                {txt}
            </span>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttackRollPlayer)
