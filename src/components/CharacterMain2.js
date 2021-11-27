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
import CollapsibleHelp from "./CollapsibleHelp"
import CharacterHPHelp from "./CharacterHPHelp"

class CharacterMain extends Component {

    render() {
        const c = this.props.game.characteristics;
        const p = {width: '4ch', align: 'right', type: 'number'}
        return (
            <span>
                {/* health etc */}

                <F>Health Points</F>&nbsp;
                <InputFieldCharacter {...p} field_name={'hp'}/>
                <F>⇒&nbsp;</F>
                <InputFieldCharacter {...p} field_name={'hp'}
                                     mod={c.hp_items} read_only={true} align={'left'}/>

                &nbsp;&nbsp;&nbsp;&nbsp;
                <F>Rep</F> <InputFieldCharacter {...p} field_name={'rep'}/>
                &nbsp;&nbsp;&nbsp;&nbsp;

                <F>Fate</F> <InputFieldCharacter {...p} field_name={'fate'}/>
                &nbsp;&nbsp;&nbsp;&nbsp;

                <F>Life</F> <InputFieldCharacter {...p} field_name={'life'}/>
                &nbsp;&nbsp;&nbsp;&nbsp;

                <F>Encounter modifier</F> <InputFieldCharacter {...p} field_name={'encounter_modifier'}/>

                &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                &nbsp;&nbsp;
                <CollapsibleHelp text={'(?)'}>
                    <CharacterHPHelp/>
                </CollapsibleHelp>

            </span>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterMain);
