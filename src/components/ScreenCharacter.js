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
import ItemsBackPack from "./ItemsBackPack";
import ItemsEquipped from "./ItemsEquipped";

class ScreenCharacter extends Component {

    render() {
        return (
            <div>
                <CharacterMain/>
                <p/>
                <ItemsEquipped/>
                <p/>
                <ItemsBackPack/>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenCharacter);
