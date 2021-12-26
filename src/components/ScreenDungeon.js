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
import RoomRoll from "./RoomRoll";
import Room from "./Room";
import Dungeon from "./Dungeon";


class ScreenDungeon extends Component {

    render() {
        return (
            <div>
                <RoomRoll/>
                <p/>
                <Room/>
                <hr color={'#333'} size={1}/>
                <p/>
                <Dungeon/>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenDungeon)
