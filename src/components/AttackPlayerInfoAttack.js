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

class AttackPlayerInfoAttack extends Component {

    render() {
        const c = this.props.game.characteristics;
        const weapon = get_item_at_slot(this.props.game, 5); // 5 = Hands
        let att_type = 'str';
        if (weapon === 'none') return <span>no weapon, flee!<br/></span>;
        if (weapon.type.includes('R')) { // Hand Weapons (H)
            att_type = 'dex';
        }
        // FIXME what when both D and R ?? keep max ?
        return (
            <span>
                <C width={'16ch'}>Health Points</C>
                <InputFieldCharacter field_name={'hp'} type={'number'} width={'5ch'}/><br/>
                <C width={'16ch'}>Current weapon</C>
                <C className={'help'} width={'66ch'}>
                    <C width={'25ch'}>{weapon.name}</C>
                    <C width={'20ch'}>Adjusted {att_type}:
                    <InputFieldCharacter type={'number'}
                                         read_only={true}
                                         width={'5ch'}
                                         align={'center'}
                                         class_name={'field_input_small'}
                                         field_name={att_type}
                                         mod={c[att_type + '_items']}/>
                    </C>
                    <C width={'20ch'}>Dmg modifier:
                    <InputFieldCharacter type={'number'}
                                         read_only={true}
                                         class_name={'field_input_small'}
                                         width={'5ch'}
                                         align={'right'}
                                         field_name={'dmg_items'}/>
                    </C>
                </C>
                <CollapsibleHelp text={'(?)'}>
                    To attack a monster, the player rolls 1d100 and must score equal to, or below the adventurer’s adjusted Str, or Dex value; which is used depends on the weapon being used. Hand Weapons (H) use Str, whilst Ranged Weapons (R) use Dex to hit the monster. If the character has two weapons equipped, either may be used to attack, but not both. If the result scores a hit go to step 4, otherwise go to step 5.
                </CollapsibleHelp>
            </span>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttackPlayerInfoAttack)
