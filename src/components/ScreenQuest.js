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
import QuestRoll from "./QuestRoll"
import Quest from "./Quest"
import CollapsibleHelp from "./CollapsibleHelp"

class ScreenQuest extends Component {

    render() {

        return (
            <div>
                <Quest/>
                <p/>
                &nbsp;
                <p/>
                &nbsp;
                <p/>
                <hr color={'#333'} size={1}/>
                <CollapsibleHelp text={'Choose a quest'}>
                <QuestRoll/>
                </CollapsibleHelp>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenQuest)
