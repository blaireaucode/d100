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
import InputFieldEncounter from "./InputFieldEncounter";
import C from "../helpers/C";
import L from "../helpers/L";
import {new_attack, new_location, new_reaction} from "../helpers/encounter_helpers";
import {update_g_encounter_field} from "../helpers/update_helpers";

class EncounterFightRound extends Component {

    constructor(props) {
        super(props);
        this.next_round = this.next_round.bind(this);
    }

    next_round() {
        const a = new_attack();
        const l = new_location();
        const r = new_reaction();
        const round = parseInt(this.props.game.encounter.round) + 1;
        let g = update_g_encounter_field(this.props.game, 'attack', a);
        g = update_g_encounter_field(g, 'location', l);
        g = update_g_encounter_field(g, 'reaction', r);
        g = update_g_encounter_field(g, 'round', round);
        this.props.set_game(g);
    }

    render() {
        return (
            <span>
                <C width={'40ch'}/>
                Round n° <InputFieldEncounter field_name={'round'} width={'4ch'} type={'number'}/>
                <L onClick={this.next_round}>+</L>

            </span>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EncounterFightRound)
