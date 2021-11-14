/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import InputFieldCharacter from "components/InputFieldCharacter"
import {mapDispatchToProps, mapStateToProps} from 'helpers/default_props'
import F from 'helpers/F'

class CharacterMain extends Component {

    render() {
        return (
            <span>
                <F>Dmg from equipment</F>
                <InputFieldCharacter type={'number'} field_name={'dmg_items'} read_only={true}/>
                <F>Armour (LATER) </F> <InputFieldCharacter type={'number'} field_name={'armour'}/>
            </span>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterMain);
