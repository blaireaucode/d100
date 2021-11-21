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

class Encounter extends Component {

    constructor(props) {
        super(props);
        this.clear_action = this.clear_action.bind(this);
        this.roll_reaction = this.roll_reaction.bind(this);
    }

    clear_action() {
        const g = update_g_encounter(this.props.game, {})
        this.props.set_game(g);
    }

    roll_reaction() {
        //const dice = D6(false);
        //const g = open_dice_ui(this.props.game, dice);
        //this.props.set_game(g);
    }


    render() {
        const e = this.props.game.encounter;
        if (e.id === 'none') return '';

        // dead ?
        /*
        let m = 'life';
        let dead = ''
        if ('number' in e) m = 'number';
        if (e[m] <= 0) {
            let t = 'The monster is DEAD !';
            if (e.initial_number > 1)
                t = 'All the monsters are DEAD !';
            dead = <span>
                    <span className={'dead'}>{' '} 💀 {t} {' '}</span>
                    <L onClick={this.clear_action}>  ✗  </L>
                    </span>
        }
         */

        /*
        // number
        let nb = '';
        if ('number' in e)
            nb = (<span>
                <EncounterNumber encounter={e}/>
                {dead}
                <br/>
            </span>);

        // morale
        let morale = '';
        if ('morale' in e)
            morale = (<span><F>Morale:</F> {e.morale}<br/></span>)

        // attribute
        let attribute = '';
        if ('attribute' in e)
            attribute = (<span><F>Attribute:</F> {e.attribute}<br/></span>)

        // life
        let life = '';
        if ('life' in e)
            attribute = (<span>
                <F>Life: </F><EncounterFieldInput encounter={e} type={'number'} field_name={'life'}/>
                {dead}
                <br/>
            </span>)

         */

        /*
        {nb}
                <F> Level: </F><EncounterFieldInput encounter={e} type={'number'} field_name={'level'}/><br/>
                {life}
                <F> Treasure: </F>{e.treasure}<br/>
                {morale}
                {attribute}
                <L onClick={this.roll_reaction}> &#127922; </L> <F>Reaction: </F>{e.reaction}<br/>
                {e.description}<br/>
         */

        //console.log('enc', e);
        const p = {width: '4ch', type: 'number', align: 'right'};
        return (
            <span>
                <Paper elevation={5} className={'encounter'}>
                <InputFieldEncounter field_name={'name'} width={'15ch'}/>
                n° <InputFieldEncounter field_name={'d100'} read_only={true} width={'5ch'}/>
                <br/>
                <F>Attack Value</F> <InputFieldEncounter {...p} field_name={'av'}/>
                <F>&nbsp;&nbsp;&nbsp;Defence</F> <InputFieldEncounter {...p} field_name={'def'}/>
                <F>&nbsp;&nbsp;&nbsp;Damage Modifier</F> <InputFieldEncounter {...p} field_name={'dmg'}/>
                <F>&nbsp;&nbsp;&nbsp;Health Points</F> <InputFieldEncounter {...p} type={'txt'} field_name={'hp'}/>
                <br/>
                <F>Reward</F> <InputFieldEncounter field_name={'k'} width={'30ch'}/>
                <F>Ability</F> <InputFieldEncounter field_name={'ability'} width={'30ch'}/>
                    <EncounterAbility/>
                </Paper>
                &nbsp; <p/>
            </span>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Encounter)
