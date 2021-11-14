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
                {/* Name etc */}
                <F>Name</F> <InputFieldCharacter field_name={'name'} width={'20ch'}/>
                <F>Hero Path</F> <InputFieldCharacter field_name={'hero_path'} width={'20ch'}/>
                <F>Race</F> <InputFieldCharacter field_name={'race'} width={'20ch'}/>

            </span>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterMain);
