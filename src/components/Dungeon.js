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
        return (
            <Grid container spacing={2}>
                <Grid item xs={20}>
                    <RoomImage width={100}/>
                    <RoomImage width={100}/>
                    <RoomImage width={100}/>
                </Grid>
            </Grid>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dungeon)
