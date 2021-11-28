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
import RoomInfoRed from "./RoomInfoRed";
import RoomInfoYellow from "./RoomInfoYellow";
import RoomInfoGreen from "./RoomInfoGreen";
import RoomInfoBlue from "./RoomInfoBlue";
import L from "../helpers/L";
import {map_dir, rotate_g_room} from "../helpers/room_helpers";

class RoomInfo extends Component {

    constructor(props) {
        super(props);
        this.rotate = this.rotate.bind(this);
    }

    rotate() {
        const g = rotate_g_room(this.props.game);
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
                #{r.d100} - <span className={cn}>{r.color}</span> - <L onClick={this.rotate}>↻</L>
                <p/>
                {r.exits.length} exit{r.exits.length > 1 ? 's' : ''}: {map_dir(r.exits)}
                <br/>
                {d} {map_dir(r.doors_direction)}
                <p/>
                {t}
            </span>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomInfo)
