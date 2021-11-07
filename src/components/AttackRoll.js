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
import AttackRollEncounter from "./AttackRollEncounter";
import AttackRollPlayer from "./AttackRollPlayer";

class AttackRoll extends Component {

    render() {
        const e = this.props.game.encounter;
        if (e.attack.who_attack === 'encounter')
            return <AttackRollEncounter/>
        else return <AttackRollPlayer/>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttackRoll)
