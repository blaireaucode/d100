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
import {clear_action} from "helpers/encounter_helpers"
import EncounterFightRound from "./EncounterFightRound";
import AttackRollEncounterReaction from "./AttackRollEncounterReaction";
import AttackRoll from "./AttackRoll";
import AttackRollHitLocation from "./AttackRollHitLocation";
import AttackRollDamage from "./AttackRollDamage";
import {Paper} from "@material-ui/core";

class Fight extends Component {

    constructor() {
        super();
        this.clear = this.clear.bind(this);
    }

    clear() {
        const g = clear_action(this.props.game)
        this.props.set_game(g);
    }

    render() {
        const e = this.props.game.encounter;
        if (e.id === 'none') return '';
        return (
            <Paper elevation={5} className={'encounter'}>
                <EncounterFightRound/>
                <br/>
                <AttackRollEncounterReaction/>
                <p/>
                <AttackRoll/>
                <p/>
                <AttackRollHitLocation/>
                <p/>
                <AttackRollDamage/>
                <br/>
                &nbsp;
            </Paper>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Fight)
