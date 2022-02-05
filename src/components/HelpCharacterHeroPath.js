/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {mapDispatchToProps, mapStateToProps} from 'helpers/default_props'
import {get_hero_path, get_race} from "../helpers/helpers_hero";
import C from "../helpers/C";

class HelpCharacterHeroPath extends Component {

    render() {
        const c = this.props.game.characteristics;
        const race = get_race(c.race);
        const str = race.str_mod === '' ? '' : 'str : ' + race.str_mod;
        const dex = race.dex_mod === '' ? '' : 'dex : ' + race.dex_mod;
        const int = race.int_mod === '' ? '' : 'int : ' + race.int_mod;
        const hp = get_hero_path(c.hero_path);
        const hp_str = hp.str_mod === '' ? '' : 'str : ' + hp.str_mod;
        const hp_dex = hp.dex_mod === '' ? '' : 'dex : ' + hp.dex_mod;
        const hp_int = hp.int_mod === '' ? '' : 'int : ' + hp.int_mod;
        return (
            <span>
                <b>៚ HeroPath</b><br/>
                Each adventurer has a path they have chosen to follow and dedicate their life towards learning. By choosing a path they will benefit from a greater understanding, and accelerate their learning in its direction. There are three hero paths used in D100 Dungeon; they are: Warrior, Rogue and Sorcerer. You can either roll on table H - Hero Path, or choose a path for your adventurer; then, write it in the box provided on the adventure sheet and apply the modifiers to the primary characteristics, add the skill bonuses, and shade in all experience stars ✪ shown for the adventurer’s hero path.
                <p/>
                <C width={'10ch'}>{hp.path}</C>
                <C width={'10ch'}>{hp_str}</C>
                <C width={'10ch'}>{hp_dex}</C>
                <C width={'10ch'}>{hp_int}</C>
                <C width={'10ch'}/>
                <C width={'6ch'}>Skills :</C>
                <C width={'15ch'}>{hp.skill_bonus1}</C>
                <C width={'15ch'}>{hp.skill_bonus2}</C>

                <p/>
                <b>៚ Race</b><br/>
                Dwarves, elves and humans dominate the lands, and our adventurer will belong to one of those three races. Either roll on table R – Race, or choose one to determine which race the adventurer will be, then record it on the adventurer sheet, and apply the modifiers to the primary characteristics, add the skill bonuses, and shade in all experience stars ✪  shown for the adventurer’s race.
                <p/>
                <C width={'10ch'}>{race.race}</C>
                <C width={'10ch'}>{str}</C>
                <C width={'10ch'}>{dex}</C>
                <C width={'10ch'}>{int}</C>
                <C width={'10ch'}/>
                <C width={'6ch'}>Skills :</C>
                <C width={'20ch'}>{race.skills_mod}</C>
            </span>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HelpCharacterHeroPath)
