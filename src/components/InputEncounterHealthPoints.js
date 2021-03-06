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
import F from 'helpers/F'
import InputFieldEncounter from "./InputFieldEncounter";
import C from "../helpers/C";
import L from "../helpers/L";
import {apply_n_dmg_to_encounter_index} from "../helpers/helpers_encounter";

class FieldEncounterHealthPoints extends Component {

    constructor(props) {
        super(props);
        this.clear_action = this.clear_action.bind(this);
        this.hp_minus = this.hp_minus.bind(this);
        this.hp_plus = this.hp_plus.bind(this);
    }

    clear_action() {
        // reset initial
        /*const g = update_g_encounter(this.props.game, {})
        this.props.set_game(g);

         */
    }

    hp_minus(index) {
        const hp = this.props.game.encounter.hp;
        const hps = hp.split('/');
        if (parseInt(hps[index]) === 0) index += 1;
        if (parseInt(hps[index]) === 0) index += 1;
        if (parseInt(hps[index]) === 0) index += 1;
        if (parseInt(hps[index]) === 0) index += 1;
        if (parseInt(hps[index]) === 0) index += 1;
        const g = apply_n_dmg_to_encounter_index(this.props.game, 1, index);
        this.props.set_game(g);
    }

    hp_plus(index) {
        const g = apply_n_dmg_to_encounter_index(this.props.game, -1, index);
        this.props.set_game(g);
    }


    render() {
        const e = this.props.game.encounter;
        if (e.id === 'none') return '';
        const p = {width: '4ch', type: 'number', align: 'right'};
        let plus = [];
        let minus = [];
        const hps = e.hp.split('/');
        const w = e.hp.length + (hps.length > 1 ? 0 : 1);
        for (let i = 0; i < hps.length; i++) {
            const a = i;
            plus.push(<L key={a} onClick={() => this.hp_plus(a)}>+</L>);
            minus.push(<L key={a} onClick={() => this.hp_minus(a)}> -</L>);
        }
        return (
            <span>
                <F><C width={'3ch'}/>Health Points</F>
                <C width={'1ch'}/>
                {minus}
                <InputFieldEncounter {...p} type={'txt'} width={'6ch'} align={'center'} field_name={'hp'}/>
                {plus}
                <F><C width={'1ch'}/>(</F>
                <InputFieldEncounter {...p} type={'txt'} width={w + 'ch'} align={'center'} read_only={true}
                                     field_name={'initial_hp'}/>
                <F>)</F>
            </span>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldEncounterHealthPoints)
