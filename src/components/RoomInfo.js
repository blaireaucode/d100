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
import RoomInfoRed from "./RoomInfoRed"
import RoomInfoYellow from "./RoomInfoYellow"
import RoomInfoGreen from "./RoomInfoGreen"
import RoomInfoBlue from "./RoomInfoBlue"
import L from "../helpers/L"
import {add_g_room_to_dungeon, map_dir, new_room, rotate_g_room, update_g_room} from "../helpers/helpers_dungeon"
import C from "../helpers/C";
import RoomSearch from "./RoomSearch";

class RoomInfo extends Component {

    constructor(props) {
        super(props);
        this.rotate = this.rotate.bind(this);
        this.add = this.add.bind(this);
    }

    rotate() {
        const g = rotate_g_room(this.props.game);
        this.props.set_game(g);
    }

    add(direction) {
        let g = add_g_room_to_dungeon(this.props.game, direction);
        const e = new_room("none");
        g = update_g_room(g, e);
        this.props.set_game(g);
    }


    render() {
        const r = this.props.game.room;
        if (r.d100 === 'none') return '';
        const cn = 'room_color_' + r.color;
        let t = '';
        if (r.color === 'red') t = <RoomInfoRed/>;
        if (r.color === 'yellow') t = <RoomInfoYellow/>;
        if (r.color === 'green') t = <RoomInfoGreen/>;
        if (r.color === 'blue') t = <RoomInfoBlue/>;
        let d = '';
        const dn = r.doors_direction.length;
        if (dn > 0) {
            d = dn + ' door' + (dn > 1 ? 's' : '') + ': ';
        }
        return (
            <span>
                <L onClick={this.rotate}>↻</L>
                <C width={'1ch'}/>
                #{r.d100}
                <C width={'1ch'}/>
                <span className={cn}>{r.color}</span>
                <C width={'1ch'}/>{t}
                <p/>
                {r.exits.length} exit{r.exits.length > 1 ? 's' : ''}: {map_dir(r.exits)}
                <br/>
                {d} {map_dir(r.doors_direction)}
                <p/>
                <RoomSearch/>
                <p/>
                    <L onClick={() => this.add('W')}>Add West ⇦</L> <C width={'3ch'}/>
                    <L onClick={() => this.add('E')}>Add East ⇨ </L> <C width={'3ch'}/>
                    <L onClick={() => this.add('N')}>Add North ⇧</L> <C width={'3ch'}/>
                    <L onClick={() => this.add('S')}>Add South ⇩</L><C width={'3ch'}/>
            </span>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomInfo)
