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
import Attack from "components/Attack"
import {clear_action} from "helpers/encounter_helpers"

class Fight extends Component {

    constructor() {
        super();
        this.clear = this.clear.bind(this);
    }

    clear() {
        const g = clear_action(this.props.game)
        this.props.set_game(g);
    }

    render() {
        const e = this.props.game.room.encounter;
        if (e.id < 0)
            return (<span>no encounter</span>);
        return (
            <span>
                {/*<Clear onClick={this.clear}/>*/}
                <Attack id={1}/><br/>
                <Attack id={2}/><br/>
                <Attack id={3}/><br/>
                <Attack id={4}/><br/>
            </span>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Fight)
