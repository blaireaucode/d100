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
import {clear_attack} from "../helpers/encounter_helpers";
import {update_g_encounter_field} from "../helpers/update_helpers";
import Clear from "./Clear";

class AttackRound extends Component {

    constructor(props) {
        super(props);
        this.next_round = this.next_round.bind(this);
        this.clear = this.clear.bind(this);
    }

    clear() {
        let g = clear_attack(this.props.game);
        this.props.set_game(g);
        return g;
    }

    next_round() {
        let g = this.clear();
        const round = parseInt(this.props.game.encounter.round) + 1;
        g = update_g_encounter_field(g, 'round', round);
        this.props.set_game(g);
    }

    render() {
        return (
            <span>
                <C width={'34ch'}/>
                <Clear onClick={this.clear}/> <C width={'2ch'}/>
                Round n° <InputFieldEncounter field_name={'round'} width={'4ch'} type={'number'}/>
                <L onClick={this.next_round}>+</L>
            </span>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttackRound)
