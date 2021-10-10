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
import {get_current_action, get_current_character, update_attack, update_defend} from "../helpers/encounter_helpers"
import FieldInput from "./CharacterInputField"
import FightActionRoll from "./FightActionRoll"
import Grid from '@material-ui/core/Grid'
import {open_dice_ui} from 'helpers/dice_helpers'

class Attack extends Component {

    constructor(props) {
        super(props);
        this.roll_attack = this.roll_attack.bind(this);
        this.roll_defend = this.roll_defend.bind(this);
    }

    roll_attack() {
        let g = update_attack(this.props.game, this.props.id);
        g = open_dice_ui(g, g.room.action.dice);
        this.props.set_game(g);
    }

    roll_defend() {
        let g = update_defend(this.props.game, this.props.id);
        g = open_dice_ui(g, g.room.action.dice);
        this.props.set_game(g);
    }

    render() {
        const c = this.props.game.team[this.props.id];
        const name = c.name;
        let enabled = !("action" in this.props.game.room);
        if (!('id' in this.props.game.room.encounter)) enabled = false;

        // marker
        let mk = '';
        let mka = '';
        let mkd = '';
        if (get_current_character(this.props.game.room) === this.props.id) {
            mk = '❯';
            if (get_current_action(this.props.game.room) === 'attack') mka = '❯ ';
            else mkd = '❯ ';
        }
        // actions
        let att = '';
        let def = '';
        if (enabled) {
            att = <span>{mka}<L enabled={enabled} onClick={this.roll_attack}>attacks</L> {' '}</span>
            def = <span>{mkd}<L enabled={enabled} onClick={this.roll_defend}>defends</L> {' '}</span>
        }

        return (
            <Grid container spacing={1}>
                <Grid item xs={3}>
                    {mk} &nbsp;
                    <FieldInput value={c.life} character={c} type={'number'} field_name={'life'}/>
                    <i>({c.class})</i> {name}
                </Grid>
                <Grid item xs={1}>
                    <FieldInput value={c.attack_mod} character={c} type={'number'} field_name={'attack_mod'}/>
                    <FieldInput value={c.def_mod} character={c} type={'number'} field_name={'def_mod'}/>
                </Grid>
                <Grid item>
                    <FightActionRoll id={this.props.id}/>
                    {att}
                    {def}
                </Grid>
                {/*<Grid item xs={4}>
                    <FightActionRoll id={this.props.id}/>
                </Grid>*/}
            </Grid>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Attack)
