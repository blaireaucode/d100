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
import InputFieldSelectCharacter from "./InputFieldSelectCharacter"
import table_r_race from 'tables/table_r_race.json'
import CollapsibleHelp from "./CollapsibleHelp"
import CharacterHeroPathHelp from "./HelpCharacterHeroPath"
import C from "../helpers/C"

class CharacterMain extends Component {

    items_race = [];

    constructor(props) {
        super(props);
        for (const r of table_r_race) {
            this.items_race.push(r.race);
        }
    }

    render() {
        const items = ['Warrior', 'Rogue', 'Sorcerer'];
        return (
            <span>
                {/* Name etc */}
                <F>Name</F> <InputFieldCharacter field_name={'name'} width={'20ch'}/>
                <F>Hero Path </F> <C width={'1ch'}/>
                <InputFieldSelectCharacter width={'10ch'}
                                           items={items}
                                           field_name={'hero_path'}/>
                <C width={'10ch'}/>
                <F>Race</F>  <C width={'1ch'}/>
                <InputFieldSelectCharacter field_name={'race'}
                                           items={this.items_race}
                                           width={'10ch'}/>
                <C width={'30ch'}/>
                <CollapsibleHelp text={'(?)'}><CharacterHeroPathHelp/></CollapsibleHelp>
            </span>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterMain);
