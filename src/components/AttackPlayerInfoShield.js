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
import {get_item_at_slot} from "../helpers/helpers_equipment";
import CollapsibleHelp from "./CollapsibleHelp";
import InputFieldItem from "./InputFieldItem";

class AttackPlayerInfoShield extends Component {

    render() {
        const item = get_item_at_slot(this.props.game, 6);
        let name = 'no shield';
        if (item !== 'none') {
            if ('AS' in item) {
                const p = {items: this.props.game.items, id: item.id, class_name: 'field_input_small'};
                if (item.AS.includes('S'))
                    name = <span>
                            <C width={'25ch'}>
                                {item.name}
                                <InputFieldItem {...p} field_name={'AS'} width={'4ch'} align={'center'}/>
                            </C>
                            <C width={'25ch'}>
                                <C width={'14ch'}>Shield damage:</C>
                                <InputFieldItem {...p} field_name={'damaged'} type={'number'} width={'8ch'}
                                                align={'center'}/>
                            </C>
                       </span>
            }
        }
        return (
            <span>
                <C width={'16ch'}>Current shield</C>
                <C className={'help'} width={'66ch'}>
                    {name}
                </C>
                <CollapsibleHelp text={'(?)'}>
                    When an adventurer is damaged in combat, they may be able to deflect some of the damage to items they have equipped. It is entirely optional and the player may always allow the damage to be dealt to the adventurer. Items such as weapons and armour can be used to deflect up to 2 points of damage dealt to an adventurer, if they are equipped to the location the monster has struck; the damage is instead applied to the items damage track at the rate of 1 pip for each point deflected. Note that when an items damage track is full, it has been destroyed and is removed from the adventure sheet.
                    <p/>
                    <b>Shields</b> however, offer much better protection, as they are designed to withstand damage, and when they are equipped to an adventurer’s off hand slot they can be used to deflect a number of damage points equal to or less than the shields (S) rating, and from a blow that hits any location. In addition shields will suffer less damage, and each full point of damage deflected by a shield, shades just ½ a pip on its damage track.
                </CollapsibleHelp>
            </span>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttackPlayerInfoShield)
