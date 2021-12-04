/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import L from 'helpers/L'
import {mapDispatchToProps, mapStateToProps} from 'helpers/default_props'
import {apply_dmg, clear_attack, compute_dmg} from "../helpers/encounter_helpers";

class AttackApplyDamage extends Component {

    constructor(props) {
        super(props);
        this.apply_damage = this.apply_damage.bind(this);
    }

    apply_damage() {
        let g = apply_dmg(this.props.game);
        g = clear_attack(g);
        this.props.set_game(g);
    }

    render() {
        const r = compute_dmg(this.props.game);
        const total = r.total;
        if (total <= 0) return '';
        return (
            <span>
                <L onClick={this.apply_damage}>apply dmg</L>
            </span>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttackApplyDamage)
