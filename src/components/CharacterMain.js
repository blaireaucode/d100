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
//import {Paper} from "@material-ui/core"
import F from 'helpers/F'
import {Paper} from "@material-ui/core";

class CharacterMain extends Component {

    /*constructor(props) {
        super(props);
    }*/


    render() {
        return (
            <Paper elevation={5} className={'character_panel'}>
                {/* Name etc */}
                <F>Name</F> <InputFieldCharacter field_name={'name'}/>
                <F>Hero Path</F> <InputFieldCharacter field_name={'hero_path'}/>
                <F>Race</F> <InputFieldCharacter field_name={'race'}/>

                <p/>
                {/* health etc */}
                <F>Health Points</F> <InputFieldCharacter type={'number'} field_name={'health_points_primary'}/>
                <F>Health Points (adjusted)</F> <InputFieldCharacter type={'number'}
                                                                     field_name={'health_points_adjusted'}/>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <F>Rep</F> <InputFieldCharacter type={'number'} field_name={'rep'}/>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <F>Fate</F> <InputFieldCharacter type={'number'} field_name={'fate'}/>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <F>Life</F> <InputFieldCharacter type={'number'} field_name={'life'}/>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <F>Encounter modifier</F> <InputFieldCharacter type={'number'} field_name={'encounter_modifier'}/>

                <p/>
                {/* Main attributes */}
                <F>Str</F> <InputFieldCharacter type={'number'} field_name={'str'}/>
                <InputFieldCharacter type={'number'} field_name={'str_adj'}/>
                <F>xp</F> <InputFieldCharacter type={'number'} field_name={'str_exp'}/>
                <F>Mighty Blow</F> <InputFieldCharacter type={'bool'} field_name={'mighty_blow'}/>
                &nbsp; &nbsp; &nbsp;
                <span className={'help'}>(During combat Dmg rolls of 6 roll again and add to the roll)</span>

                <p/>
                <F>Dex</F> <InputFieldCharacter type={'number'} field_name={'dex'}/>
                <InputFieldCharacter type={'number'} field_name={'dex_adj'}/>
                <F>xp</F> <InputFieldCharacter type={'number'} field_name={'dex_exp'}/>
                <F>Perfect Aim</F> <InputFieldCharacter type={'bool'} field_name={'perfect_aim'}/>
                &nbsp; &nbsp; &nbsp;
                <span className={'help'}>(Roll again for hit location and choose either result)</span>

                <p/>
                <F>Int</F> <InputFieldCharacter type={'number'} field_name={'int'}/>
                <InputFieldCharacter type={'number'} field_name={'int_adj'}/>
                <F>xp</F> <InputFieldCharacter type={'number'} field_name={'int_exp'}/>
                <F>Spell Caster</F> <InputFieldCharacter type={'bool'} field_name={'spell_caster'}/>
                &nbsp; &nbsp; &nbsp;
                <span className={'help'}>(Can now use spells from the spell book)</span>

                <p/>
                <F>Dmg (LATER) </F> <InputFieldCharacter type={'number'} field_name={'dmg'}/>
                <F>Armour (LATER) </F> <InputFieldCharacter type={'number'} field_name={'armour'}/>
                <p/>

            </Paper>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterMain);
