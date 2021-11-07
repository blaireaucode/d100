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
        // list of reactions
        const table = reaction_table;
        const id = this.props.game.encounter.reaction.d10;
        for (let i in table) {
            const e = table[i];
            const op = <option key={e.d10} value={e.d10}>{e.d10} {e.reaction}</option>;
            this.options.push(op);
        }
        this.state = {current: id};
    }

    clear() {
        const r = new_reaction();
        const g = up.update_g_encounter_field(this.props.game, 'reaction', r);
        this.props.set_game(g);
        this.setState({current: r.d10});
    }

    set_reaction(e) {
        const r = new_reaction(e.target.value);
        let g = up.update_g_encounter_field(this.props.game, 'reaction', r);
        this.props.set_game(g);
        this.setState({current: r.d10});
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
        const clear = r.d10 === 'none' ? '' : <Clear onClick={this.clear}/>;
        return (
            <span>
                Reaction &nbsp;
                <L onClick={this.roll_reaction}>D6 &#127922;</L>
                &nbsp; &nbsp;
                <Select value={r.d10/*this.state.current*/}
                        defaultValue={'none'}
                        onChange={this.set_reaction}
                        className={'select'}>
                    {this.options}
                </Select>
                &nbsp;
                {clear}
            < /span>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(MonsterReactionRoll)
