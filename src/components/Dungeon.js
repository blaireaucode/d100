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
import {Grid} from "@material-ui/core";
import RoomImage from "./RoomImage";

class Dungeon extends Component {

    constructor(props) {
        super(props);
        this.clear_action = this.clear_action.bind(this);
    }

    clear_action() {
    }


    render() {
        const r = this.props.game.room;
        if (r.d100 === 'none') return '';
        const d = this.props.game.quest.dungeon.rooms;
        console.log('d', d);
        if (d.length === 0) return '';
        let rows = [];
        const size = [d.length, d[0].length];
        for (let row = 0; row < size[0]; row++) {
            const cols = [];
            for (let col = 0; col < size[1]; col++) {
                const c = <RoomImage width={100} room={d[row][col]}/>;
                cols.push(c);
            }
            rows.push(<Grid container spacing={2}><Grid item>{cols}</Grid></Grid>);
        }

        return (
            <Grid container spacing={2}>
                {rows}
            </Grid>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dungeon)
