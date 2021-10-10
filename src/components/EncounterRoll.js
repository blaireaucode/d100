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
import {clear_action, new_encounter} from "../helpers/encounter_helpers"
import {D6, open_dice_ui} from "../helpers/dice_helpers"
import Select from '@material-ui/core/Select'
import {update_g_encounter} from "../helpers/update_helpers";
import Clear from "./Clear";

const options = [
    <option key="0" value="0">-</option>,
    <option key="1" value="1">1</option>,
    <option key="2" value="2">2</option>,
    <option key="3" value="3">3</option>,
    <option key="4" value="4">4</option>,
    <option key="5" value="5">5</option>,
    <option key="6" value="6">6</option>,
];

class Room extends Component {

    constructor(props) {
        super(props);
        this.state = {value: 'vermin'};
        if ('encounter' in this.props.game.room)
            if ('id' in this.props.game.room.encounter)
                this.state.value = this.props.game.room.encounter.type;
        this.handle_change = this.handle_change.bind(this);
        this.roll_encounter = this.roll_encounter.bind(this);
        this.set_encounter = this.set_encounter.bind(this);
        this.clear = this.clear.bind(this);
    }

    clear() {
        const g = update_g_encounter(this.props.game, {})
        this.props.set_game(g);
    }

    set_encounter(e) {
        const d = parseInt(e.target.value);
        let g = clear_action(this.props.game);
        g = new_encounter(g, this.state.value, d);
        this.props.set_game(g);
    }

    roll_encounter() {
        const dice = D6(false);
        let g = clear_action(this.props.game);
        g = new_encounter(g, this.state.value, dice.total);
        g = open_dice_ui(g, dice);
        this.props.set_game(g);
        this.setState({value: this.state.value});
    }

    handle_change(event) {
        this.clear();
        this.setState({value: event.target.value});
    }

    render() {
        let id = 0
        if ('encounter' in this.props.game.room)
            if ('id' in this.props.game.room.encounter)
                id = this.props.game.room.encounter.id
        return (
            <span>
                &nbsp;
                <L onClick={this.roll_encounter}>&#127922;</L>
                &nbsp;&nbsp;
                <Select value={this.state.value}
                        onChange={this.handle_change}>
                    <option value="vermin">Vermin</option>
                    <option value="minion">Minions</option>
                    <option value="boss">Boss</option>
                    <option value="weird">Weird Monster</option>
                </Select>
                &nbsp;

                <Select value={id}
                        onChange={this.set_encounter}>
                    {options}
                </Select>
                &nbsp;&nbsp;
                <Clear onClick={this.clear}/>
            < /span>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Room)
