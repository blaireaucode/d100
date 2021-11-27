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
import CharacterCharacteristicsHelp from "./CharacterCharacteristicsHelp";
import CollapsibleHelp from "./CollapsibleHelp";

class CharacterMain extends Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        const v = !this.state.open;
        this.setState({open: v});
    }

    render() {
        const p = {width: '4ch', type: 'number', align: 'right'};
        const c = this.props.game.characteristics;
        return (
            <span>
                {/* Main attributes */}
                <F width={'4ch'}>Str</F> <InputFieldCharacter {...p} field_name={'str'}/>
                <F>⇒</F> <InputFieldCharacter {...p} field_name={'str'} mod={c.str_items} read_only={true}/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <F>✪ xp</F> <InputFieldCharacter {...p} field_name={'str_exp'}/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <F width={'10ch'}>Mighty Blow</F> <InputFieldCharacter type={'bool'} field_name={'mighty_blow'}/>
                &nbsp; &nbsp;
                <span className={'help'}>During combat Dmg rolls of 6 roll again and add to the roll</span>

                <p/>
                <F width={'4ch'}>Dex</F> <InputFieldCharacter {...p} field_name={'dex'}/>
                <F>⇒</F> <InputFieldCharacter {...p} field_name={'dex'} mod={c.dex_items} read_only={true}/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <F>✪ xp</F> <InputFieldCharacter {...p} field_name={'dex_exp'}/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <F width={'10ch'}>Perfect Aim</F> <InputFieldCharacter type={'bool'} field_name={'perfect_aim'}/>
                &nbsp; &nbsp;
                <span className={'help'}>Roll again for hit location and choose either result</span>

                <p/>
                <F width={'4ch'}>Int</F> <InputFieldCharacter {...p} field_name={'int'}/>
                <F>⇒</F> <InputFieldCharacter {...p} field_name={'int'} mod={c.int_items} read_only={true}/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <F>✪ xp</F> <InputFieldCharacter {...p} field_name={'int_exp'}/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <F width={'10ch'}>Spell Caster</F> <InputFieldCharacter type={'bool'} field_name={'spell_caster'}/>
                &nbsp; &nbsp;
                <span className={'help'}>Can now use spells from the spell book</span>
                &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                <CollapsibleHelp text={'(?)'}>
                    <CharacterCharacteristicsHelp/>
                </CollapsibleHelp>

            </span>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterMain);
