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
import L from "../helpers/L"
import C from "../helpers/C";
import {create_D100_rolling_dices, getRandomInt, open_dice_ui} from "../helpers/dice_helpers";
import {get_item_in_table, update_g_add_item} from "../helpers/equipment_helpers";

class HelpStartingItems extends Component {

    constructor(props) {
        super(props);
        this.state = {weapon: '', armour: '', needed: ''};
        this.roll_weapon = this.roll_weapon.bind(this);
        this.roll_armour = this.roll_armour.bind(this);
        this.get_needed = this.get_needed.bind(this);
    }

    roll_weapon() {
        const total = getRandomInt(1, 100);

        // add the item
        const w = get_item_in_table('weapon', total);
        let g = update_g_add_item(this.props.game, w);
        this.setState({...this.state, weapon: w.name});
        setTimeout(() => {
            this.setState({...this.state, weapon: ''});
        }, 10000);

        // rolling dice
        const dices = create_D100_rolling_dices(total);
        g = open_dice_ui(g, total, dices);
        this.props.set_game(g);
    }

    roll_armour() {
        const total1 = getRandomInt(1, 100);
        const total2 = getRandomInt(1, 100);
        const total3 = getRandomInt(1, 100);

        // add the item
        let w1 = get_item_in_table('armour', total1);
        let w2 = get_item_in_table('armour', total2);
        let w3 = get_item_in_table('armour', total3);

        // update
        let g = update_g_add_item(this.props.game, w1);
        g = update_g_add_item(g, w2);
        g = update_g_add_item(g, w3);
        const w = total1 + ' ' + w1.name + ' - ' + total2 + ' ' + w2.name + ' - ' + total3 + ' ' + w3.name;
        this.setState({...this.state, armour: w});
        setTimeout(() => {
            this.setState({...this.state, armour: ''});
        }, 10000);

        // rolling dice
        const dices = create_D100_rolling_dices(total3);
        g = open_dice_ui(g, total3, dices);
        this.props.set_game(g);
    }

    get_needed() {
        const oil = get_item_in_table('needed', 31);
        oil['number'] = 20;
        const food = get_item_in_table('needed', 16);
        food['number'] = 10;
        const picks = get_item_in_table('needed', 1);
        picks['number'] = 15;
        let g = update_g_add_item(this.props.game, oil);
        g = update_g_add_item(g, food);
        g = update_g_add_item(g, picks);
        this.props.set_game(g);
        this.setState({...this.state, needed: '20 oil ; 10 food ; 15 picks'});
        setTimeout(() => {
            this.setState({...this.state, needed: ''});
        }, 10000);
    }


    render() {
        return (
            <span>
            The adventurer begins the game with some basic equipment they have gathered together. Roll once on table W, and three times on table A for starting equipment. If you happen to roll a piece of armour that is assigned to a location you’ve already equipped an item to, you may either keep the new armour rolled (discard the old item), or roll again. Record all of the details from the table to the location slot shown on the adventure sheet and then add 20 oil, 10 food and 15 picks to the supplies area and 3 Lesser Healing Potions (restores 4 lost HP, 80gp) to the adventurer’s belt slots (one potion per slot) or backpack.
                <p/>
                    <L onClick={this.roll_weapon}>Roll one weapon</L>
                    <C width={'4ch'}/>
                {this.state.weapon}
                <br/>
                    <L onClick={this.roll_armour}>Roll three armours</L>
                    <C width={'4ch'}/>
                {this.state.armour}
                <br/>
                    <L onClick={this.get_needed}>Get starting needed items</L>
                    <C width={'4ch'}/>
                {this.state.needed}
            </span>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HelpStartingItems)