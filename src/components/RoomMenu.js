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
import L from "../helpers/L"
import C from "../helpers/C"
import {empty_room, rotate_g_dungeon_room, set_g_dungeon_room} from "../helpers/helpers_dungeon"

class RoomMenu extends Component {

    constructor(props) {
        super(props);
        this.rotate = this.rotate.bind(this);
        this.remove = this.remove.bind(this);
    }

    rotate() {
        const g = rotate_g_dungeon_room(this.props.game, this.props.room.index);
        this.props.set_game(g);
    }

    remove() {
        const g = set_g_dungeon_room(this.props.game, this.props.room.index, empty_room());
        this.props.set_game(g);
    }

    render() {
        const r = this.props.room;
        return (
            <span className={'room_menu'}>
                <C width={'1.5ch'}/><L onClick={this.rotate}>↻</L>
                {/*<br/>
                <C width={'1ch'}/><Clear onClick={this.remove}/>*/}
                <p/>
                <C width={'4ch'}/>{r.d100}
            </span>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomMenu)
