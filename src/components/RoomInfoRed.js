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

class RoomInfoRed extends Component {

    render() {
        return (
            <CollapsibleHelp text={'(?)'}>
                Red areas are more dangerous and when first discovered will contain a monster lurking in the shadows.
                Roll on table E – Encounter and apply the current quest’s encounter modifier before reading the result
                on the table, and then start combat.
            </CollapsibleHelp>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomInfoRed)
