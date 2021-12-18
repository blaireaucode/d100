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
import {apply_dmg, compute_dmg, new_location, toggle_attack} from "../helpers/encounter_helpers"
import C from "../helpers/C"
import InputFieldCharacter from "./InputFieldCharacter"
import F from "../helpers/F"
import {update_g_encounter_field} from "../helpers/update_helpers"

class AttackApplyDamage extends Component {

    constructor(props) {
        super(props);
        this.apply_damage = this.apply_damage.bind(this);
    }

    apply_damage() {
        let g = apply_dmg(this.props.game);
        const a = toggle_attack(g);
        const l = new_location();
        g = update_g_encounter_field(g, 'attack', a);
        g = update_g_encounter_field(g, 'location', l);
        // next round ? no
        //const round = parseInt(g.encounter.round) + 1;
        //g = update_g_encounter_field(g, 'round', round);
        this.props.set_game(g);
    }

    render() {
        const att = this.props.game.encounter.attack;
        if (att.who_attack === 'encounter') return this.render_encounter_attacks();
        return this.render_player_attacks();
    }

    render_encounter_attacks() {
        const r = compute_dmg(this.props.game);
        const c = this.props.game.characteristics;
        const p = {width: '4ch', align: 'right', type: 'number'}
        const total = r.total;
        if (total <= 0) return '';
        return (
            <span>
                <p/>
                <C width={'29ch'}/>
                <F>Current HP: </F>
                <C width={'1ch'}/>
                <InputFieldCharacter {...p} field_name={'hp'}
                                     mod={c.hp_items} read_only={true}
                                     align={'left'} width={'4ch'}/>
                <L onClick={this.apply_damage}> -{r.total} ✔  (apply this damage)</L>
            </span>
        );
    }

    render_player_attacks() {
        const r = compute_dmg(this.props.game);
        const total = r.total;
        if (total <= 0) return '';
        return (
            <span>
                <L onClick={this.apply_damage}>✔</L>
            </span>
        );
    }


}

export default connect(mapStateToProps, mapDispatchToProps)(AttackApplyDamage)
