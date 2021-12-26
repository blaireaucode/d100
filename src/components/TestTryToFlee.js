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
import {MenuItem, Paper} from "@material-ui/core";
import C from "../helpers/C";
import L from "../helpers/L";
import Input from "@material-ui/core/Input";
import InputFieldCharacter from "./InputFieldCharacter";
import TestDiceResult from "./TestDiceResult";
import {clear_if_not_none} from "../helpers/helpers_ui";
import {create_D100_rolling_dices, getRandomInt, open_dice_ui} from "../helpers/helpers_dice";

class TestTryToFlee extends Component {

    menuitems = [];

    constructor(props) {
        super(props);
        this.clear = this.clear.bind(this);
        this.roll_test = this.roll_test.bind(this);
        const m = ['Dex'];
        for (const it of m)
            this.menuitems.push(<MenuItem value={it.toLowerCase()} key={it.toLowerCase()}
                                          className={'field_input_small_select'}>{it}</MenuItem>);
        this.state = {type: 'dex', mod: -10, dice: -1};
    }

    clear() {
        this.setState({dice: -1});
    }

    roll_test() {
        const total = getRandomInt(1, 100);
        this.setState({dice: total});
        // rolling dice
        const dices = create_D100_rolling_dices(total);
        const g = open_dice_ui(this.props.game, total, dices);
        this.props.set_game(g);
    }

    handleChangeMod = ({target}) => {
        this.setState({mod: parseInt(target.value)});
    };

    render() {
        const c = this.props.game.characteristics;
        const t = this.state;
        const clear = clear_if_not_none(this, t.dice === -1 ? 'none' : t.dice);
        const help = <span className={'help'}>[S: monster remains] [F: remove monster]</span>
        return (
            <Paper elevation={5} className={'encounter '}>
                {clear}
                <C width={'12ch'}>Try to flee</C>
                <span className={'field_input'}> Int </span>
                <C width={'3ch'}/>
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
                <TestDiceResult test={t} help={help}/>
            </Paper>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestTryToFlee)
