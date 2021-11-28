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
import {new_room} from "../helpers/room_helpers"
import {create_D100_rolling_dices, getRandomInt, open_dice_ui} from "../helpers/dice_helpers"
import * as up from "../helpers/update_helpers";
import {update_g_room} from "../helpers/update_helpers";
import Clear from "./Clear";
import rooms_table from 'tables/table_m_mapping.json'
import {MenuItem, Select} from "@material-ui/core";

class RoomRoll extends Component {

    options = [];

    constructor(props) {
        super(props);
        this.set_room = this.set_room.bind(this);
        this.roll_room = this.roll_room.bind(this);
        this.clear = this.clear.bind(this);
        // list of rooms
        const table = rooms_table;
        for (let i in table) {
            const e = table[i];
            if (e.d100 === "none") {
                const op =
                    <MenuItem key={e.d100} value={e.d100.toString()} className={'field_input_small_select'}>
                        ∅
                    </MenuItem>;
                this.options.push(op);
            } else {
                const op =
                    <MenuItem key={e.d100} value={e.d100.toString()} className={'field_input_small_select'}>
                        {e.d100} {e.color} ({e.exits.length})
                    </MenuItem>;
                this.options.push(op);
            }
        }
        // state (needed)
        this.state = {current: this.props.game.room.d100};
    }

    clear() {
        const e = new_room("none");
        const g = update_g_room(this.props.game, e);
        this.props.set_game(g);
        this.setState({current: "none"});
    }

    set_room(e) {
        const selected_value = e.target.value;
        let i;
        for (i in rooms_table) {
            const room = rooms_table[i];
            const id = room.d100.toString();
            if (selected_value === id) {
                const room = new_room(id);
                const g = up.update_g_room(this.props.game, room);
                this.props.set_game(g);
                this.setState({current: id});
                return;
            }
        }
    }

    roll_room() {
        const total = getRandomInt(1, 100);

        // room
        const e = new_room(total);
        let g = up.update_g_room(this.props.game, e);

        // rolling dice
        const dices = create_D100_rolling_dices(total);
        g = open_dice_ui(g, total, dices);
        this.props.set_game(g);
        this.setState({current: e.d100});
    }

    render() {
        const e = this.props.game.room;
        const clear = e.d100 === 'none' ? '' : <Clear onClick={this.clear}/>;
        return (
            <span>
                Area : &nbsp;
                <L onClick={this.roll_room}>D100 &#127922;</L>
                &nbsp; &nbsp;
                <Select value={this.state.current}
                        disableUnderline={true}
                        defaultValue={'none'}
                        className={'select'}
                        onChange={this.set_room}>
                    {this.options}
                </Select>
                &nbsp;
                {clear}
            < /span>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(RoomRoll)
