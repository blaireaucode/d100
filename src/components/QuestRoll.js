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
import {new_quest} from "../helpers/quest_helpers"
import {create_D100_rolling_dices, getRandomInt, open_dice_ui} from "../helpers/dice_helpers"
import * as up from "../helpers/update_helpers"
import {get_table_element} from "../helpers/update_helpers"
import Clear from "./Clear"
import quests_table from 'tables/table_q_quests.json'
import {MenuItem, Select} from "@material-ui/core"
import QuestSummary from "./QuestSummary";
import C from "../helpers/C";

class QuestRoll extends Component {

    options = []

    constructor(props) {
        super(props);
        this.set_quest = this.set_quest.bind(this);
        this.displayed_quest = this.displayed_quest.bind(this);
        this.roll_quest = this.roll_quest.bind(this);
        this.clear = this.clear.bind(this);
        // list of quests
        const table = quests_table;
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
                        {e.d100} - {e.name}
                    </MenuItem>;
                this.options.push(op);
            }
        }
        // state (needed)
        this.state = {current: 'none', quest: 'none'};
    }

    clear() {
        this.setState({current: 'none', quest: 'none'});
    }

    set_quest() {
        const id = this.state.current;
        const quest = new_quest(id);
        const g = up.update_g_quest(this.props.game, quest);
        this.props.set_game(g);
    }

    displayed_quest(e) {
        const id = e.target.value;
        const q = get_table_element(quests_table, id, false);
        this.setState({current: q.d100, quest: q});
    }

    roll_quest() {
        const total = getRandomInt(1, 10); // FIXME to change to 100 !
        this.displayed_quest({target: {value: total}});
        const dices = create_D100_rolling_dices(total);
        const g = open_dice_ui(this.props.game, total, dices);
        this.props.set_game(g);
    }

    render() {
        const id = this.state.current;
        const clear = id === 'none' ? '' : <Clear onClick={this.clear}/>;
        const use = id === 'none' ? '' : <L onClick={this.set_quest}>use this quest</L>
        return (
            <span>
                Roll for a quest : &nbsp;
                <L onClick={this.roll_quest}>🎲 &nbsp; D100</L>
                &nbsp; &nbsp;
                <Select value={this.state.current}
                        disableUnderline={true}
                        defaultValue={'none'}
                        className={'select'}
                        onChange={this.displayed_quest}>
                    {this.options}
                </Select>
                &nbsp;
                {clear}
                <p/>
                <QuestSummary quest={this.state.quest}/>
                <p/>
                <C width={'4ch'}/> {use}
            < /span>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(QuestRoll)
