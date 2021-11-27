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
import {get_weapon_in_table, update_g_add_item} from "../helpers/equipment_helpers"
import L from "../helpers/L"
import {update_g_encounter_field} from "../helpers/update_helpers"
import C from "../helpers/C";


class ItemWeapon extends Component {

    static defaultProps = {
        class_name: ''
    }

    constructor(props) {
        super(props);
        this.buy_item = this.buy_item.bind(this);
        this.state = {buy: ''};
    }

    buy_item() {
        const item = get_weapon_in_table(this.props.id);
        const gp = this.props.game.characteristics.gold_pieces - item.gp;
        let g = update_g_encounter_field(this.props.game, 'gold_pieces', gp);
        g = update_g_add_item(g, item);
        this.props.set_game(g);
        this.setState({buy: 'You just bought it!'});
        setTimeout(() => {
            this.setState({buy: ''});
        }, 3000);
    }

    render() {
        //console.log('render', this.state);
        const item = get_weapon_in_table(this.props.id, false);
        return (
            <span className={this.props.class_name}>
                <C width={'8ch'}>{item.d100}</C>
                <C width={'20ch'}>{item.name}</C>
                <C width={'6ch'}>{item.hands}</C>
                <C width={'6ch'}>{item.type}</C>
                <C width={'5ch'}>{item.dmg}</C>
                <C width={'5ch'}>{item.gp}</C>
                <C width={'8ch'}>{item.fix_cost}</C>
                <L onClick={this.buy_item}>Buy</L>
                <C width={'5ch'}/>
                <C className={'field_input'}>{this.state.buy}</C>
            < /span>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ItemWeapon)
