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
import {get_item_at_hit_location} from "../helpers/helpers_equipment";
import CollapsibleHelp from "./CollapsibleHelp";
import InputFieldItem from "./InputFieldItem";
import InputItemTrack from "./InputItemTrack";

class AttackPlayerInfoArmour extends Component {

    render() {
        let aname = '';
        let item = '(when defend, depends on hit location)';
        const att = this.props.game.encounter.attack;
        if (att.who_attack === 'encounter') {
            const armour = get_item_at_hit_location(this.props.game);
            if (armour !== '') {
                if (armour === 'none') {
                    item = '';
                    aname = 'nothing at: ' + this.props.game.encounter.location.location + ' ';
                } else {
                    const p = {items: this.props.game.items, id: armour.id, class_name: 'field_input_small'};
                    item = <span>
                            <C width={'25ch'}>{armour.name}</C>
                            <C width={'14ch'}>Armour damage:</C>
                            <InputItemTrack {...p} field_name={'damaged'} />
                            <C width={'3ch'}/>
                            <C width={'4ch'}>AS:</C>
                            <InputFieldItem {...p} field_name={'AS'} width={'4ch'} align={'left'}/>
                        </span>
                    aname = '';
                }
            }
        }
        return (
            <span>
                <C width={'16ch'}>Current armour</C>
                <C className={'help'} width={'66ch'}>
                    {aname}
                    {item}
                </C>
                <CollapsibleHelp text={'(?)'}>
                  Some armour offers protection when an adventurer takes damage. The Armour (A) value shown protects a specific location and is deducted from a monsters damage score.
                </CollapsibleHelp>
            </span>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttackPlayerInfoArmour)
