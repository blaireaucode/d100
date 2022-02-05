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
import L from "../helpers/L"
import Input from "@material-ui/core/Input"
import * as st from "../helpers/store"
import update from "immutability-helper"
import C from "../helpers/C";

class SavedGame extends Component {

    constructor(props) {
        super(props);
        this.load = this.load.bind(this);
        this.delete = this.delete.bind(this);
    }

    load() {
        const save = this.props.save;
        this.props.set_game(save);
        this.props.update_store();
    }

    delete() {
        const save = this.props.save;
        const saves = st.read_saves_in_store();
        const s = update(saves, {$unset: [save.id]});
        global.localStorage.setItem(st.store_name, JSON.stringify(s));
        this.props.update_store();
    }

    rename = ({target}) => {
        // replace current save
        const save = update(this.props.save, {name: {$set: target.value}});
        let saves = st.read_saves_in_store();
        const s = update(saves, {[save.id]: {$set: save}});
        global.localStorage.setItem(st.store_name, JSON.stringify(s));
        // both needed
        this.props.set_game(save);
        this.props.update_store();
    };

    render() {
        const save = this.props.save;
        const d = new Date(save.date)
        const e = !(save.id === this.props.current);
        let ll = <span>
            <L onClick={this.load}>Load</L>
            <C width={'3ch'}/>
            <L onClick={this.delete}> ✗ </L>
            </span>
        if (!e) {
            ll = <C width={'9ch'}>current</C>
        }
        return (
            <span>
                <C width={'20ch'}>{d.toLocaleString()}</C>
                {ll}
                <C width={'3ch'}/>
                <C width={'15ch'}>
                <Input className={'field_input'}
                       disableUnderline={true}
                       name={'name'}
                       value={save.name}
                       onChange={this.rename}
                /></C>
                <span className={'field_name'}>({save.characteristics.name})</span>
            </span>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedGame);
