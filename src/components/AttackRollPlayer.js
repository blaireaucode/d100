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
import InputFieldCharacter from "./InputFieldCharacter";
import {get_item_at_slot, is_attack_hit} from "../helpers/equipment_helpers";
import CollapsibleHelp from "./CollapsibleHelp";

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
        let txt2 = '';
        const weapon = get_item_at_slot(this.props.game, 5); // 5 = Hands
        let att_type = 'str';
        if (weapon === 'none') return 'no weapon, flee!';
        if (weapon.type.includes('R')) { // Hand Weapons (H)
            att_type = 'dex';
        }
        // FIXME what when both D and R ?? keep max ?
        txt2 = <span> Adjusted {att_type}: &nbsp;
            <InputFieldCharacter type={'number'}
                                 read_only={true}
                                 field_name={att_type}
                                 mod={c[att_type + '_items']}/>
                </span>
        let att = '';
        if (e.attack.d100 !== 'none') { // attack exist
            att = e.attack.d100;
            if (is_attack_hit(c, att_type, att))
                txt = <span className={'attack_hit'}>Hit !</span>
            else txt = <span className={'attack_miss'}>miss</span>

        }
        // clear
        const clear = clear_if_not_none(this, e.attack.d100);
        return (
            <span>
                {clear} <AttackToggle/>
                &nbsp;Attacks &nbsp; <L onClick={this.roll_attack}>D100 &#127922;</L>
                <C width={'1ch'}/>
                {att}
                <C width={'4ch'}/>
                {txt2}
                <C width={'1ch'}/>
                {txt}
                <C width={'4ch'}/>
                <CollapsibleHelp text={'(?)'}>
                    To attack a monster, the player rolls 1d100 and must score equal to, or below the adventurer’s adjusted Str, or Dex value; which is used depends on the weapon being used. Hand Weapons (H) use Str, whilst Ranged Weapons (R) use Dex to hit the monster. If the character has two weapons equipped, either may be used to attack, but not both. If the result scores a hit go to step 4, otherwise go to step 5.
                </CollapsibleHelp>
            </span>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttackRollPlayer)
