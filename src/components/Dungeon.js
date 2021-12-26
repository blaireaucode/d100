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
import Clear from "./Clear";
import update from "immutability-helper";
import {new_dungeon} from "../helpers/helpers_dungeon";

class Dungeon extends Component {

    constructor(props) {
        super(props);
        this.clear_dungeon = this.clear_dungeon.bind(this);
    }

    clear_dungeon() {
        const g = update(this.props.game, {quest: {dungeon: {$set: new_dungeon()}}});
        this.props.set_game(g);
    }

    render() {
        const d = this.props.game.quest.dungeon.rooms;
        if (d.length === 0) return '';
        let rows = [];
        const size = [d.length, d[0].length];
        for (let row = 0; row < size[0]; row++) {
            const cols = [];
            for (let col = 0; col < size[1]; col++) {
                const c = <RoomImage key={row + ' ' + col} width={100} room={d[row][col]}/>;
                cols.push(c);
            }
            rows.push(<Grid container key={row}><Grid item>{cols}</Grid></Grid>);
        }

        return (
            <Grid container spacing={2}>
                {rows}
                <p/>
                <Clear onClick={this.clear_dungeon}>Delete the dungeon</Clear>
            </Grid>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dungeon)
