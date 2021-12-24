/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Paper} from "@material-ui/core"
import {mapDispatchToProps, mapStateToProps} from 'helpers/default_props'
import F from "../helpers/F";

class Quest extends Component {

    constructor(props) {
        super(props);
        this.clear_action = this.clear_action.bind(this);
    }

    clear_action() {
    }


    render() {
        const q = this.props.game.quest;
        if (q.d100 === 'none') return '';
        return (
            <span>
                Current quest<p/>
                <Paper elevation={5} className={'encounter'}>
                ({q.d100}) {q.name}<p/>
                    <F width={'18ch'}>Encounter modifier: </F> {q.enc_mod}<br/>
                    <F width={'18ch'}>Success: </F> {q.S}<br/>
                    <F width={'18ch'}>Failure: </F> {q.F}
                    <p/>
                    {q.txt}
                </Paper>
            </span>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quest)
