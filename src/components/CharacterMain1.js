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
import CollapsibleHelp from "./CollapsibleHelp"
import HelpCharacterHeroPath from "./HelpCharacterHeroPath"
import C from "../helpers/C"
import table_r_race from 'tables/table_r_race.json';
import table_h_hero_path from 'tables/table_h_hero_path.json';

class CharacterMain extends Component {

    items_race = [];
    items_hero_path = [];

    constructor(props) {
        super(props);
        for (const r of table_r_race) {
            this.items_race.push(r.race);
        }
        for (const r of table_h_hero_path) {
            this.items_hero_path.push(r.path);
        }
    }

    render() {
        return (
            <span>
                <InputFieldCharacter field_name={'name'} width={'27ch'}/>
                <F>Hero Path</F> <C width={'1ch'}/>
                <InputFieldSelectCharacter width={'10ch'}
                                           items={this.items_hero_path}
                                           field_name={'hero_path'}/>
                <C width={'10ch'}/>
                <F>Race</F> <C width={'1ch'}/>
                <InputFieldSelectCharacter field_name={'race'}
                                           items={this.items_race}
                                           width={'10ch'}/>
                <CollapsibleHelp text={'(?)'}><HelpCharacterHeroPath/></CollapsibleHelp>
            </span>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterMain);
