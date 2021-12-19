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
import RoomInfo from "./RoomInfo";
import L from "../helpers/L";
import {add_room_to_dungeon, new_dungeon} from "../helpers/room_helpers";
import C from "../helpers/C";
import update from "immutability-helper";

class Room extends Component {

    constructor(props) {
        super(props);
        this.clear_dungeon = this.clear_dungeon.bind(this);
        this.add = this.add.bind(this);
    }

    clear_dungeon() {
        const g = update(this.props.game, {quest: {dungeon: {$set:new_dungeon()}}});
        this.props.set_game(g);
    }

    add(direction) {
        const g = add_room_to_dungeon(this.props.game, direction);
        this.props.set_game(g);
    }


    render() {
        const r = this.props.game.room;
        if (r.d100 === 'none') return '';
        return (
            <Grid container spacing={2}>
                <Grid item xs={2} style={{maxWidth: "170px"}}>
                    <RoomImage/>
                </Grid>
                <Grid item xs={10}>
                    <RoomInfo/>
                    <L onClick={() => this.add('W')}>Add W</L> <C width={'3ch'}/>
                    <L onClick={() => this.add('E')}>Add E</L> <C width={'3ch'}/>
                    <L onClick={() => this.add('N')}>Add N</L> <C width={'3ch'}/>
                    <L onClick={() => this.add('S')}>Add S</L><C width={'3ch'}/>

                    <L onClick={this.clear_dungeon}>clearD</L>
                    {this.props.game.quest.dungeon.last_room}

                </Grid>
            </Grid>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room)
