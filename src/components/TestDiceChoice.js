/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {mapDispatchToProps, mapStateToProps} from 'helpers/default_props';
import {MenuItem, Paper, Select} from "@material-ui/core";
import C from "../helpers/C";
import L from "../helpers/L";
import Input from "@material-ui/core/Input";
import InputFieldCharacter from "./InputFieldCharacter";
import {
    create_D100_rolling_dices,
    getRandomInt,
    open_dice_ui,
    test_g_set_dice,
    test_g_set_mod,
    test_g_set_type
} from "../helpers/helpers_dice";
import TestDiceResult from "./TestDiceResult";
import {clear_if_not_none} from "../helpers/helpers_ui";

class TestDiceChoice extends Component {

    menuitems = [];

    constructor(props) {
        super(props);
        this.clear = this.clear.bind(this);
        this.roll_test = this.roll_test.bind(this);
        const m = ['Str', 'Dex', 'Int'];
        for (const it of m)
            this.menuitems.push(<MenuItem value={it.toLowerCase()} key={it.toLowerCase()}
                                          className={'field_input_small_select'}>{it}</MenuItem>);
    }

    clear() {
        const g = test_g_set_dice(this.props.game, -1);
        this.props.set_game(g);
    }

    roll_test() {
        const total = getRandomInt(1, 100);
        let g = test_g_set_dice(this.props.game, total);
        // rolling dice
        const dices = create_D100_rolling_dices(total);
        g = open_dice_ui(g, total, dices);
        this.props.set_game(g);
    }

    handleChangeType = ({target}) => {
        let g = test_g_set_type(this.props.game, target.value.toLowerCase());
        g = test_g_set_dice(g, -1);
        this.props.set_game(g);
    };

    handleChangeMod = ({target}) => {
        let g = test_g_set_mod(this.props.game, parseInt(target.value));
        //g = test_g_set_dice(g, -1);
        this.props.set_game(g);
    };

    render() {
        const c = this.props.game.characteristics;
        const t = this.props.game.test;
        const clear = clear_if_not_none(this, t.dice === -1 ? 'none' : t.dice);
        return (
            <Paper elevation={5} className={'encounter '}>
                {clear}
                <C width={'12ch'}>Test against </C>
                <Select className={'field_input'}
                        disableUnderline={true}
                        type={'txt'}
                        name={'test'}
                        value={t.type}
                        style={{width: '6ch'}}
                        onChange={this.handleChangeType}>
                    {this.menuitems}
                </Select>
                <InputFieldCharacter width={'4ch'}
                                     type={'number'}
                                     align={'right'}
                                     field_name={t.type}
                                     mod={c[t.type + '_items']}
                                     read_only={true}/>
                <C width={'4ch'}>mod: </C>
                <Input className={'field_input'}
                       disableUnderline={true}
                       type={'number'}
                       name={'mod'}
                       value={t.mod}
                       style={{width: '6ch'}}
                       inputProps={{style: {textAlign: 'center'}}}
                       onChange={this.handleChangeMod}
                />
                <C width={'2ch'}/>
                <L onClick={this.roll_test}>🎲 D100</L>
                <C width={'2ch'}/>
                <TestDiceResult test={t}/>
            </Paper>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestDiceChoice)
