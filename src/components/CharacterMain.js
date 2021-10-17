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
import {Paper} from "@material-ui/core"

class CharacterMain extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Paper elevation={5} className={'character'}>

                {/* Name etc */}
                Name <CharacterInputField field_name={'name'}/>
                Hero Path <CharacterInputField field_name={'hero_path'}/>
                Race <CharacterInputField field_name={'race'}/>

                <p/>
                {/* health etc */}
                Health Points <CharacterInputField type={'number'} field_name={'health_points_primary'}/>
                Health Points (adjusted) <CharacterInputField type={'number'}
                                                              field_name={'health_points_adjusted'}/>
                &nbsp;&nbsp;&nbsp;&nbsp;
                Rep <CharacterInputField type={'number'} field_name={'rep'}/>
                &nbsp;&nbsp;&nbsp;&nbsp;
                Fate <CharacterInputField type={'number'} field_name={'fate'}/>
                &nbsp;&nbsp;&nbsp;&nbsp;
                Life <CharacterInputField type={'number'} field_name={'life'}/>
                &nbsp;&nbsp;&nbsp;&nbsp;
                Encounter modifier <CharacterInputField type={'number'} field_name={'encounter_modifier'}/>

                <p/>
                {/* Main attributes */}
                Str <CharacterInputField type={'number'} field_name={'str'}/>
                <CharacterInputField type={'number'} field_name={'str_adj'}/>
                xp <CharacterInputField type={'number'} field_name={'str_exp'}/>
                Mighty Blow <CharacterInputField type={'bool'} field_name={'mighty_blow'}/>
                &nbsp; &nbsp; &nbsp; (During combat Dmg rolls of 6 roll again and add to the roll)

                <p/>
                Dex <CharacterInputField type={'number'} field_name={'dex'}/>
                <CharacterInputField type={'number'} field_name={'dex_adj'}/>
                xp <CharacterInputField type={'number'} field_name={'dex_exp'}/>
                Perfect Aim <CharacterInputField type={'bool'} field_name={'perfect_aim'}/>
                &nbsp; &nbsp; &nbsp; (Roll again for hit location and choose either result)

                <p/>
                Int <CharacterInputField type={'number'} field_name={'int'}/>
                <CharacterInputField type={'number'} field_name={'int_adj'}/>
                xp <CharacterInputField type={'number'} field_name={'int_exp'}/>
                Spell Caster <CharacterInputField type={'bool'} field_name={'spell_caster'}/>
                &nbsp; &nbsp; &nbsp; (Can now use spells from the spell book)

                <p/>

            </Paper>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterMain);
