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
import {create_D10_rolling_dice, getRandomInt, open_dice_ui} from "../helpers/dice_helpers";
import * as up from "../helpers/update_helpers";
import Clear from "./Clear";
import location_table from "../tables/table_hit_location.json";
import {Select} from "@material-ui/core";
import {new_location} from "../helpers/encounter_helpers";
import F from 'helpers/F'
import {clear_if_not_none} from "../helpers/ui_helpers";

class AttackRollHitLocation extends Component {

    options = [];

    constructor(props) {
        super(props);
        this.set_location = this.set_location.bind(this);
        this.roll_location = this.roll_location.bind(this);
        this.clear = this.clear.bind(this);
        // list of location
        const table = location_table;
        for (let i in table) {
            const e = table[i];
            const op = <option key={e.d10} value={e.d10}>{e.d10} {e.location}</option>;
            this.options.push(op);
        }
        const id = this.props.game.encounter.location.d10;
        this.state = {current: id};
    }

    clear() {
        const l = new_location();
        const g = up.update_g_encounter_field(this.props.game, 'location', l);
        this.props.set_game(g);
        this.setState({current: l.d10});
    }

    set_location(e) {
        let i;
        for (i in location_table) {
            const enc = location_table[i];
            const id = enc.d10
            if (id.toString() === e.target.value.toString()) {
                const l = new_location(id);
                const g = up.update_g_encounter_field(this.props.game, 'location', l);
                this.props.set_game(g);
                this.setState({current: id});
                return;
            }
        }
    }

    roll_location() {
        const total = getRandomInt(1, 10);

        // encounter
        const l = new_location(total);
        let g = up.update_g_encounter_field(this.props.game, 'location', l);

        // rolling dice
        const dices = create_D10_rolling_dice(total);
        g = open_dice_ui(g, total, dices);
        this.props.set_game(g);
        this.setState({current: total});
    }

    render() {
        const l = this.props.game.encounter.location;
        const clear = clear_if_not_none(this, l.d10);
        const dmg = l.d10 === 'none' ? '' : <F>Damage modifier: {l.dmg_mod}</F>
        return (
            <span>
                {clear} Hit Location &nbsp;
                <L onClick={this.roll_location}>D6 &#127922;</L>
                &nbsp; &nbsp;
                <Select value={this.state.current}
                        defaultValue={'none'}
                        onChange={this.set_location}
                        className={'select'}>
                    {this.options}
                </Select>
                &nbsp;
                &nbsp;
                {dmg}
            < /span>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(AttackRollHitLocation)
