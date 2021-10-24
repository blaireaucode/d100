/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import CharacterInputField from "components/CharacterInputField"
import {mapDispatchToProps, mapStateToProps} from 'helpers/default_props'
//import {Paper} from "@material-ui/core"
import F from 'helpers/F'

class CharacterMain extends Component {

    /*constructor(props) {
        super(props);
    }*/


    render() {
        return (
            <div elevation={5} className={'character'}>

                {/* Name etc */}
                <F>Name</F> <CharacterInputField field_name={'name'}/>
                <F>Hero Path</F> <CharacterInputField field_name={'hero_path'}/>
                <F>Race</F> <CharacterInputField field_name={'race'}/>

                <p/>
                {/* health etc */}
                <F>Health Points</F> <CharacterInputField type={'number'} field_name={'health_points_primary'}/>
                <F>Health Points (adjusted)</F> <CharacterInputField type={'number'}
                                                                     field_name={'health_points_adjusted'}/>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <F>Rep</F> <CharacterInputField type={'number'} field_name={'rep'}/>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <F>Fate</F> <CharacterInputField type={'number'} field_name={'fate'}/>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <F>Life</F> <CharacterInputField type={'number'} field_name={'life'}/>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <F>Encounter modifier</F> <CharacterInputField type={'number'} field_name={'encounter_modifier'}/>

                <p/>
                {/* Main attributes */}
                <F>Str</F> <CharacterInputField type={'number'} field_name={'str'}/>
                <CharacterInputField type={'number'} field_name={'str_adj'}/>
                <F>xp</F> <CharacterInputField type={'number'} field_name={'str_exp'}/>
                <F>Mighty Blow</F> <CharacterInputField type={'bool'} field_name={'mighty_blow'}/>
                &nbsp; &nbsp; &nbsp; (During combat Dmg rolls of 6 roll again and add to the roll)

                <p/>
                <F>Dex</F> <CharacterInputField type={'number'} field_name={'dex'}/>
                <CharacterInputField type={'number'} field_name={'dex_adj'}/>
                <F>xp</F> <CharacterInputField type={'number'} field_name={'dex_exp'}/>
                <F>Perfect Aim</F> <CharacterInputField type={'bool'} field_name={'perfect_aim'}/>
                &nbsp; &nbsp; &nbsp; (Roll again for hit location and choose either result)

                <p/>
                <F>Int</F> <CharacterInputField type={'number'} field_name={'int'}/>
                <CharacterInputField type={'number'} field_name={'int_adj'}/>
                <F>xp</F> <CharacterInputField type={'number'} field_name={'int_exp'}/>
                <F>Spell Caster</F> <CharacterInputField type={'bool'} field_name={'spell_caster'}/>
                &nbsp; &nbsp; &nbsp; (Can now use spells from the spell book)

                <p/>

            </div>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterMain);
