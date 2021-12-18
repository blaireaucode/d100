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
import {update_g_encounter} from 'helpers/update_helpers'
import F from 'helpers/F'
import {Paper} from "@material-ui/core"
import InputFieldEncounter from "./InputFieldEncounter";
import EncounterAbility from "./EncounterAbility";
import C from "../helpers/C";
import FieldEncounterHealthPoints from "./InputEncounterHealthPoints";

class Encounter extends Component {

    constructor(props) {
        super(props);
        this.clear_action = this.clear_action.bind(this);
    }

    clear_action() {
        const g = update_g_encounter(this.props.game, {})
        this.props.set_game(g);
    }

    render() {
        const e = this.props.game.encounter;
        if (e.id === 'none') return '';

        // dead ? 💀

        //console.log('enc', e);
        const p = {width: '4ch', type: 'number', align: 'right'};
        return (
            <span>
                <Paper elevation={5} className={'encounter'}>
                <InputFieldEncounter field_name={'name'} width={'15ch'}/>
                n° <InputFieldEncounter field_name={'d100'} read_only={true} width={'5ch'}/>
                <br/>
                <F>Attack Value (AV)</F> <InputFieldEncounter {...p} field_name={'av'}/>
                <F><C width={'3ch'}/>Defence</F> <InputFieldEncounter {...p} field_name={'def'}/>
                <F><C width={'3ch'}/>Damage Modifier</F> <InputFieldEncounter {...p} field_name={'dmg'}/>
                <FieldEncounterHealthPoints/>
                <F>Reward</F> <InputFieldEncounter field_name={'k'} width={'29ch'}/>
                <F>Ability</F> <InputFieldEncounter field_name={'ability'} width={'31ch'}/>
                    <EncounterAbility/>
                </Paper>
                &nbsp; <p/>
            </span>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Encounter)
