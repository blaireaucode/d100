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
import CharacterHPHelp from "./HelpCharacterHP"
import C from "../helpers/C"

class CharacterMain extends Component {

    render() {
        const c = this.props.game.characteristics;
        const p = {width: '4ch', align: 'right', type: 'number'}
        return (
            <span>
                {/* health etc */}

                <F>Health Points&nbsp;</F>
                <InputFieldCharacter {...p} field_name={'hp'} width={'4ch'}/>
                <F>⇒&nbsp;</F>
                <InputFieldCharacter {...p} field_name={'hp'}
                                     mod={c.hp_items} read_only={true}
                                     align={'left'}  width={'4ch'}/>

                <C width={'4ch'}/>
                <F>Rep</F> <InputFieldCharacter {...p} field_name={'rep'}/>
                <C width={'2ch'}/>

                <F>Fate</F> <InputFieldCharacter {...p} field_name={'fate'}/>
                <C width={'2ch'}/>

                <F>Life</F> <InputFieldCharacter {...p} field_name={'life'}/>
                <C width={'2ch'}/>

                <F>Encounter modifier</F> <InputFieldCharacter {...p} field_name={'encounter_modifier'} width={'5ch'}/>

                <C width={'14ch'}/>
                <CollapsibleHelp text={'(?)'}>
                    <CharacterHPHelp/>
                </CollapsibleHelp>

            </span>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterMain);
