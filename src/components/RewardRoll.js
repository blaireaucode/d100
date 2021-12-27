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
import F from "../helpers/F";
import InputFieldEncounter from "./InputFieldEncounter";
import C from "../helpers/C";
import {get_reward_table_names, get_total_hp} from "../helpers/helpers_encounter";
import {MenuItem, Select} from "@material-ui/core";
import {create_D100_rolling_dices, getRandomInt, open_dice_ui} from "../helpers/helpers_dice";
import {get_table_name} from "../helpers/helpers_equipment";
import ItemGeneric from "./ItemGeneric";
import {update_g_characteristic} from "../helpers/helpers_update";
import InputFieldCharacter from "./InputFieldCharacter";

class RewardRoll extends Component {

    constructor(props) {
        super(props);
        this.roll_reward = this.roll_reward.bind(this);
        this.roll_reward_gp = this.roll_reward_gp.bind(this);
        this.clear = this.clear.bind(this);
        this.state = {table: '', dice: -1, mod: 0, gp: -1};
    }

    roll_reward() {
        //const rew = this.props.game.encounter.k;
        const table = this.state.table;
        if (table === '') return '';
        const total = getRandomInt(1, 100);
        let mod = 0;
        if (table.includes('+')) {
            const i = table.indexOf('+');
            mod = table.substr(i + 1, table.length);
        }
        if (table.includes('-')) {
            const i = table.indexOf('-');
            mod = table.substr(i + 1, table.length);
        }
        this.setState({dice: total, mod: mod, gp: -1});
        const dices = create_D100_rolling_dices(total);
        const g = open_dice_ui(this.props.game, total, dices);
        this.props.set_game(g);
    }

    roll_reward_gp() {
        const rew = this.props.game.encounter.k;
        const total = getRandomInt(1, 100);
        this.setState({dice: total, mod: 0, gp: total});
        const dices = create_D100_rolling_dices(total);
        const g = open_dice_ui(this.props.game, total, dices);
        this.props.set_game(g);
    }

    clear() {
        /*
        const att = this.props.game.encounter.attack;
        const a = new_attack('none', att.dmg, att.who_attack);
        const g = update_g_encounter_field(this.props.game, 'attack', a);
        this.props.set_game(g);

         */
    }

    render() {
        const rew = this.props.game.encounter.k;
        if (rew.includes('Nothing')) return '';
        const r = this.render_roll();
        return (
            <span>
                <F width={'8ch'}>Reward</F> <InputFieldEncounter field_name={'k'} width={'22ch'}/>
                {r}
            </span>
        );
    }

    handleChange = ({target}) => {
        this.setState({table: target.value, dice: -1, mod: -1});
    };

    get_gp = () => {
        const gpt = this.props.game.characteristics.gold_pieces + this.state.gp;
        let g = update_g_characteristic(this.props.game, 'gold_pieces', gpt);
        this.setState({dice: -1, mod: 0, gp: -1});
        this.props.set_game(g);
    }

    render_result_gp = () => {
        if (this.state.gp === -1) return '';
        return <span className={'normal'}>
                    <C width={'2ch'}/> ➜ <C width={'2ch'}/> {this.state.dice}
            <C width={'2ch'}/>
                    <L onClick={this.get_gp}>Get {this.state.dice} gold pieces</L>
                </span>
    }

    render_reward_gp() {
        const r = this.render_result_gp();
        return <span>
                <F>💰Gold pieces <C width={'2ch'}/></F>
                <InputFieldCharacter type={'number'} width={'7ch'} field_name={'gold_pieces'}/>
                <L onClick={this.roll_reward_gp}>🎲 D100</L>
            {r}
            </span>
    }

    render_roll() {
        const e = this.props.game.encounter;
        const total = get_total_hp(e);
        if (total !== 0) return '';
        const rew = this.props.game.encounter.k;
        if (rew.includes('Nothing')) return '';

        if (rew.includes('GP')) return this.render_reward_gp();

        // get tables from reward (maybe several)
        const tables = get_reward_table_names(e);
        let menuitems = [];
        for (const t of tables) {
            menuitems.push(<MenuItem value={t} key={t} className={'field_input_small_select'}>{t}</MenuItem>);
        }
        if (this.state.table === '') this.setState({table: tables[0], dice: -1});
        let v = this.state.table === '' ? tables[0] : this.state.table;
        if (!(tables.includes(this.state.table))) {
            v = tables[0];
            this.setState({table: tables[0], dice: -1});
        }
        const r = this.render_result();
        return (<span className={'success'}>
                    <C width={'16ch'}>Roll for reward</C>
                    <Select className={'field_input'}
                            disableUnderline={true}
                            type={'txt'}
                            name={'test'}
                            value={v}
                            style={{width: '9ch', align: 'center'}}
                            onChange={this.handleChange}>
                            {menuitems}
                    </Select>
                    <C width={'3ch'}/>
                    <L onClick={this.roll_reward}>🎲 D100</L>
            {r}
                </span>)
    }

    render_result() {
        if (this.state.dice === -1) return '';
        // result
        let m = '';
        if (this.state.mod > 0) m = '+ ' + this.state.mod;
        if (this.state.mod < 0) m = this.state.mod;
        const total = Math.min(100, Math.max(0, parseInt(this.state.dice) + parseInt(this.state.mod)));
        let t = '';
        if (m !== '') t = ' = ' + total;
        // item
        const table_name = get_table_name(this.state.table);
        // special case for parts P1 P2 P3 P4
        const id = this.state.table[0] === 'P' ? (this.state.table + total) : total;
        const it = <ItemGeneric class_name={'field_input_small_header'} id={id} item_type={table_name} buy={false}/>;
        return <span className={'normal'}>
                <C width={'2ch'}/> ➜ <C width={'2ch'}/> {this.state.dice} {m} {t}
            <p/>
                <span>
                {it}
                </span>
        </span>
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(RewardRoll)
