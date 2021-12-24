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
import C from "../helpers/C";

class QuestSummary extends Component {

    render() {
        const q = this.props.quest;
        if (!q) return '';
        if (q === 'none') return '';
        if (q.d100 === 'none') return '';
        return (
            <span>
                <C width={'4ch'}/> {q.d100}
                <C width={'1ch'}/> {q.name}
                <p/>
                <C width={'4ch'}/> Encounter modifier {q.enc_mod}
                <p/>
                <C width={'4ch'}/> Success: {q.S}
                <C width={'4ch'}/> Failure: {q.F}
                <p/>
                <C width={'4ch'}/> {q.txt}
            </span>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestSummary)
