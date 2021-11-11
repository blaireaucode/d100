/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import Character from "./Character_old"
import Grid from '@material-ui/core/Grid'
import {mapDispatchToProps, mapStateToProps} from '../src/helpers/default_props'

class ScreenTeam extends Component {

    render() {
        return (
            <div>
                <Grid container>
                    <Grid item>
                        <Character character={1}/><p/>
                    </Grid>
                    <Grid item>
                        <Character character={2}/><p/>
                    </Grid>
                    <Grid item>
                        <Character character={3}/><p/>
                    </Grid>
                    <Grid item>
                        <Character character={4}/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenTeam);
