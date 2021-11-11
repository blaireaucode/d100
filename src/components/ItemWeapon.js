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
import {get_weapon_in_table, update_g_add_item} from "../helpers/equipment_helpers";
import L from "../helpers/L";
import {update_g_encounter_field} from "../helpers/update_helpers";

class ItemWeapon extends Component {

    constructor(props) {
        super(props);
        this.buy_item = this.buy_item.bind(this);
    }

    buy_item() {
        const item = get_weapon_in_table(this.props.id);
        const gp = this.props.game.characteristics.gold_pieces - item.gp;
        let g = update_g_encounter_field(this.props.game, 'gold_pieces', gp);
        g = update_g_add_item(g, item);
        this.props.set_game(g);
    }

    render() {
        const item = get_weapon_in_table(this.props.id, false);
        return (
            <span>
                {item.d100} &nbsp;
                {item.name} &nbsp;
                {item.hands} &nbsp;
                {item.type} &nbsp;
                {item.dmg} &nbsp;
                {item.gp} &nbsp;
                {item.cost} &nbsp;
                <L onClick={this.buy_item}>Buy</L>
            < /span>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ItemWeapon)
