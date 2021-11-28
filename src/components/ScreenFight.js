/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import Encounter from 'components/Encounter'
import {mapDispatchToProps, mapStateToProps} from 'helpers/default_props'
import EncounterRoll from "components/EncounterRoll"
import AttackRollEncounterReaction from "./AttackRollEncounterReaction";
import AttackRoll from "./AttackRoll";
import AttackRollHitLocation from "./AttackRollHitLocation";
import AttackRollDamage from "./AttackRollDamage";
import EncounterFightRound from "./EncounterFightRound";
import {Paper} from "@material-ui/core";


class ScreenFight extends Component {

    render() {
        return (
            <div>
                <EncounterRoll/>
                <p/>
                <Encounter/>
                <p/>
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
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenFight)
