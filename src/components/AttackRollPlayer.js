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
import CharacterInputField from "./CharacterInputField"
import {create_D100_rolling_dices, getRandomInt, open_dice_ui} from "../helpers/dice_helpers";
import {update_g_encounter_field} from "../helpers/update_helpers";
import Clear from "./Clear";
import {new_attack} from "../helpers/encounter_helpers";
import F from 'helpers/F';
import AttackToggle from "./AttackToggle";

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
        const a = new_attack('none');
        const g = update_g_encounter_field(this.props.game, 'attack', a);
        this.props.set_game(g);
    }

    render() {
        const e = this.props.game.encounter;
        const c = this.props.game.characteristics;
        let str_res = '';
        let dex_res = '';
        let att = '';
        if (e.attack.d100 !== 'none') { // attack exist
            att = e.attack.d100;
            if (att <= c.str_adj)
                str_res = <span className={'attack_hit'}>Hit !</span>
            else str_res = <span className={'attack_miss'}>miss</span>
            if (att <= c.dex_adj)
                dex_res = <span className={'attack_hit'}>Hit !</span>
            else dex_res = <span className={'attack_miss'}>miss</span>
        }
        // clear
        const clear = e.attack.d100 === 'none' ? '' : <Clear onClick={this.clear}/>;
        return (
            <span>
                Attack &nbsp; <AttackToggle/>  &nbsp; <L onClick={this.roll_attack}>D100 &#127922;</L>
                &nbsp;&nbsp;&nbsp;
                {att}
                &nbsp;&nbsp;&nbsp;
                {clear}

                &nbsp;&nbsp;&nbsp;
                <F>
                    Current (adjusted) str: <CharacterInputField type={'number'} field_name={'str_adj'}/>
                    {str_res} &nbsp;&nbsp;&nbsp;&nbsp;
                </F>
                <F>
                    Current (adjusted) dex: <CharacterInputField type={'number'} field_name={'dex_adj'}/>
                    {dex_res}
                </F>
            </span>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttackRollPlayer)
