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
import L from "../helpers/L";
import * as up from "../helpers/helpers_update";

class CharacterHeroPathHelp extends Component {

    constructor(props) {
        super(props);
        this.defaultHP = this.defaultHP.bind(this);
    }

    defaultHP() {
        let g = up.update_g_characteristic(this.props.game, 'hp', 20);
        g = up.update_g_characteristic(g, 'rep', 1);
        g = up.update_g_characteristic(g, 'fate', 3);
        g = up.update_g_characteristic(g, 'life', 3);
        g = up.update_g_characteristic(g, 'encounter_modifier', -40);
        this.props.set_game(g);
    }

    render() {
        return (
            <span>
                <b>៚ Starting values</b><br/>
                Add 20 primary Health Points (HP), 1 Rep, 3 Fate and 3 Life to the adventure sheet and give your adventurer a name.
                <br/>
                <L onClick={this.defaultHP}>Click here to apply default values</L>
            </span>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterHeroPathHelp)
