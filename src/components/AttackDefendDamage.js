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
import {get_item_at_hit_location, get_item_at_slot} from "../helpers/equipment_helpers";

class AttackDefendDamage extends Component {

    render() {
        const e = this.props.game.encounter;
        const att = e.attack;
        if (att.dmg === 'none') return '';
        if (att.who_attack === 'character') return '';
        let item = get_item_at_slot(this.props.game, 6); // Off hand
        console.log('item', item);
        if (item !== 'none') {
            if ('AS' in item) {
                if (item.AS.includes('S'))
                    return <span>Shield available (deflect + 0.5pip)</span>
            }
        }
        item = get_item_at_hit_location(this.props.game);
        if (item !== 'none') {
            if (item.item_type === 'armour' || item.item_type === 'weapon')
                return <span>Deflection available at hit loc (deflect 2 max + 1pip for each)</span>
        }
        return '';
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttackDefendDamage)
