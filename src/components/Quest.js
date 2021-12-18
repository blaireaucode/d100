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
                <Paper elevation={5} className={'encounter'}>
                CURRENT QUEST
                {q.d100}
                {q.name}<p/>
                {q.S} {q.F}
                <p/>{q.txt}
                </Paper>
            </span>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quest)
