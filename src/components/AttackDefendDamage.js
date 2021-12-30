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
import {get_item_at_hit_location, get_item_at_slot, update_g_item} from "../helpers/helpers_equipment";
import {compute_dmg, update_attack_field, update_g_encounter_field} from "../helpers/helpers_encounter";
import AttackDefendDamageShield from "./AttackDefendDamageShield";
import AttackDefendDamageDeflect from "./AttackDefendDamageDeflect";

class AttackDefendDamage extends Component {

    constructor(props) {
        super(props);
        this.state = {checked: false}
        const att = this.props.game.encounter.attack;
        if ('deflect' in att)
            if (att.deflect > 0) {
                this.state = {checked: true}
            }
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        const e = this.props.game.encounter;
        const att = e.attack;
        const c = !att.deflect > 0;
        this.setState({checked: c});
        let item = get_item_at_slot(this.props.game, 6);
        const value = parseInt(item.AS.substr(1));
        const d = c ? value : 0;
        const pip = c ? 0.5 : -0.5;
        const a = update_attack_field(this.props.game.encounter.attack, 'deflect', d);
        let g = update_g_encounter_field(this.props.game, 'attack', a);
        g = update_g_item(g, item.id, 'damaged', parseFloat(item.damaged) + pip);
        this.props.set_game(g);
    }

    render() {
        const e = this.props.game.encounter;
        const att = e.attack;
        if (att.dmg === 'none') return '';
        if (att.who_attack === 'character') return '';
        const r = compute_dmg(this.props.game);
        //console.log('r', r)
        if (r.total <= 0 && att.deflect === 0) return '';
        // Is the hero as a shield off hand ?
        let item = get_item_at_slot(this.props.game, 6); // Off hand
        if (item !== 'none') {
            if ('AS' in item) {
                if (item.AS.includes('S')) {
                    return (<AttackDefendDamageShield id={item.id}/>);
                }
            }
        }
        // No shield, we may deflect ?
        item = get_item_at_hit_location(this.props.game);
        if (item !== 'none') {
            if (item.item_type === 'armour' || item.item_type === 'weapon') {
                return (<AttackDefendDamageDeflect id={item.id}/>);
            }
        }
        return '';
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttackDefendDamage)
