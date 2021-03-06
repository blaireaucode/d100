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
import {create_D6_rolling_dice, getRandomInt, open_dice_ui} from "../helpers/helpers_dice";
import {compute_dmg, new_attack, update_g_encounter_field} from "../helpers/helpers_encounter";
import {clear_if_not_none} from "../helpers/helpers_ui";
import AttackApplyDamage from "./AttackApplyDamage";
import C from "../helpers/C";

class AttackRollDamage extends Component {

    constructor(props) {
        super(props);
        this.roll_damage = this.roll_damage.bind(this);
        this.clear = this.clear.bind(this);
    }

    roll_damage() {
        const att = this.props.game.encounter.attack;
        const total = getRandomInt(1, 6);
        const a = new_attack(att.d100, total, att.who_attack);
        let g = update_g_encounter_field(this.props.game, 'attack', a);
        // rolling dice
        const dices = create_D6_rolling_dice(total);
        g = open_dice_ui(g, total, dices);
        this.props.set_game(g);
    }

    clear() {
        const att = this.props.game.encounter.attack;
        const a = new_attack(att.d100, 'none', att.who_attack);
        const g = update_g_encounter_field(this.props.game, 'attack', a);
        this.props.set_game(g);
    }

    render() {
        const e = this.props.game.encounter;
        const att = e.attack;
        let dmg = att.dmg;
        if (dmg === 'none') dmg = '';
        else {
            const r = compute_dmg(this.props.game);
            dmg = r.txt
        }
        const clear = clear_if_not_none(this, att.dmg);
        return (
            <span>
                <C width={'20ch'}>
                    {clear}
                    Damage
                </C>
                <L onClick={this.roll_damage}>🎲 D6</L>
                <C width={'4ch'}/>
                {dmg}
                <C width={'1ch'}/>
                <AttackApplyDamage/>
            </span>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttackRollDamage)
