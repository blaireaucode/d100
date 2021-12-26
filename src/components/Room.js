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

class Room extends Component {

    render() {
        const r = this.props.game.room;
        if (r.d100 === 'none') return 'Roll or select an area ...';
        return (
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={2} style={{maxWidth: "180px"}}>
                    <RoomImage/>
                </Grid>
                <Grid item xs={10}>
                    <RoomInfo/>
                </Grid>
            </Grid>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room)
