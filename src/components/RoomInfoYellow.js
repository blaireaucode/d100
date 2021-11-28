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
import CollapsibleHelp from "./CollapsibleHelp";

class RoomInfoYellow extends Component {

    render() {
        return (
            <span>

                <CollapsibleHelp text={'(?)'}>
                Yellow areas are mostly empty. The odd few items that may be found are limited, so when a yellow area has been added to the dungeon sheet the player proceeds to step 4.
                </CollapsibleHelp>

            </span>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomInfoYellow)
