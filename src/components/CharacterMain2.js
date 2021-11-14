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
        const c = this.props.game.characteristics;
        return (
            <span>
                {/* health etc */}

                <F>Health Points</F>&nbsp;
                <InputFieldCharacter type={'number'} field_name={'hp'} width={'4ch'}/>
                <F>⇒</F><InputFieldCharacter type={'number'} field_name={'hp'}
                                             mod={c.hp_items} read_only={true}/>

                &nbsp;&nbsp;&nbsp;&nbsp;
                <F>Rep</F> <InputFieldCharacter type={'number'} field_name={'rep'}/>
                &nbsp;&nbsp;&nbsp;&nbsp;

                <F>Fate</F> <InputFieldCharacter type={'number'} field_name={'fate'}/>
                &nbsp;&nbsp;&nbsp;&nbsp;

                <F>Life</F> <InputFieldCharacter type={'number'} field_name={'life'}/>
                &nbsp;&nbsp;&nbsp;&nbsp;

                <F>Encounter modifier</F> <InputFieldCharacter type={'number'} field_name={'encounter_modifier'}/>

            </span>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterMain);
