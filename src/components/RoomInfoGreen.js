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

class RoomInfoGreen extends Component {

    render() {
        return (
            <span>

                <br/>

                <CollapsibleHelp text={'(?)'}>
                Green areas contain random features that may restrict movement, cause damage or offer rewards. The player rolls on table G – Geographic and follows the instructions.
                </CollapsibleHelp>
            </span>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomInfoGreen)
