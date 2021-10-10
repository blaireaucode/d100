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
import * as eh from "../helpers/encounter_helpers";
import L from 'helpers/L'
import Clear from 'components/Clear'

class FightActionRoll extends Component {

    constructor(props) {
        super(props);
        this.apply_attack = this.apply_attack.bind(this);
        this.receive_wound = this.receive_wound.bind(this);
        this.clear_action = this.clear_action.bind(this);
    }

    clear_action() {
        const g = eh.clear_action(this.props.game);
        this.props.set_game(g);
    }

    apply_attack() {
        let g = eh.apply_attack(this.props.game);
        g = eh.clear_action(g);
        this.props.set_game(g);
    }

    receive_wound() {
        let g = eh.receive_wound(this.props.game);
        g = eh.clear_action(g);
        this.props.set_game(g);
    }

    render() {
        const id = this.props.id;
        if (!(eh.action_in_progress(this.props.game, id))) return '';
        const r = this.props.game.room;
        const action = r.action;
        const l = r.encounter.level;
        const mod = eh.get_action_mod(this.props.game);
        const total = eh.get_action_total(this.props.game);
        let result = 'fail';
        const spaces = <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        const clear = <Clear onClick={this.clear_action}/>
        if (action.action_type === 'attack') {
            if (total >= l)
                result =
                    <span> ≥ {l} {spaces} success ! {spaces}
                        <L onClick={this.apply_attack}> ✓ (remove encounter life)</L>
                    </span>
            else result =
                <span>
                    {'<'} {l} {spaces} the attack fail {spaces} {clear}
                </span>
        }
        if (action.action_type === 'defend') {
            if (total < l)
                result =
                    <span> {'<'} {l} {spaces} the defense fail !{spaces}
                        <L onClick={this.receive_wound}> ✓ (loose life)</L>
                    </span>
            else result =
                <span>
                    ≥ {l} {spaces} the defense succeed ! {spaces} {clear}
                </span>
        }
        return (
            <span>
                 {mod} + {action.dice.total} = {total} {' '} {result}
            </span>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FightActionRoll)
