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
import C from "../helpers/C";

class CharacterMain extends Component {

    render() {
        return (
            <span>
                <F>Additional damage <C width={'2ch'}/></F>
                <InputFieldCharacter type={'number'} field_name={'dmg_items'} read_only={true} align={'left'}/>
                <F>Defence <C width={'2ch'}/></F>
                <InputFieldCharacter type={'number'} field_name={'def_items'} read_only={true}/>
                <C width={'1ch'}/>
                <F>💰Gold pieces <C width={'2ch'}/></F>
                <InputFieldCharacter type={'number'} width={'7ch'} field_name={'gold_pieces'}/>
            </span>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterMain);
