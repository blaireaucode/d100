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
import L from "helpers/L"
import {update_dic} from "../helpers/helpers_update";
import C from "../helpers/C";

class AddToLog extends Component {

    constructor(props) {
        super(props);
        this.state = {added: ''};
    }

    add_to_log = () => {
        let log = JSON.parse(JSON.stringify(this.props.game.log));
        log += this.props.children;
        const g = update_dic(this.props.game, 'log', log);
        this.props.set_game(g);
        this.setState({added: 'log modified'});
        setTimeout(() => {
            this.setState({added: ''});
        }, 3000);
    }

    render() {
        return (
            <L enabled={this.props.enabled} onClick={this.add_to_log}>
                Add to log <C width={'3ch'}/><C className={'field_input'}>{this.state.added}</C>
            </L>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToLog)
