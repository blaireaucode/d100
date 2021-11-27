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
import ability_table from "../tables/table_encounter_ability.json";
import EncounterAbilityHelp from "./EncounterAbilityHelp";
import CollapsibleHelp from "./CollapsibleHelp";

class EncounterAbility extends Component {

    render() {
        const e = this.props.game.encounter;
        let abilities = [];
        for (let ab of ability_table) {
            if (e['ability'].includes(ab.name)) {
                abilities.push(
                    <span key={ab.name}>
                                ៚ <EncounterAbilityHelp name={ab.name}/>
                                <p/>
                            </span>);
            }
        }
        if (abilities.length === 0) return '';
        return (<CollapsibleHelp text={'(?)'}>
                {abilities}
            </CollapsibleHelp>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EncounterAbility)
