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
import CollapsibleHelp from "./CollapsibleHelp"

class RoomInfoBlue extends Component {

    render() {
        return (
            <CollapsibleHelp text={'(?)'}>
                Objective. <br/>
                Blue areas may be important areas in a dungeon that are specific to completing the current quest, and
                the player should check the quest to see if they are relevant. If they are not then the area is regarded
                as empty, but still retains its colour for the purpose of searches.
            </CollapsibleHelp>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomInfoBlue)
