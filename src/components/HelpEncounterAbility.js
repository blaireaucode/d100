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
import {get_ability} from "../helpers/encounter_helpers";

class HelpEncounterAbility extends Component {

    render() {
        const abn = this.props.name;
        const ab = get_ability(abn);
        return (
            <span>
                <b>{ab.name}</b> &nbsp; &nbsp; {ab.help}
            </span>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HelpEncounterAbility)
