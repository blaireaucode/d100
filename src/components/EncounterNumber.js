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
import FieldInput from 'components/InputFieldEncounter'
import {update_encounter_number} from 'helpers/encounter_helpers'
import {D6, get_dices, open_dice_ui} from 'helpers/dice_helpers'
import F from 'helpers/F'

class EncounterNumber extends Component {

    constructor(props) {
        super(props);
        this.roll_number = this.roll_number.bind(this);
    }

    roll_number() {
        let d = get_dices(this.props.game.room.encounter['number_roll']);
        const dice = D6(false, d.nb, d.mod, d.max);
        let g = open_dice_ui(this.props.game, dice);
        g = update_encounter_number(g, dice);
        this.props.set_game(g);
    }

    render() {
        const e = this.props.encounter;
        return (
            <span>
                <L onClick={this.roll_number}> &#127922; </L>
                <F>Number ({e.number_roll}) : </F> {' '}
                <FieldInput character={e} type={'number'} field_name={'number'}/>
                {'/ '}{e.initial_number} {' '} &nbsp;&nbsp;&nbsp;
            < /span>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(EncounterNumber)
