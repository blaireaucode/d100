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
import {new_reaction} from "../helpers/encounter_helpers"
import {create_D10_rolling_dice, getRandomInt, open_dice_ui} from "../helpers/dice_helpers"
import * as up from "../helpers/update_helpers";
import reaction_table from 'tables/table_monster_reaction.json'
import {MenuItem, Select} from "@material-ui/core";
import {clear_if_not_none} from "../helpers/ui_helpers";
import C from "../helpers/C";

class AttackRollEncounter extends Component {

    options = [];

    constructor(props) {
        super(props);
        this.set_reaction = this.set_reaction.bind(this);
        this.roll_reaction = this.roll_reaction.bind(this);
        this.clear = this.clear.bind(this);
        // list of reactions
        const table = reaction_table;
        const id = this.props.game.encounter.reaction.d100;
        for (let i in table) {
            const e = table[i];
            const op = <MenuItem key={e.d100} value={e.d100} className={'field_input_small_select'}>
                {e.d100} {e.reaction}</MenuItem>;
            this.options.push(op);
        }
        this.state = {current: id};
    }

    clear() {
        const r = new_reaction();
        const g = up.update_g_encounter_field(this.props.game, 'reaction', r);
        this.props.set_game(g);
        this.setState({current: r.d100});
    }

    set_reaction(e) {
        const r = new_reaction(e.target.value);
        let g = up.update_g_encounter_field(this.props.game, 'reaction', r);
        this.props.set_game(g);
        this.setState({current: r.d100});
    }

    roll_reaction() {
        const total = getRandomInt(1, 10);

        // encounter
        const e = new_reaction(total);
        let g = up.update_g_encounter_field(this.props.game, 'reaction', e);

        // rolling dice
        const dices = create_D10_rolling_dice(total);
        g = open_dice_ui(g, total, dices);
        this.props.set_game(g);
        this.setState({current: total});
    }

    render() {
        const r = this.props.game.encounter.reaction;
        const clear = clear_if_not_none(this, r.d100);
        return (
            <span>
                <C width={'20ch'}>
                    {clear}
                    Reaction
                </C>
                <L onClick={this.roll_reaction}>🎲 D6</L>
                <C width={'4ch'}/>
                <Select value={r.d100/*this.state.current*/}
                        disableUnderline={true}
                        defaultValue={'none'}
                        onChange={this.set_reaction}
                        className={'select'}>
                    {this.options}
                </Select>
            < /span>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(AttackRollEncounter)
