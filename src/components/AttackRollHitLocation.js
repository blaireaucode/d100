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
import {create_D10_rolling_dice, getRandomInt, open_dice_ui} from "../helpers/helpers_dice";
import location_table from "../tables/table_hit_location.json";
import {MenuItem, Select} from "@material-ui/core";
import {new_location, update_g_encounter_field} from "../helpers/helpers_encounter";
import {clear_if_not_none} from "../helpers/helpers_ui";
import H from "../helpers/H";
import C from "../helpers/C";

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
            let txt;
            if (e.d100 === 'none') txt = 'none';
            else txt = <span>{e.d100} {e.location} ({e.dmg_mod})</span>
            const op = <MenuItem key={e.d100} value={e.d100}
                                 className={'field_input_small_select'}>
                {txt} </MenuItem>;
            this.options.push(op);
        }
        const id = this.props.game.encounter.location.d100;
        this.state = {current: id};
    }

    clear() {
        const l = new_location();
        const g = update_g_encounter_field(this.props.game, 'location', l);
        this.props.set_game(g);
        this.setState({current: l.d100});
    }

    set_location(e) {
        let i;
        for (i in location_table) {
            const enc = location_table[i];
            const id = enc.d100
            if (id.toString() === e.target.value.toString()) {
                const l = new_location(id);
                const g = update_g_encounter_field(this.props.game, 'location', l);
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
        let g = update_g_encounter_field(this.props.game, 'location', l);

        // rolling dice
        const dices = create_D10_rolling_dice(total);
        g = open_dice_ui(g, total, dices);
        this.props.set_game(g);
        this.setState({current: total});
    }

    render() {
        const l = this.props.game.encounter.location;
        const clear = clear_if_not_none(this, l.d100);
        const dmg = l.d100 === 'none' ? '' : <H>Damage modifier: {l.dmg_mod}</H>
        return (
            <span>
                <C width={'20ch'}>
                    {clear}
                    Hit Location
                </C>
                <L onClick={this.roll_location}>???? D6</L>
                <C width={'4ch'}/>
                <Select value={l.d100}
                        disableUnderline={true}
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
