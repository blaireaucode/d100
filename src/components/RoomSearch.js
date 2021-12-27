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
import CollapsibleHelp from "./CollapsibleHelp";
import C from "../helpers/C";
import update from "immutability-helper";
import {update_g_room} from "../helpers/helpers_update";
import TableRoll from "./TableRoll";
import {get_item_in_table} from "../helpers/helpers_equipment";

class RoomSearch extends Component {

    search = (s) => {
        s.find = get_item_in_table(s.table, s.total, true);
        const r = this.props.game.room;
        const room = update(r, {search: {$set: s}});
        return update_g_room(this.props.game, room);
    }

    clear = () => {
        const r = this.props.game.room;
        let s = JSON.parse(JSON.stringify(r.search));
        s.dice = -1;
        const room = update(r, {search: {$set: s}});
        const g = update_g_room(this.props.game, room);
        this.props.set_game(g);
    }

    render() {
        const r = this.props.game.room;
        let mod = 0;
        if (r.color === 'red') mod = 10;
        if (r.color === 'green') mod = 5;
        if (r.color === 'blue') mod = 20;
        return (
            <div>
                <C width={'28ch'}>You can search once the area. </C>
                <CollapsibleHelp text={'(?)'}>
                    <C width={'80ch'}>
                        The adventurer may search each area once per game, and hunt for anything of interest. The player
                        rolls 1d100 on table F – Find and follows the instructions for the result rolled. Certain areas
                        may provide a modifier to the roll when they are searched, and the player applies the modifier
                        to the roll before looking up the result; the modifiers are as follows:
                        <br/>
                        <span className={'room_color_yellow'}>◼ (Yellow) +0 </span><C width={'3ch'}/>
                        <span className={'room_color_red'}>◼ (Red) +10</span><C width={'3ch'}/>
                        <span className={'room_color_green'}>◼ (Green) +5 </span><C width={'3ch'}/>
                        <span className={'room_color_blue'}>◼ (Blue) +20</span>
                        <br/>
                        If the result has an adjustment to the time track, the player shades the required number of Â
                        on the time track. When an area has been searched, the player marks an (S) in the bottom left of
                        the area as a reminder that it has been searched and cannot be searched again.
                    </C>
                </CollapsibleHelp>
                <br/>
                <C width={'9ch'}>Search</C>
                <TableRoll table={'find'}
                           mod={mod}
                           state={r.search}
                           change_table={false} change_mod={false}
                           on_roll={this.search}/>
                <C width={'3ch'}/>
            </div>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(RoomSearch)
