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
import CharacterMain from "./CharacterMain";
import BackPackTable1 from "./BackPackTable1";
import BackPackTable2 from "./BackPackTable2";
import ItemsEquipped from "./EquippedTable";

class ScreenCharacter extends Component {

    render() {
        return (
            <div>
                <CharacterMain/>
                <p/>
                Equipped items: <p/>
                <ItemsEquipped/>
                <p/>
                Backpack: <p/>
                <BackPackTable1/>
                <p/>
                <BackPackTable2/>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenCharacter);
