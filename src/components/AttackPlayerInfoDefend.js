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
import {get_item_at_hit_location} from "../helpers/equipment_helpers";
import CollapsibleHelp from "./CollapsibleHelp";
import InputFieldItem from "./InputFieldItem";

class AttackRollPlayer extends Component {

    render() {
        const armour = get_item_at_hit_location(this.props.game);
        let aname = '';
        let item = '';
        if (armour !== '') {
            if (armour === 'none') aname = 'nothing';
            else {
                const p = {items: this.props.game.items, id: armour.id, class_name: 'field_input_small'};
                item = <InputFieldItem {...p} field_name={'AS'} width={'3ch'} align={'center'}/>
                aname = armour.name;
            }
        }

        return (
            <span>
                Current armour at hit location: <C width={'1ch'}/>
                <span className={'help'}>
                    {aname}  &nbsp;
                    {item}
                </span>
                <C width={'4ch'}/>
                <CollapsibleHelp text={'(?)'}>
                  Some armour offers protection when an adventurer takes damage. The Armour (A) value shown protects a specific location and is deducted
from a monsters damage score.
                </CollapsibleHelp>
            </span>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttackRollPlayer)
