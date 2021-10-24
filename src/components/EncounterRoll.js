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
import {d100_interval_min_max, new_encounter} from "../helpers/encounter_helpers"
import {create_D100_rolling_dices, getRandomInt, open_dice_ui} from "../helpers/dice_helpers"
import * as up from "../helpers/update_helpers";
import {update_g_encounter} from "../helpers/update_helpers";
import Clear from "./Clear";
import encounters_table from 'tables/table_e_encounter.json'
import {Select} from "@material-ui/core";

class EncounterRoll extends Component {

    options = [];

    constructor(props) {
        super(props);
        this.set_encounter = this.set_encounter.bind(this);
        this.roll_encounter = this.roll_encounter.bind(this);
        this.clear = this.clear.bind(this);
        // list of encounters
        const table = encounters_table;
        const op = <option key={'none'} value={'none'}>{'- none - '}</option>;
        this.options.push(op);
        for (let i in table) {
            const e = table[i];
            const min = d100_interval_min_max(e.d100)[0];
            const op = <option key={e.name} value={min}>{e.d100} - {e.name}</option>;
            this.options.push(op);
        }
        // state (needed)
        let id = 'none';
        const g = this.props.game;
        if ('encounter' in g)
            if ('name' in g.encounter) {
                id = d100_interval_min_max(g.encounter.d100)[0];
            }
        this.state = {current: id};
    }

    clear() {
        const g = update_g_encounter(this.props.game, {})
        this.props.set_game(g);
        this.setState({current: 'none'});
    }

    set_encounter(e) {
        const selected_value = e.target.value;
        if (selected_value === 'none') {
            this.clear();
            return;
        }
        let i;
        for (i in encounters_table) {
            const enc = encounters_table[i];
            const emin = d100_interval_min_max(enc.d100)[0];
            if (emin === selected_value) {
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

        // encounter
        const e = new_encounter(total);
        let g = up.update_g_encounter(this.props.game, e);

        // rolling dice
        const dices = create_D100_rolling_dices(total);
        g = open_dice_ui(g, total, dices);
        this.props.set_game(g);
        this.setState({current: total});
    }

    render() {
        return (
            <span>
                Monster : &nbsp;
                <L onClick={this.roll_encounter}>D100 &#127922;</L>
                &nbsp; → &nbsp;
                <Select value={this.state.current}
                        defaultValue={'none'}
                        className={'select'}
                        onChange={this.set_encounter}>
                    {this.options}
                </Select>
                &nbsp;
                <Clear onClick={this.clear}/>
            < /span>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(EncounterRoll)
