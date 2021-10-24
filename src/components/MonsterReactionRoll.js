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
import {Select} from "@material-ui/core";
import Clear from "./Clear";

class MonsterReactionRoll extends Component {

    options = [];

    constructor(props) {
        super(props);
        this.set_reaction = this.set_reaction.bind(this);
        this.roll_reaction = this.roll_reaction.bind(this);
        this.clear = this.clear.bind(this);
        // list of encounters
        const table = reaction_table;
        const op = <option key={''} value={''}>{'- none - '}</option>;
        this.options.push(op);
        for (let i in table) {
            const e = table[i];
            const op = <option key={e.d10} value={e.d10}>{e.d10} - {e.reaction}</option>;
            this.options.push(op);
        }
    }

    clear() {
        const g = up.update_g_encounter_field(this.props.game, 'reaction', {});
        this.props.set_game(g);
    }

    set_reaction(e) {
        let i;
        if ('' === e.target.value) {
            let g = up.update_g_encounter_field(this.props.game, 'reaction', {});
            this.props.set_game(g);
            return;
        }
        for (i in reaction_table) {
            const enc = reaction_table[i];
            const id = enc.d10
            if (id === e.target.value) {
                const e = new_reaction(id);
                let g = up.update_g_encounter_field(this.props.game, 'reaction', e);
                this.props.set_game(g);
                return;
            }
        }
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
    }

    render() {
        const g = this.props.game;
        let id = '';
        if ('encounter' in g)
            if ('reaction' in g.encounter) {
                id = g.encounter.reaction.d10;
            }
        return (
            <span>
                Reaction : &nbsp; &nbsp;
                <L onClick={this.roll_reaction}>&#127922;</L>
                &nbsp; &nbsp; &nbsp;
                <Select value={id}
                        onChange={this.set_reaction}
                        className={'select'}>
                    {this.options}
                </Select>
                &nbsp; &nbsp; &nbsp;
                <Clear onClick={this.clear}/>
            < /span>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(MonsterReactionRoll)
