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
import * as st from 'helpers/store'
import L from 'helpers/L.js'
import Save from 'components/SavedGame'
import default_game from "../helpers/default_game";

class ScreenSystem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const saves = st.read_saves_in_store();
        console.log('read saves', saves[saves['current']].name)
        let list = [];
        for (let save in saves) {
            if (save === 'default') continue;
            if (save === 'current') continue;
            let s = saves[save];
            list.push(<Save key={s.id} save={s}/>);
        }
        return (
            <span>
                {list}
            </span>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenSystem)
