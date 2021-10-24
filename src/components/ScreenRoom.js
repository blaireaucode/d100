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

class ScreenRoom extends Component {

    render() {
        return (
            <div>

                <EncounterRoll/>

                <p/>
                <Encounter/>

                <p/>
                Put Help fight here ...

                {/*<F>Monster:</F> <RollEncounter/>
                <p/>
                <Encounter encounter={this.props.game.room.encounter}/>
                <p/>
                <hr/>
                <Fight/>*/}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenRoom)
