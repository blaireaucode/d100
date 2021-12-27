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
import L from "../helpers/L";
import CollapsibleHelp from "./CollapsibleHelp";
import C from "../helpers/C";
import Clear from "./Clear";
import update from "immutability-helper";
import {update_g_room} from "../helpers/helpers_update";
import {create_D100_rolling_dices, getRandomInt, open_dice_ui} from "../helpers/helpers_dice";
import {get_item_in_table} from "../helpers/helpers_equipment";

class RoomSearch extends Component {

    search = () => {
        const r = this.props.game.room;
        const total = getRandomInt(1, 100);
        let mod = 0;
        if (r.color === 'red') mod = 10;
        if (r.color === 'green') mod = 5;
        if (r.color === 'blue') mod = 20;
        const v = Math.max(0, Math.min(100, mod + total));
        const f = get_item_in_table('find', v, true);
        const s = {already_searched: true, dice: total, mod: mod, find: f, value: v};
        const room = update(r, {search: {$set: s}});
        let g = update_g_room(this.props.game, room);
        // ui dice
        const dices = create_D100_rolling_dices(total);
        g = open_dice_ui(g, total, dices);
        this.props.set_game(g);
    }

    clear = () => {
        const r = this.props.game.room;
        const s = {already_searched: false};
        const room = update(r, {search: {$set: s}});
        const g = update_g_room(this.props.game, room);
        this.props.set_game(g);
    }

    render() {
        const r = this.props.game.room;
        if (r.search.already_searched === true) return this.render_already_searched()
        return (
            <span>
               <L onClick={this.search}>Search the area</L>
               <C width={'3ch'}/>
                <CollapsibleHelp text={'(?)'}>
                    <C width={'80ch'}>
                    The adventurer may search each area once per game, and hunt for anything of interest. The player rolls 1d100 on table F – Find and follows the instructions for the result rolled. Certain areas may provide a modifier to the roll when they are searched, and the player applies the modifier to the roll before looking up the result; the modifiers are as follows:
                    <br/>
                    <span className={'room_color_yellow'}>◼ (Yellow) +0 </span><C width={'3ch'}/>
                    <span className={'room_color_red'}>◼ (Red) +10</span><C width={'3ch'}/>
                    <span className={'room_color_green'}>◼ (Green) +5 </span><C width={'3ch'}/>
                    <span className={'room_color_blue'}>◼ (Blue) +20</span>
                    <br/>
                    If the result has an adjustment to the time track, the player shades the required number of Â on the time track. When an area has been searched, the player marks an (S) in the bottom left of the area as a reminder that it has been searched and cannot be searched again.
                    </C>
            </CollapsibleHelp>
            </span>
        );
    }

    render_already_searched() {
        const s = this.props.game.room.search;
        const f = this.props.game.room.search.find;
        return <span>
                    <Clear onClick={this.clear}/>
                    <C width={'2ch'}/>
                    Searching <C width={'1ch'}/> ➜ <C width={'1ch'}/> {s.dice} + {s.mod} = {s.value}
                    <p/>
                    {f.detail}
               </span>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomSearch)
