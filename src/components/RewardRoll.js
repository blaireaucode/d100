/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {mapDispatchToProps, mapStateToProps} from 'helpers/default_props'
import F from "../helpers/F";
import C from "../helpers/C";
import {create_D100_rolling_dices, getRandomInt, open_dice_ui} from "../helpers/helpers_dice";
import {update_g_characteristic, update_g_encounter_field} from "../helpers/helpers_update";
import TableRoll from "./TableRoll";
import L from "../helpers/L";
import InputFieldCharacter from "./InputFieldCharacter";
import {get_total_hp} from "../helpers/helpers_encounter";

class RewardRoll extends Component {

    roll_reward = (s) => {
        return update_g_encounter_field(this.props.game, 'reward', s);
    }

    roll_reward_gp = () => {
        const total = getRandomInt(1, 100);
        const dices = create_D100_rolling_dices(total);
        let g = open_dice_ui(this.props.game, total, dices);
        const gpt = this.props.game.characteristics.gold_pieces + total;
        g = update_g_characteristic(g, 'gold_pieces', gpt);
        this.props.set_game(g);
    }

    render_gp = () => {
        return (<span>
                <L onClick={this.roll_reward_gp}>🎲 D100</L>
                <C width={'4ch'}/>
                <F>Current gold pieces 💰<C width={'1ch'}/></F>
                <InputFieldCharacter type={'number'} width={'7ch'} field_name={'gold_pieces'}/>
                </span>);
    }

    render() {
        const rew = this.props.game.encounter.k;
        const e = this.props.game.encounter;

        const total = get_total_hp(e);
        if (total !== 0) return '';
        if (rew.includes('Nothing')) return '';
        let r = <TableRoll state={e.reward} on_roll={this.roll_reward}/>;
        if (rew.includes('GP')) r = this.render_gp();
        return (
            <span>
                <span className={'success'}>
                    <C width={'16ch'}>Roll for reward</C>
                </span>
                {r}
            </span>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(RewardRoll)
