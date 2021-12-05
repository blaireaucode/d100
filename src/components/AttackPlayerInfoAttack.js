/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {mapDispatchToProps, mapStateToProps} from 'helpers/default_props'
import C from "../helpers/C";
import InputFieldCharacter from "./InputFieldCharacter";
import {get_item_at_slot} from "../helpers/equipment_helpers";
import CollapsibleHelp from "./CollapsibleHelp";

class AttackRollPlayer extends Component {

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
        return (
            <span>
                Current weapon: <C width={'1ch'}/>
                <span className={'help'}>
                    {weapon.name}
                    <C width={'4ch'}/>
                    Adjusted {att_type}: &nbsp;
                    <InputFieldCharacter type={'number'}
                                         read_only={true}
                                         width={'6ch'}
                                         class_name={'field_input_small'}
                                         field_name={att_type}
                                         mod={c[att_type + '_items']}/>
                    Dmg modifier: &nbsp;
                    <InputFieldCharacter type={'number'}
                                         read_only={true}
                                         class_name={'field_input_small'}
                                         width={'6ch'}
                                         field_name={'dmg_items'}/>
                </span>
                <C width={'1ch'}/>
                {txt}
                <C width={'1ch'}/>
                <CollapsibleHelp text={'(?)'}>
                    To attack a monster, the player rolls 1d100 and must score equal to, or below the adventurer’s adjusted Str, or Dex value; which is used depends on the weapon being used. Hand Weapons (H) use Str, whilst Ranged Weapons (R) use Dex to hit the monster. If the character has two weapons equipped, either may be used to attack, but not both. If the result scores a hit go to step 4, otherwise go to step 5.
                </CollapsibleHelp>
            </span>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttackRollPlayer)
