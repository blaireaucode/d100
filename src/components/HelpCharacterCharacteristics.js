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

class HelpCharacterCharacteristics extends Component {

    render() {
        return (
            <span>
                <b>៚  Characteristics</b><br/>
                There are 3 characteristics used in the game, Strength (Str), Dexterity (Dex) and Intelligence (Int).
                <br/>
                When a player creates an adventurer for the first time they assign any one characteristic with 50 primary points, another with 40 points, and the remaining characteristic with 30 primary points. How these are assigned is entirely up to you; for instance, a player could apply 50 points to Str, 40 to Dex and 30 to Int, or 50 to Dex, 40 to Int and 30 to Str, the choice is yours.
            </span>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HelpCharacterCharacteristics)
