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
import {d100_interval_min_max, new_encounter} from "../helpers/helpers_encounter"
import {create_D100_rolling_dices, getRandomInt, open_dice_ui} from "../helpers/helpers_dice"
import * as up from "../helpers/helpers_update";
import {update_g_encounter} from "../helpers/helpers_update";
import Clear from "./Clear";
import encounters_table from 'tables/table_e_encounter.json'
import {MenuItem, Select} from "@material-ui/core";
import InputFieldCharacter from "./InputFieldCharacter";
import C from "../helpers/C";

class EncounterRoll extends Component {

    options = [];

    constructor(props) {
        super(props);
        this.set_encounter = this.set_encounter.bind(this);
        this.roll_encounter = this.roll_encounter.bind(this);
        this.clear = this.clear.bind(this);
        // list of encounters
        const table = encounters_table;
        for (let i in table) {
            const e = table[i];
            const min = d100_interval_min_max(e.d100)[0];
            const op =
                <MenuItem key={e.name} value={min} className={'field_input_small_select'}>
                    {e.d100} {e.name}
                </MenuItem>;
            this.options.push(op);
        }
        // state (needed)
        const id = d100_interval_min_max(this.props.game.encounter.d100)[0];
        this.state = {current: id};
    }

    clear() {
        const e = new_encounter();
        const g = update_g_encounter(this.props.game, e);
        this.props.set_game(g);
        this.setState({current: e.dmin});
    }

    set_encounter(e) {
        const selected_value = e.target.value;
        let i;
        for (i in encounters_table) {
            const enc = encounters_table[i];
            const emin = d100_interval_min_max(enc.d100)[0];
            const emax = d100_interval_min_max(enc.d100)[1];
            if (selected_value === emin || (selected_value >= emin && selected_value <= emax)) {
                const encounter = new_encounter(emin);
                const g = up.update_g_encounter(this.props.game, encounter);
                this.props.set_game(g);
                this.setState({current: emin});
                return;
            }
        }
    }

    roll_encounter() {
        const total = getRandomInt(1, 100);
        const t = Math.min(100, Math.max(1,
            total + parseInt(this.props.game.characteristics.encounter_modifier)));

        // encounter
        const e = new_encounter(t);
        let g = up.update_g_encounter(this.props.game, e);

        // rolling dice
        const dices = create_D100_rolling_dices(total);
        g = open_dice_ui(g, total, dices);
        this.props.set_game(g);
        const emin = d100_interval_min_max(e.d100)[0];
        this.setState({current: emin});
    }

    render() {
        const e = this.props.game.encounter;
        const clear = e.d100 === 'none' ? '' : <Clear onClick={this.clear}/>;
        const p = {width: '4ch', align: 'right', type: 'number'}
        return (
            <span>
                Monster : &nbsp;
                <L onClick={this.roll_encounter}>🎲 D100</L>
                <InputFieldCharacter {...p} field_name={'encounter_modifier'} width={'5ch'}/>
                <C width={'4ch'}/>
                <Select value={this.state.current}
                        disableUnderline={true}
                        defaultValue={'none'}
                        className={'select'}
                        onChange={this.set_encounter}>
                    {this.options}
                </Select>
                &nbsp;
                {clear}
            < /span>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(EncounterRoll)
