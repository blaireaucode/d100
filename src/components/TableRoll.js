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
import {create_D100_rolling_dices, getRandomInt, open_dice_ui} from "../helpers/helpers_dice";
import C from "../helpers/C";
import {MenuItem, Select} from "@material-ui/core";
import L from "../helpers/L";
import Input from "@material-ui/core/Input";
import TableRollResult from "./TableRollResult";
import {get_table_mod} from "../helpers/helpers_encounter";

class TableRoll extends Component {

    static defaultProps = {
        on_roll: 'none',
        state: 'none' // the state is managed elsewhere
    }

    constructor(props) {
        super(props);
        this.roll = this.roll.bind(this);
    }

    change_table = ({target}) => {
        let s = JSON.parse(JSON.stringify(this.props.state));
        s.table = target.value;
        s.mod = get_table_mod(s.table);
        let g = this.props.game;
        if (this.props.on_roll !== 'none') g = this.props.on_roll(s);
        this.props.set_game(g);
    };

    change_mod = ({target}) => {
        let s = JSON.parse(JSON.stringify(this.props.state));
        s.mod = parseInt(target.value);
        s.total = s.dice + s.mod;
        let g = this.props.game;
        if (this.props.on_roll !== 'none') g = this.props.on_roll(s);
        this.props.set_game(g);
    };

    roll() {
        // get value
        const dice = getRandomInt(1, 100);
        const mod = this.props.state.mod;
        const total = Math.min(100, Math.max(0, dice + mod));
        // set state
        let s = JSON.parse(JSON.stringify(this.props.state));
        s.dice = dice;
        s.mod = parseInt(mod);
        s.total = total
        // callback
        let g = this.props.game;
        if (this.props.on_roll !== 'none') g = this.props.on_roll(s);
        // dice UI
        const dices = create_D100_rolling_dices(dice);
        g = open_dice_ui(g, dice, dices);
        this.props.set_game(g);
    }

    render_table() {
        if (!this.props.state.change_table) return '';
        let menuitems = [];
        for (const t in this.props.state.tables) {
            menuitems.push(<MenuItem value={t} key={t} className={'field_input_small_select'}>{t}</MenuItem>);
        }
        const w = (this.props.state.table.length + 4) + 'ch';
        return (
            <Select className={'field_input'}
                    disableUnderline={true}
                    type={'txt'}
                    name={'test'}
                    value={this.props.state.table}
                    style={{width: w}}
                    onChange={this.change_table}>
                {menuitems}
            </Select>);
    }

    render_mod() {
        if (!this.props.state.change_mod) return '';
        return (
            <span>
                <C width={'4ch'}>mod</C>
                <Input className={'field_input'}
                       disableUnderline={true}
                       type={'number'}
                       name={'mod'}
                       value={this.props.state.mod}
                       style={{width: '5ch'}}
                       inputProps={{style: {textAlign: 'right'}}}
                       onChange={this.change_mod}
                />
        </span>)
    }

    render() {
        return (
            <span>
                {this.render_table()}
                {this.render_mod()}
                <L onClick={this.roll}>🎲 D100</L>
                <TableRollResult state={this.props.state} on_roll={this.props.on_roll}/>
            </span>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableRoll)
