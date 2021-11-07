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
import Collapse from "@kunukn/react-collapse";
import L from "../helpers/L";
import ability_table from "../tables/table_encounter_ability.json";
import EncounterAbilityHelp from "./EncounterAbilityHelp";

class EncounterAbility extends Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        const v = !this.state.open;
        this.setState({open: v});
    }

    render() {
        const e = this.props.game.encounter;
        let abilities = [];
        for (let ab of ability_table) {
            //console.log('e', e, ab);
            if (e['ability'].includes(ab.name)) {
                //console.log('a', ab);
                abilities.push(
                            <span>
                                ៚ <EncounterAbilityHelp key={ab.name} name={ab.name}/>
                                <p/>
                            </span>);
            }
        }
        return (
            <span>
                <L onClick={this.toggle}>(help)</L>
                <Collapse isOpen={this.state.open}>
                    <span className={'help collapse-css-transition'}>
                        {abilities}
                    </span>
                </Collapse>
            </span>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EncounterAbility)
