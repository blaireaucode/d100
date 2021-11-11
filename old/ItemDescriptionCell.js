/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {mapDispatchToProps, mapStateToProps} from '../src/helpers/default_props'
import L from "../src/helpers/L"
import {character_add_item} from "../src/helpers/character_helpers";
import {update_character, update_g_team} from "../src/helpers/update_helpers";

class ItemDescriptionCell extends Component {

    constructor(props) {
        super(props);
        this.buy_item = this.buy_item.bind(this);
    }

    buy_item(id) {
        const character = this.props.game.team[id];
        console.log('buy item', this.props.data);
        const c = character_add_item(character, this.props.data);
        const t = update_character(this.props.game.team, c);
        const g = update_g_team(this.props.game, t);
        this.props.set_game(g);
    }

    render() {
        const c1 = this.props.game.team[1];
        const c2 = this.props.game.team[2];
        const c3 = this.props.game.team[3];
        const c4 = this.props.game.team[4];
        return <span className={'table_cell'}>
            {this.props.data.description}
            <p/>
            <L onClick={() => {
                this.buy_item(1)
            }}>💰 {c1.name}</L> &nbsp;&nbsp;&nbsp;&nbsp;
            <L onClick={() => {
                this.buy_item(2)
            }}>💰 {c2.name}</L> &nbsp;&nbsp;&nbsp;&nbsp;
            <L onClick={() => {
                this.buy_item(3)
            }}>💰 {c3.name}</L> &nbsp;&nbsp;&nbsp;&nbsp;
            <L onClick={() => {
                this.buy_item(4)
            }}>💰 {c4.name}</L>
        </span>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemDescriptionCell)
