/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {mapDispatchToProps, mapStateToProps} from 'helpers/default_props';
import {Link} from "react-router-dom";
import {JSONEditor} from "react-json-editor-viewer";
import TableRoll from "./TableRoll";
import {all_tables, new_table_roll} from "../helpers/helpers_table";


class ScreenDebug extends Component {

    constructor(props) {
        super(props);
        this.onJsonChange = this.onJsonChange.bind(this);
        this.state = {table_roll: new_table_roll()};
        this.state.table_roll.tables = all_tables;
    }

    onJsonChange(key, value, parent, data) {
        console.log(key, value, parent, data);
    }

    on_table_roll = (state) => {
        console.log('local on table roll state', state)
        this.setState({table_roll: state});
        return this.props.game;
    }

    render() {
        console.log('local state', this.state)
        return (
            <div>
                <TableRoll state={this.state.table_roll} on_roll={this.on_table_roll}/>
                <p/>
                &nbsp;
                <p/>
                <Link to={'#'} onClick={() => this.reset()}> Reset </Link><br/>
                <p/>
                &nbsp;
                <p/>
                &nbsp;
                <p/>
                <JSONEditor
                    data={this.props.game}
                    collapsible
                    onChange={this.onJsonChange}
                />;
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenDebug)
