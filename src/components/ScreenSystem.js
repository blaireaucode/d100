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
import Save from 'components/Save'
import default_game from "../helpers/default_game";

class ScreenSystem extends Component {

    constructor() {
        super();
        this.clearStore = this.clearStore.bind(this);
        this.reset = this.reset.bind(this);
        this.update_store = this.update_store.bind(this);
        this.state = {store: st.read_saves_in_store()};
    }

    update_store() {
        this.setState({store: st.read_saves_in_store()});
    }

    clearStore() {
        global.localStorage.removeItem(st.store_name);
        this.update_store();
    }

    reset() {
        this.props.set_game(default_game);
        this.update_store();
    }

    render() {
        const saves = this.state.store;
        let list = [];
        for (let save in saves) {
            if (save === 'default') continue;
            if (save === 'current') continue;
            let s = saves[save];
            list.push(<Save key={s.id} current={saves.current} update_store={this.update_store} save={s}/>);
        }
        return (
            <div>
                Saved games:<p/>
                {list}
                <br/>
                <L onClick={this.reset}>Start new</L><br/>
                <L onClick={this.clearStore}> ⚠ Clear store ⚠</L><br/>

            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenSystem)
